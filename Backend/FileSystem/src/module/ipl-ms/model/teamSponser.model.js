import mongoose from "mongoose";

const teamSponserSchema = new mongoose.Schema({
    teamId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Team",
        required : [true, "Team id is required"],
    },

    sponserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Sponser",
        required : [true, "Sponser id is required"],
    }
}, {timestamps : true})

teamSponserSchema.index({teamId : 1, sponserId : 1}, {unique : true})

export default mongoose.model("TeamSponser", teamSponserSchema)