

import mongoose from "mongoose";

export type ISpecializations= {
    _id?: mongoose.Types.ObjectId;
    name:string;
    description?:string;    
  };