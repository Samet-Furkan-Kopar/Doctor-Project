import mongoose from "mongoose";
const { Schema } = mongoose;
const districtSchema = new Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    cityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"City"
    }

}, {
    timestamps: true
});
const District =mongoose.model("District",districtSchema)

export default District;