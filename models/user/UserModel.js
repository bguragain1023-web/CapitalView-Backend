import userSchema from "./UserSchema.js";

//create
export const insertUser = (userObj) => {
  return userSchema(userObj).save();
};
