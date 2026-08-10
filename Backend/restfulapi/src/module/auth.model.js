import { required } from "joi";
import mongoose from "mongoose";
import role from './user.role.js'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        minlength : 2,
        maxlength : 20,
        required : [true, "unable to find"]
    },

    password :{
        type : String,
        minlength : 2,
        maxlength : 200,
        select : false,
    },

    role :{
        type : String,
        enum : role,
        default : "Customer"
    },

    isVarified : {
        type : Boolean,
        default : false,
    },

    verificationToken : { type : String, select : false},
    refreshToken : { type : String, select : false},
    resetPassowordToken : {type : String , select : false},
    resetPasswordExpire : {type : Date, select : false},
},{timestamps : true});

export default mongoose.model("user", userSchema);