import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({

    name : {
        type : String,
        trim : true, 
        minlength : 6,
        maxlength : 255,
        required : [true, "player name is required"]
    },

    role : {
        type : String, 
        enum : ["batsman", "bowler", "all-rounder"],
        required : [true, "player's role is required"],
        message : 'role should be from "batsman", "bowler", "all-rounder".'
    },

    teamId : {
        type : mongoose.Schema.ObjectId,
        ref : "Team",
        required : [true, "Team name is required"]
    }

}, {timestamps : true})

export default mongoose.model("Player", playerSchema)