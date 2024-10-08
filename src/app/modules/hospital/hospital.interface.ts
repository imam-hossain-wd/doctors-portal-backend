import mongoose from "mongoose";
import { City } from "../../../enums/city";


export type IHospital = {
    _id?: mongoose.Types.ObjectId;
    hospital_id?: string;
    hospital_name: string;
    image: string;
    email: string;
    phone_number: string;
    address: string;
    city: City;
    rating:number;
    description: string;
    website_link: string;
  };


  export type IHospitalPaginationProps ={
    sortBy?: string;
    sortOrder?: string;
    page?:number;
    limit?:number;
}

export type IHospitalFiltersProps = {
  searchTerm?: string;
  city?: string;
  rating?: number;
}


  

