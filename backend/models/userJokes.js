import mongoose from "mongoose";

const Jokes = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        enum:['Funny','18+','Dirtymind','Sarcasm'],
        required:true
    }
})
const Userjokes = mongoose.model('Jokes',Jokes)
export default Userjokes