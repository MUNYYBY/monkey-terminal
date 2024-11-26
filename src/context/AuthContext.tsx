"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import ls from "localstorage-slim";
import axios from "axios";
import moment from "moment";
import { authConfig } from "@/configs/AuthConfigs";
import {
  AuthValuesType,
  LoginParams,
  RegisterParams,
  UserDataType,
} from "./types";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  settings: null,
  setUser: () => null,
  setLoading: () => Boolean,
  setSettings: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  initAuth: () => Promise.resolve(),
  RefreshInformation: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [settings, setSettings] = useState<object | null>(
    defaultProvider.settings
  );

  // ** Hooks
  const router = useRouter();

  const initAuth = async () => {
    setLoading(true);
    const storedToken1: any = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    );
    const storedToken2 = JSON.parse(storedToken1);
    const userDataCheck: any = ls.get("userData", { encrypt: true });
    if (storedToken2) {
      setLoading(true);
      if (isLoggedIn()) {
        setUser(userDataCheck);
      } else {
        console.log("Logout due to token expiry!");
        handleLogout();
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const RefreshInformation = (data: any) => {
    parseLoginResponse({ data: { user: data } }, true);
  };

  function parseLoginResponse(
    response: any,
    onlyInfromation: boolean,
    team?: boolean
  ) {
    const res = team
      ? { ...response.data.team, name: response.data.team.firstName }
      : { ...response.data.user };

    console.log(res);

    if (!onlyInfromation) {
      const token = response.data.tokens.access;
      const refreshToken = response.data.tokens.refresh;
      const tokenData = {
        token: token.token,
        expiry: token.expires,
      };
      const refreshData = {
        token: refreshToken.token,
        expiry: refreshToken.expires,
      };

      window.localStorage.setItem(
        authConfig.storageTokenKeyName,
        JSON.stringify(tokenData)
      );
      window.localStorage.setItem(
        authConfig.refreshStorageTokenKeyName,
        JSON.stringify(refreshData)
      );
    }

    const userData: any = res;
    ls.set("userData", userData, { encrypt: true });
    setUser(userData);
    setLoading(false);
    initAuth();

    // Get return URL from query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const returnUrl = searchParams.get("returnUrl");

    // Navigate to the return URL if it exists, otherwise navigate to /app/
    if (!onlyInfromation) {
      router.replace(returnUrl ? decodeURIComponent(returnUrl) : "/app/");
    }
  }

  useEffect(() => {
    // Axios305Interceptor(handleLogout, user);
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback: any,
    setLoading?: any
  ) => {
    axios
      .post(authConfig.loginEndpoint, {
        email: params.email,
        password: params.password,
      })
      .then((response: any) => {
        parseLoginResponse(response, false);
      })
      .catch((err) => {
        setLoading(false);
        if (errorCallback) errorCallback(err.response.data.message);
      });
  };

  const handleLogout = () => {
    setLoading(true);
    setLoading(false);
    setUser(null);
    ls.remove("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.replace("/auth/login/");
  };

  function isLoggedIn() {
    return moment().isBefore(getExpirationAccessToken());
  }
  function getExpirationAccessToken() {
    const expiration1: any = localStorage.getItem(
      authConfig.storageTokenKeyName
    );
    const expiration = JSON.parse(expiration1);
    if (expiration1) {
      const expiresAt = expiration.expiry || "{}";

      return moment(expiresAt);
    } else {
      return null;
    }
  }
  const handleRegister = (
    params: RegisterParams,
    errorCallback: any,
    setLoading: any
  ) => {
    axios
      .post(authConfig.registerEndpoint, {
        email: params.email,
        password: params.password,
        name: params.name,
        phone: params.phone,
      })
      .then((res: any) => {
        parseLoginResponse(res, false);
      })
      .catch((err: any) => {
        setLoading(false);
        return errorCallback ? errorCallback(err.response.data.message) : null;
      });
  };
  const values = {
    user,
    loading,
    settings,
    setUser,
    setLoading,
    setSettings,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    initAuth,
    RefreshInformation,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
