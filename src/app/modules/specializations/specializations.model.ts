import mongoose, { Schema } from 'mongoose';
import { ISpecializations } from './specializations.interface';
import { Specialty } from '../../../enums/speciality';

const SpecializationsSchema: Schema = new Schema(
  {
    name: {
      type: String,
      enum: Object.values(Specialty),
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
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
