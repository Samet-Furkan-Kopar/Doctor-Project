import mongoose from "mongoose";
import slugify from "slugify";
const { Schema } = mongoose;
const OfficeSchema = new Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  companyName: {
    type: String,
    trim: true,
  },
  companyTitle: {
    type: String,
    trim: true,
  },
  taxNo: {
    type: Number,
    trim: true,
  },
  taxOffice: {
    type: String,
    trim: true,
  },
  logo_url: {
    type: String,
    default:""
  },
  coverPhoto: {
    type: String,
    default:""
  },
  description: {
    type: String,
  },
  aboutUs: {
    type: String,
  },
  address: {
    type: String,
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
  },
  neighbourhoodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "neighbourhood",
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

const Office = mongoose.model("Office", OfficeSchema);

export default Office;
