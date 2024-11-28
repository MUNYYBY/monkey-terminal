export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type UserDataType = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  companyName: string;
  companyDomain: string;
  companyAddress: string;
  postalCode: string;
  city: string;
  country: string;
  isBlock: false;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  Subscription: any;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserDataType | null;
  settings: any;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  setSettings: (value: any) => void;
  login: (
    params: LoginParams,
    errorCallback?: any,
    setLoading?: any,
    afterLogin?: any
  ) => void;
  register: (
    params: RegisterParams,
    errorCallback?: any,
    setLoading?: any,
    setSuccess?: any,
    afterLogin?: any
  ) => void;
  initAuth: () => void;
  RefreshInformation: (data: any) => void;
};
