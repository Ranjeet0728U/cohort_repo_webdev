import mongoose from "mongoose";

const sponserSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 5,
        maxlength : 255,
        required : [true, "sponser name is required"]
    }
}, {timestamps : true})

export default mongoose.model("Sponser", sponserSchema)