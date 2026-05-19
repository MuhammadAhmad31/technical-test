import type { ListUser } from "@repo/shared";
import type { RandomUserResult } from "./random-user.types.js";

export const mapRandomUserToListUser = (user: RandomUserResult): ListUser => ({
  name: `${user.name.title}, ${user.name.first} ${user.name.last}`,
  location: `${user.location.street.number},${user.location.street.name}, ${user.location.city},${user.location.state} , ${user.location.country} `,
  email: user.email,
  age: user.registered?.age ?? user.dob?.age ?? 0,
  phone: user.phone,
  cell: user.cell,
  picture: [user.picture.large, user.picture.medium, user.picture.thumbnail]
});
