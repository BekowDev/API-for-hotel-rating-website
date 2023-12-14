import mongoose from "mongoose";

const Hotel = new mongoose.Schema({
    addedDate: { type: Date, default: Date.now },
    name: { type: String, required: true },
    type: { type: String, required: true },
    images: { type: Array, required: true },
    price: { type: String, required: true },
    contacts: { type: Array, required: true },
    description: { type: String },
    workTime: { type: String },
    city: { type: String, required: true },
    address: { type: String },
    stars: { type: Number },
    reviews: { type: Number },
});

export default mongoose.model("Hotel", Hotel);
