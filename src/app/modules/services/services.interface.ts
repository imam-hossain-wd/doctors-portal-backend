
/* eslint-disable no-unused-vars */
import mongoose from "mongoose";


export type IService = {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    specialization_id:string;

  };
