import express from "express";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import { createUser, findUserByEmail } from "../Model/User/userModel.js";
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js";

const userRouter = express.Router()

// Creating User | Signup
userRouter.post("/", async(req, res) => {
  // get password from req
  // encrypt | hash password
  // create user object from req
  //call usermodel function to create user
  // send response
  try {
    const { password, name, email } = req.body
    //hash password
    const encryptedPassword = hashPassword(password)

    const result = await createUser({
      name: name,
      email: email,
      password: encryptedPassword,
    })

    result?._id
      ? buildSuccessResponse(res, result, "User created Successfully.") 
      : buildErrorResponse(res, "Could not register the user")

  }catch(error){
    if(error.code === 11000){
      error.message = "User with this email already exists!!"
    }

    buildErrorResponse(res, error.message)
  }
})

//user login
userRouter.post("/login", async(req, res) => {
  try {
    const {email, password} = req.body

    // find user by email
    const user = await findUserByEmail(email)

    if(user?._id) {
      const isPasswordMatched = comparePassword(password, user.password)

      return isPasswordMatched
              ? buildSuccessResponse(res, user, "Logged in successfully")
              : buildErrorResponse(res, "Invalid Credentials!!")
    }
    
    buildErrorResponse(res, "Invalid Credentials")
  } catch (error) {
    buildErrorResponse(res, "Invalid Credentials")
  }
})

export default userRouter