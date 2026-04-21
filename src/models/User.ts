import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    avatar: string;
    password?: string;
    isBlock?: boolean;
    isVerified?: boolean;
    role?: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    avatar: {
        type: String,
        default: "guestImage"
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    verificationToken: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);
