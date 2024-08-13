import mongoose, { Schema } from "mongoose";
import { IDonor } from "./donor.interface";
import { UserRole } from "../../../enums/user";
import { City } from "../../../enums/city";

const DonorSchema: Schema = new Schema(
  {
    donor_id: { type: Number, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    phone_number: { type: String, required: true, unique:true},
    role: { type: String, enum: Object.values(UserRole), default: UserRole.DONOR},
    address: { type: String, required: true },
    city: { type: String, enum: Object.values(City), required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    blood_group: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Donor = mongoose.model<IDonor>("Donor", DonorSchema);

export default Donor;