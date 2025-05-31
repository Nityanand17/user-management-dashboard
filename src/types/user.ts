export interface UserAddress {
  street: string;
  suite?: string;
  city: string;
  zipcode: string;
  geo?: {
    lat: string;
    lng: string;
  };
}

export interface UserCompany {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  address: UserAddress;
  phone: string;
  website?: string;
  company?: UserCompany;
}

export interface NewUser {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  phone: string;
}

export type FormStep = 'basic' | 'address' | 'review'; 