const User = require("../models/User")
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../middleware/handleErrors')


const register = async(req, res, next)=>{
    try{

        const {name, email, isOrg, phone} = req.body
        const alreadyExists = await User.findOne({email})
        if(alreadyExists){
            
            next(new BadRequestError("Account with the email already exists"))
            
        }else{
        const user= await User.create({name, email, isOrg, phone})

        res.json({msg:"new user created", user:{name: user.name, userID:user._id , isOrg:user.isOrg}})
    }
}catch(err){
    console.log(err);
    next(err)}
}

const login = async(req, res, next)=>{
    try{

        const  {email } = req.body
        const user = await User.findOne({email})
        if(!user){
            res.json({msg:"no existing user"})
        }else{
            
            res.json({msg:"User found", user:{name: user.name, userID:user._id, isOrg:user.isOrg}})
        }
    }catch(err){next(err)}
    }
    
    

module.exports = {register, login}