import mongoose, { Schema } from "mongoose";
import { IService } from "./services.interface";


const ServiceSchema: Schema = new Schema(
  {

    name: {
      type: String,
      unique:true,
      required: true,
    },
   
    specilization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specializations",  // Reference to the Specializations model
        required: true,
      },

    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model<IService>("Service", ServiceSchema);

export default Service;