import { authConfig } from "@/configs/AuthConfigs";
import API_URLS from "@/configs/URLs";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GetTokenAsync = () => {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  );

  return storedToken ? JSON.parse(storedToken).token : null;
};
const GetRefreshTokenAsync = () => {
  const storedToken = window.localStorage.getItem(
    authConfig.refreshStorageTokenKeyName,
  );

  return storedToken ? JSON.parse(storedToken).token : null;
};

export async function Logout() {
  const token = GetRefreshTokenAsync();
  const config = {
    method: "post",
    url: API_URLS.LIVE + "/auth/logout",
    data: {
      refreshToken: token,
    },
  };

  return axios(config)
    .then(() => {
      return { data: true };
    })
    .catch((error) => {
      return { error: error };
    });
}

export async function GetChatHistory() {
  const token = GetTokenAsync();
  const config = {
    method: "get",
    url: API_URLS.LIVE + "/bot/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios(config)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error };
    });
}
export async function ChatWithBot(payload: any) {
  delete payload.name;
  const token = GetTokenAsync();
  const config = {
    method: "post",
    url: API_URLS.LIVE + "/bot/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  };

  return axios(config)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error };
    });
}
