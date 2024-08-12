import mongoose, { Schema } from "mongoose";
import {  City, role } from "./doctor.constants";
import { IDoctor } from "./doctor.interface";

const DoctorSchema: Schema = new Schema(
  {
    doctor_id: {
      type: String,
      unique: true,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    qualification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specializations",  // Reference to the Specializations model
        required: true,
      },
    password: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(role),
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      enum: Object.values(City),
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
    website_link: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;