import User from '../models/userModel.js'
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