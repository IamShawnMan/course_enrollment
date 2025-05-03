import bcrypt from "bcrypt";

export const encode = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};

export const decode = async (password, hashedPass) => {
  return await bcrypt.compare(password, hashedPass);
};
