export interface Executive {
  _id: string;
  phone: string;
  name: string;
  avatar: string;
  location: string;
}

export interface User {
  shopId: string;
  phone: string;
  name: string;
  picture: string;
  shopName: string;
  shopAddress: string;
  shopPicture: string;
  status: string;
  lastLoginAt: string;
  lastConsumerAddedAt: string;
}

export interface IDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export interface FormData {
  name: string;
  phone: string;
  password: string;
  division: "CTG METRO";
  zone: "EAST" | "WEST" | "SOUTH" | "NORTH";
  file: FileList;
}

export interface IUserData {
  _id: string;
  phone: string;
  name: string;
  avatar: string;
  location: string;
}

export enum ShopStatus {
  INACTIVE = "Inactive",
  ACTIVE = "Active",
}

export interface IOnBoarded {
  shopId: string;
  phone: string;
  name: string;
  picture: string;
  shopName: string;
  shopAddress: string;
  shopPicture: string;
  status: ShopStatus | "Inactive" | "Active";
  lastLoginAt: Date;
  lastConsumerAddedAt: Date;
}

export interface IApiResponse<T> {
  error: boolean;
  message: string;
  data?: T;
}

export interface IDeleteResponse {
  error: boolean;
  message: string;
  deletedId?: string;
}

export type CreateExecutiveArgs = {
  phone: string;
  name: string;
  division: "CTG METRO";
  zone: "EAST" | "WEST" | "SOUTH" | "NORTH";
  avatar?: File;
};

export type CreateExecutiveResponse = {
  error: boolean;
  message: string;
};

export interface ShopUser {
  shopId: string;
  phone: string;
  name: string;
  picture: string;
  shopName: string;
  shopAddress: string;
  shopPicture: string;
  status: "Inactive" | "Active";
  lastLoginAt: string;
  lastConsumerAddedAt: string;
}

export interface ICountResponse {
  error: boolean;
  message: string;
  count: number;
}
