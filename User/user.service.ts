import User from "./user.model";

export const findUserByUsername = async (username: string) => {
  const user = await User.findOne({ username });

  return user;
};

export const findUser = async (id: string) => {
  const user = await User.findById(id);

  return user;
};
