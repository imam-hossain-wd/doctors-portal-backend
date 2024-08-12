/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';

export enum Specialty  {
  Cardiologist = 'Cardiologist',
  Pulmonary = 'Pulmonary',
  Radiology = 'Radiology',
  Urology = 'Urology',
  Neurology = 'Neurology',
  Hypnotherapy = 'Hypnotherapy',
}

export type ISpecializations = {
  _id?: mongoose.Types.ObjectId;
  name: Specialty ;
  description?: string;
};
