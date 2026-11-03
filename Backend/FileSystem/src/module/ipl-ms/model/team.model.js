import mongoose from "mongoose";

const teamSceama = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true, "Team name is required"],
        minlength : 2,
        maxlength : 255,
    },
    CompanyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Owner",
        required : [true, "teamId is required"]
    }
}, {timestamps : true})

export default mongoose.model( "Team", teamSceama )