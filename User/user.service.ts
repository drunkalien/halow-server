import User from "./user.model";

export const findUserByUsername = async (username: string) => {
  const user = await User.findOne({ username });

  return user;
};

export const findUser = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

export const updateUser = async (id: string, payload: any) => {
  const user = await User.findByIdAndUpdate(id, payload, { new: true });

  if (!user) {
    throw new Error("Invalid user");
  }

  return user;
};
