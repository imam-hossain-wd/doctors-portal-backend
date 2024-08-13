/* eslint-disable no-unused-vars */


import mongoose from "mongoose";
import { City, UserRole } from "../../../constants";


export type IDoctor = {
    _id?: mongoose.Types.ObjectId;
    doctor_id?: string;
    name: string;
    email:string;
    qualification:string;
    password:string;
    speciality:string;
    image: string;
    phone_number: string;
    role:UserRole;
    address: string;
    city: City;
    rating:number;
    description: string;
    website_link: string;
  };





