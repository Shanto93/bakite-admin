export interface Executive {
  _id: string;
  phone: string;
  name: string;
  avatar: string;
  area: string;
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
