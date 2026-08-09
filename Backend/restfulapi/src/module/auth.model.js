import { required } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        trim : true,
        minlength : 2,
        maxlength : 2,
        required : [true, "unable to find"]
    },

    password :{
        type : String,
        minlength : 2,
        maxlength : 200,
        select : false,

        

    }
})