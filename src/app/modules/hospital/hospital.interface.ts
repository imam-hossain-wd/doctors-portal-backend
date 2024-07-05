import mongoose from "mongoose";

export type IHospital = {
    _id?: mongoose.Types.ObjectId;
    hospital_id?: string;
    hospital_name: string;
    image: string;
    email: string;
    phone_number: string;
    address: string;
    city: string;
    description: string;
    website_link: string;
  };
  

