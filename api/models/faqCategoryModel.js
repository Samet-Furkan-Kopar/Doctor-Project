import mongoose from "mongoose";

const {Schema} = mongoose;
const FAQCategorySchema = new Schema({
    faqCategoryName:{
        type:String,
        require:true,
    },
    isVisible:{
        type:Boolean,
        default:true
    }
}, {
    timestamps: true
})


const FAQCategory = mongoose.model("FAQCategory",FAQCategorySchema)

export default FAQCategory