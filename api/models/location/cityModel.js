import mongoose from "mongoose";
const { Schema } = mongoose;
const citySchema = new Schema({
    countryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Country"
    },
    name:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    plateNumer:{
        type: Number,
        require: true
    },

}, {
    timestamps: true
});
const City =mongoose.model("City",citySchema)

export default City;