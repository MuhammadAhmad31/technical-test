export type ListUser = {
  name: string;
  location: string;
  email: string;
  age: number;
  phone: string;
  cell: string;
  picture: string[];
};

export type RandomUsersResponse = {
  page: number;
  results: number;
  search: string;
  data: ListUser[];
};
