/* eslint-disable @typescript-eslint/no-this-alias */
// import { Schema, model } from 'mongoose';
// import { IHospital } from './hospital.interface';

import mongoose, { Schema } from 'mongoose';
import { IHospital } from './hospital.interface';
import { City } from '../../../enums/city';

const HospitalSchema: Schema = new Schema(
  {
    hospital_id: { type: String, unique: true },
    hospital_name: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, enum: Object.values(City), required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    website_link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate a unique 4-digit hospital_id
HospitalSchema.pre<IHospital>('save', async function (next) {
  const hospital = this;
  if (!hospital.hospital_id) {
    let newId;
    let existingHospital;

    // Generate a unique 4-digit ID
    do {
      newId = Math.floor(1000 + Math.random() * 9000).toString();
      existingHospital = await mongoose
        .model('Hospital')
        .findOne({ hospital_id: newId });
    } while (existingHospital);

    hospital.hospital_id = newId;
  }
  next();
});

const Hospital = mongoose.model<IHospital>('Hospital', HospitalSchema);

export default Hospital;
