import mongoose, { Schema } from "mongoose";

const UsersSchema = new mongoose.Schema({
    photo:{
        type: String,
        require:true
    },
    name:{
        type: String,
        require:true
    },
    bio:{
        type: String,
        require:true    
    },
    phone:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    }
   
})

export default mongoose.model('Users', UsersSchema);