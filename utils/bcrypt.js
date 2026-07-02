import bcrypt from "bcryptjs";
const saltRound = 15;

export const hasspassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRound);
};
