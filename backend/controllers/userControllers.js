const jwt= require('jsonwebtoken')
//to hash the password
const bcrypt=require('bcrypt')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')


const registerUser=asyncHandler(async (req,res)=>{
    const { name, email, password }= req.body
     if(!name || !email || !password){
         res.status(400)
         throw new Error('please add all fields')
      }
     
    //check if user exsist
    const userExists= await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user already exsist')
    }

    //hash the pass
    const salt= await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password, salt)

    //create a user
    const user= await User.create({
        name,
        email,
        password:hashedPassword
    })

    //if user was created
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
 
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email, password}=req.body
    //check for the user email
    const user= await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
 })

 const getMe=asyncHandler(async(req,res)=>{
  const {_id, name, email}=await User.findById(req.user.id)
  res.status(200).json({
    id:_id,
    name,
    email
  })
   
 })
 //generate JWT
 const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d',
})
}
module.exports={
    registerUser,
    loginUser,
    getMe
}