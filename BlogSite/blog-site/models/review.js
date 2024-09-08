import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    reviewer: {type: String, required: true},
    rating: {type: Number, required: true},
    message: {type: String, required: true}
})

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);