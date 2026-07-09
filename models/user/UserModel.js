import userSchema from "./UserSchema.js";

//create
export const insertUser = (userObj) => {
  return userSchema(userObj).save();
};

// search

export const getUserByEmail = (email) => {
  return userSchema.findOne({ email });
};
