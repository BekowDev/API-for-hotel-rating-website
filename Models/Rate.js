import mongoose from "mongoose";

const Rate = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Hotel",
    },
    addedDate: { type: Date, default: Date.now },
    username: { type: String, required: true },
    text: { type: String },
    stars: { type: Number, required: true, min: 1, max: 5 },
});

export default mongoose.model("Rate", Rate);
