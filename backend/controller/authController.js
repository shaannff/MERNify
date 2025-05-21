import User from '../models/userModel.js'
import Userjokes from '../models/userJokes.js'
import jwt from 'jsonwebtoken'

const secretKey = 'user2auth'

export const register=async(req,res)=>{
    const {name,email,password}=req.body 
    try {

        const existing = await User.findOne({email:email})
        if(existing){
          return  res.status(400).json({message:'email already exist use another'})
        }

        const newuser = new User({name,email,password})
        await newuser.save()

        const token = jwt.sign({userId:newuser._id},secretKey,{expiresIn:'1h'})


        return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
              _id: newuser._id,
              name: newuser.name,
              email: newuser.email
            }})
    } catch (error) {
        console.log(error,'from the use func')
        return res.status(500).json({ message: 'Something went wrong', error });

    }
}

export const login = async(req,res)=>{
    const {email,password}=req.body
    try {
        const user = await User.findOne({email:email,password:password})

        if(!user){
           return res.status(401).json({message:'email is not exisit here pls register'})
        }
       const token = jwt.sign({userId:user._id},secretKey,{expiresIn:'1h'})
       console.log('.....hai ..')
       return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email
            }})
        
    } catch (error) {
        console.log(error,'from the logi side ')
    }
}

export const addJokes=async(req,res)=>{
  try {
      const {category,joke,user}=req.body
      
      console.log('...',category,joke,user)
      const userId = user._id
      const text = joke
      if(! category || ! text || ! userId){
       return res.status(400).json({message:'all fields are required'})
      }
      const newJoke = new Userjokes ({
        userId,
        text,
        category
      })

      const savedJoke = await newJoke.save()
      console.log('succc',savedJoke)
      res.status(200).json({message:'joke added succses',Joke:savedJoke})

  } catch (error) {
    console.log(error,'from the add jokes')
  }
}

export const getAllJokes = async(req,res)=>{
  try {
    const jokes = await Userjokes.find({})
    console.log(jokes)
    if(!jokes)return res.status(400).json({message:'somthing wrong nothg the db'})

     res.status(200).json({message:'get jokes succses',jokes:jokes})
    
  } catch (error) {
    console.log(error ,'from the gett all jokes')
  }
}

export const getCategoryJokes =async(req,res)=>{
  try {
  const category = req.query.category  
if (!category || category === 'All') {
  const allJokes = await Userjokes.find({});
  return res.json({jokes:allJokes});
}

const filteredData = await Userjokes.find({ category }); 
res.json({jokes:filteredData})
  } catch (error) {
    console.log(error,'from the getCategoryJokes side')
  }
}