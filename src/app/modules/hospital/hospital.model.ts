import { Schema, model } from 'mongoose';
import { IHospital } from './hospital.interface';


const hospitalSchema = new Schema<IHospital>(
  {
    hospital_id: { type: String },
    name: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
  },
);



export const Hospital = model<IHospital>('Hospital', hospitalSchema);