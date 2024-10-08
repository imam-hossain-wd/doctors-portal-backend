import mongoose, { Schema } from "mongoose";
import { IDoctor, IDoctorReview } from "./doctor.interface";
import { UserRole } from "../../../enums/user";
import { City } from "../../../enums/city";


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
      // unique: false,
    },
    specilization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specializations", 
        required: true,
      },
    password: {
      type: String,
      required: true,
    },
    qualification: {
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
      enum: Object.values(UserRole),
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


const DoctorReviewSchema: Schema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: false,
    },
    rating: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specializations", 
        required: true,
      },
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Specializations", 
        required: true,
    },

  },
  {
    timestamps: true,
  }
);



export const DoctorReview = mongoose.model<IDoctorReview>("Doctor-Review", DoctorReviewSchema);

export const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);