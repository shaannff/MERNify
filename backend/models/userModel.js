import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})
const User = mongoose.model('user',userSchema)
export default User