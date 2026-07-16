import { getUserByEmail } from "../models/user/UserModel.js";
import { verifyJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const result = verifyJWT(authorization);
    console.log(result);

    //3. validate if the token is correct
    if (result?.email) {
      const user = await getUserByEmail(result.email);
      if (user?._id) {
        user.password = undefined;
        req.userInfo = user;
        return next();
      }
    }

    res.status(403).json({
      error: "unauthorized",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
