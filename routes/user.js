const userRouter = require('express').Router()
const {modifyUser, deleteUser, getUser} = require("../controllers/user")


userRouter.route("/user/:userID").get(getUser)
userRouter.route("/user").patch(modifyUser).delete(deleteUser);





module.exports =userRouter