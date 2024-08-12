import { IDoctor } from "./doctor.interface";
import Doctor from "./doctor.model";




const addDoctor = async (
    payload: IDoctor
  ): Promise<IDoctor | null> => {
    const result = await Doctor.create(payload);
    return result;
  };

const getDoctors = async (
  ): Promise<IDoctor[] | null> => {
    const result = await Doctor.find({});
    return result;
  };


  export const DoctorService = {
    addDoctor,
    getDoctors
  }