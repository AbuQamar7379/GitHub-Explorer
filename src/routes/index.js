const express = require("express");
const router = express.Router();
const userRouter = require("./user.routes");

// Mount the userRouter under the "/github" prefix
router.use("/github", userRouter);

module.exports = router;
