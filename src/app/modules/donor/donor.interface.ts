import mongoose from "mongoose";
import { UserRole } from "../../../enums/user";
import { City } from "../../../enums/city";



export type IDonor = {
    _id?: mongoose.Types.ObjectId;
    donor_id?: string;
    name: string;
    email:string;
    last_donation_time: string;
    password:string;
    image?: string;
    phone_number: string;
    role:UserRole;
    address: string;
    city: City;
    rating:number;
    blood_group:string;
  };
