import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = "https://api.github.com";

const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem("github_refresh_token");
    if (!refreshToken) return null;

    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      },
      {
        headers: {
          Accept: "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    const { access_token, refresh_token: newRefreshToken } = response.data;

    await AsyncStorage.setItem("github_access_token", access_token);
    if (newRefreshToken) {
      await AsyncStorage.setItem("github_refresh_token", newRefreshToken);
    }

    return access_token;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    await AsyncStorage.removeItem("github_access_token");
    await AsyncStorage.removeItem("github_refresh_token");
    return null;
  }
};

httpClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("github_access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

let tokenExpiredHandler: (() => void) | null = null;

export const setTokenExpiredHandler = (handler: (() => void) | null) => {
  tokenExpiredHandler = handler;
};

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return httpClient(originalRequest);
      } else {
        if (tokenExpiredHandler) {
          tokenExpiredHandler();
        } else {
          console.log("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        }
      }
    }

    return Promise.reject(error);
  },
);
export default httpClient;
