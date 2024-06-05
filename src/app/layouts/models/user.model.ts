export interface UserModel {
  type: string;
  properties: User;
  sub: string;
  iat: number;
  exp: number;
}
export interface User {
  userUuid: string;
  userUsername: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}
