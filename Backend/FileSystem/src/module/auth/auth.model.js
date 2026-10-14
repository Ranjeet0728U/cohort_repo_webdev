import mongoose from "mongoose";
import role from "../../user.role.js";

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        required: [true, "Name is required"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        minlength: 8,
        maxlength: 200,
        required: true,
        select: false,
    },

    role: {
        type: String,
        enum: role,
        default: "Customer",
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    verificationToken: {
        type: String,
        default: null,
        select: false,
    },

    verificationTokenExpiry: {
        type: Date,
        default: null,
        select: false,
    },

    refreshToken: {
        type: String,
        default: null,
        select: false,
    },

    resetPasswordToken: {
        type: String,
        default: null,
        select: false,
    },

    resetPasswordExpire: {
        type: Date,
        default: null,
        select: false,
    },
},
{
    timestamps: true,
}


);

export default mongoose.model("user", userSchema);
