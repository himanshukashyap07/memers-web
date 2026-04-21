import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
    text: string;
    userId: mongoose.Types.ObjectId;
    url: string;
    hashtags: string[];
    sharesCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema: Schema = new Schema({
    text: {
        type: String,
        required: [true, "Post text is required"],
        maxlength: [200, "Post text cannot exceed 200 characters"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    url: {
        type: String,
        required: [true, "Media URL is required"]
    },
    hashtags: {
        type: [String],
        default: []
    },
    sharesCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);
