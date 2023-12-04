import mongoose from "mongoose";
const { Schema } = mongoose;
const countrySchema = new Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
}, {
    timestamps: true
});
const Country =mongoose.model("Country",countrySchema)

export default Country;