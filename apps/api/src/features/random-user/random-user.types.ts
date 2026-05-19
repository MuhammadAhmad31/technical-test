export type RandomUserName = {
  title: string;
  first: string;
  last: string;
};

export type RandomUserLocation = {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
};

export type RandomUserPicture = {
  large: string;
  medium: string;
  thumbnail: string;
};

export type RandomUserResult = {
  name: RandomUserName;
  location: RandomUserLocation;
  email: string;
  dob?: {
    age?: number;
  };
  registered?: {
    age?: number;
  };
  phone: string;
  cell: string;
  picture: RandomUserPicture;
};

export type RandomUserApiResponse = {
  results: RandomUserResult[];
};

export type ListRandomUsersInput = {
  page?: number;
  results?: number;
  search?: string;
};

export type NormalizedRandomUsersQuery = {
  page: number;
  results: number;
  search: string;
};
