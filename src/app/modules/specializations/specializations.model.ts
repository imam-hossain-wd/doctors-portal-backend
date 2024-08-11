import mongoose, { Schema } from 'mongoose';
import { ISpecializations } from './specializations.interface';

const SpecializationsSchema: Schema = new Schema(
  {
    name: { type: String, unique: true },
    description: { type: String, unique: false },
    
  },
  {
    timestamps: true,
  }
);

const Specializations = mongoose.model<ISpecializations>(
  'Specializations',
  SpecializationsSchema
);

export default Specializations;
