import mongoose from "mongoose";
const {
    Schema
} = mongoose;

const contentSchema = new Schema({
    seoTitle:{
        type:String
    },
    seoUrl:{
        type:String
    },
    seoDescription :{
        type:String
    },
    page: {
        type: String,
        enum: ["homepage","about","contact", "blog", "campaigns", "courses","course-list", "temporary", "privacy", "termuse", "faq"],
        required: true
    },
    type: {
        type: String,
        enum: ["sliderArena","codingQualityArena","advanceTab","coursePresentation","eventPresentation","shopPresentation","blogPresentation","bannerArena","aboutArena","buttonArena","contactUs","contactForm"],
        required: true
    },
    content: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

const Content = mongoose.model("contents",contentSchema)

export default Content