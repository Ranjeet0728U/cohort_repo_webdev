import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true, "Owner name is required"],
        minlength : 2,
        maxlength : 255
    },

    company : {
        type : String,
        trim : true,
        required : [true, "company name is required"],
        minlength : 2,
        maxlength : 255
    }
}, {timestamps : true} )

export default mongoose.model('Owner', ownerSchema)