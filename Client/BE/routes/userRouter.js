const { Router } = require("express");
const {
  postLoginUser,
  postSignupUser,
  postLogoutUser,
  postAuthUser,
  putUser,
} = require("../controllers/userController");
const {
  postLoginUserValidator,
  postSignupUserValidator,
  postLogoutUserValidator,
  postAuthUserValidator,
  putUserValidator,
} = require("../validators/userValidator");

const userRouter = Router();

userRouter.post("/user/login", postLoginUserValidator, postLoginUser);
userRouter.post("/user/signup", postSignupUserValidator, postSignupUser);
userRouter.post("/user/logout", postLogoutUserValidator, postLogoutUser);
userRouter.post("/user/auth", postAuthUserValidator, postAuthUser);
userRouter.put("/user/profile", putUserValidator, putUser);

module.exports = userRouter;
