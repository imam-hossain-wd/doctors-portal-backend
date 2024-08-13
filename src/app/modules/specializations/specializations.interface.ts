/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';
import { Specialty } from '../../../enums/speciality';



export type ISpecializations = {
  _id?: mongoose.Types.ObjectId;
  name: Specialty ;
  description?: string;
};
