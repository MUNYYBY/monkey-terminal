import API_URLS from "./URLs";

export const authConfig = {
  loginEndpoint: API_URLS.LIVE + "/auth/login",
  loginEndpointGoogle: API_URLS.LIVE + "login",
  storageTokenKeyName: "session-token",
  refreshStorageTokenKeyName: "refreshToken",
  registerEndpoint: API_URLS.LIVE + "/auth/register",
  logoutEndpoint: API_URLS.LIVE + "/auth/logout",
  updateUserEndpoint: API_URLS.LIVE + "/users",
};
