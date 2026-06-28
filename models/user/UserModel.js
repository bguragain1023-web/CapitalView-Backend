import userSchema from "./UserSchema.js";

//create
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};
