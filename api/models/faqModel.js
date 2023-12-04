import mongoose from "mongoose";

const { Schema } = mongoose;
const faqSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    isStatus: {
        type: Boolean,
        default: true
    },
    faqCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"FAQCategory",
        require:true
    },
}, {
    timestamps: true
})

const FAQ = mongoose.model("FAQ", faqSchema)

export default FAQ