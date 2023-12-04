import mongoose from "mongoose";
const { Schema } = mongoose;
const neighbourhoodSchema = new Schema({
    districtId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"City"
    },
    name:{
        type:String,
        require:true
    }

}, {
    timestamps: true
});
const Neighbourhood =mongoose.model("neighbourhood",neighbourhoodSchema)

export default Neighbourhood;