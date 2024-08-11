import { ISpecializations } from "./specializations.interface";
import Specializations from "./specializations.model";


const createSpecializations = async (
    payload: ISpecializations
  ): Promise<ISpecializations | null> => {
    const createdUser = await Specializations.create(payload);
    return createdUser;
  };



  export const specializationsService = {
    createSpecializations
  }
  