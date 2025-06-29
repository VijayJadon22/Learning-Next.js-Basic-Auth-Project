import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

}, { timestamps: true });


const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;