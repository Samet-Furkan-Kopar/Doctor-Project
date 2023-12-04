import mongoose from "mongoose";
import slugify from "slugify";

const {
    Schema
} = mongoose;

const courseSchema = new Schema({
    seoTitle: {
        type: String,
        unique: true
    },
    seoUrl: {
        type: String,
        unique: true
    },
    seoDescription: {
        type: String
    },
    title: {
        type: String,
        require: true
    },
    short_description: {
        type: String,
    },
    content: {
        type: String,
        require: true
    },
    promotionalImage: {
        type: String,
    },
    promotionalLink: {
        type: String,
    },
    image: {
        type: String,
    },
    alt_text:{
        type: Array
    },
    price: {
        type: Number,
        require: true
    },
    isStatus: {
        type: Boolean,
        default: true
    },
    subtitle: {
        type: String,
    },
    courseContentSubtitle: {
        type: String,
    },
    courseContentDescription: {
        type: String,
    },
    courseStartDate: {
        type: Date,
        require: true
    },
    courseEndDate: {
        type: Date,
        require: true
    }
}, {
    timestamps: true
})
courseSchema.pre("validate", function (next) {
    this.seoUrl = slugify(this.seoUrl, {
        lower: true,
        strict: true
    })
    next()
});

const Course = mongoose.model("courses", courseSchema)

export default Course