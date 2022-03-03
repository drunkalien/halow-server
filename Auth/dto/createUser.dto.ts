export type CreateUserDto = {
  firstName: string;
  lastName: string;
  username: string;
  bio?: string;
  profilePic?: string;
  password: string;
};
