import mongoose, { Schema } from 'mongoose';
import { IDonor } from './donor.interface';
import { UserRole } from '../../../enums/user';
import { City } from '../../../enums/city';

const DonorSchema: Schema = new Schema(
  {
    donor_id: { type: String, required: false },
    name: { type: String, required: true },
    last_donation_time: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.DONOR,
    },
    address: { type: String, required: true },
    age: { type: String, required: true },
    weight: { type: String, required: false },
    city: { type: String, enum: Object.values(City), required: true },
    blood_group: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Donor = mongoose.model<IDonor>('Donor', DonorSchema);

export default Donor;
