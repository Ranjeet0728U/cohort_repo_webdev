import mongoose from "mongoose";

const broadcasterSchema = new mongoose.Schema ({
    name : {
        type : string,
        trim : true,
        required : [true, "broadcaster name is required"],
        minlength : 2, 
        maxlength : 255
    }
}, {timestamps : true})

export default mongoose.model("Broadcaster", broadcasterSchema)