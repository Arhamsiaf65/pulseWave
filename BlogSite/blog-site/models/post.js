import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    likes: { type: Number, default: 0 }
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
