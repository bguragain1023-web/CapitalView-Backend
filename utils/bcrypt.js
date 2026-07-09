import bcrypt from "bcryptjs";
const saltRound = 15;

export const hashpassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRound);
};

export const comparePassssword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
