import mongoose from "mongoose";
import { UserRole } from "../../../enums/user";
import { City } from "../../../enums/city";



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
