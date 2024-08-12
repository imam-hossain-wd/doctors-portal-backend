import { IDoctor } from "./doctor.interface";
import Doctor from "./doctor.model";




const addDoctor = async (
    payload: IDoctor
  ): Promise<IDoctor | null> => {
    const createdUser = await Doctor.create(payload);
    return createdUser;
  };


  export const DoctorService = {
    addDoctor
  }