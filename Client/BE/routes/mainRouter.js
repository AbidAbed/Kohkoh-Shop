const { Router } = require("express");
const userRouter = require("./userRouter");
const itemRouter = require("./itemRouter");
const purchaseRouter = require("./purchaseRouter");
const reviewRouter = require("./reviewRouter");

const mainRouter = Router();

mainRouter.use(userRouter);
mainRouter.use(itemRouter);
mainRouter.use(purchaseRouter);
mainRouter.use(reviewRouter);

module.exports = mainRouter;
