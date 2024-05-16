import mongoose from "mongoose";

export type IHospital = {
    _id?: mongoose.Types.ObjectId;
    hospital_id?: string;
    name: string;
    address: string;
    phone_number: string;
    email: string;
  };
  

