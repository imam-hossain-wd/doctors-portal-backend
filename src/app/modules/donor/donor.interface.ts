import mongoose from "mongoose";
import { City, UserRole } from "../../../constants";


export type IDonor = {
    _id?: mongoose.Types.ObjectId;
    donor_id?: number;
    name: string;
    email:string;
    password:string;
    image?: string;
    phone_number: string;
    role:UserRole;
    address: string;
    city: City;
    rating:number;
    blood_group:string;
  };
