import mongoose from "mongoose";
import slugify from "slugify";

const {
    Schema
} = mongoose;
const blogSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "User",
    },
    seoTitle: {
        type: String
    },
    seoUrl: {
        type: String,
        require: true,
    },
    seoDescription: {
        type: String
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    short_description: {
        type: String,
    },
    image: {
        type: String,
    },
    coverPhoto: {
        type: String,
    },
    isStatus: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

blogSchema.pre("validate", function (next) {
    this.seoUrl = slugify(this.seoUrl, {
        lower: true,
        strict: true
    })
    next()
});

const Blog = mongoose.model("Blog", blogSchema)

export default Blog