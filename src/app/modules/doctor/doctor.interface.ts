/* eslint-disable no-unused-vars */


import mongoose from "mongoose";
import { City, role } from "./doctor.constants";

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
    role:role;
    address: string;
    city: City;
    rating:number;
    description: string;
    website_link: string;
  };





