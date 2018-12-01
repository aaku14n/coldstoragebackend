import mongoose from "mongoose";

const Pincode = new mongoose.Schema({
  pincode: Number,
  regionName: String,
  circleName: String,
  districtName: String,
  stateName: String
});

export default Pincode;
