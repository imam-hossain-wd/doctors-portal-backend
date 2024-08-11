import { ISpecializations } from './specializations.interface';
import Specializations from './specializations.model';

const createSpecializations = async (
  payload: ISpecializations
): Promise<ISpecializations | null> => {
  const createdUser = await Specializations.create(payload);
  return createdUser;
};

const getSpecializations = async (): Promise<ISpecializations[] | null> => {
  const result = await Specializations.find({});
  return result;
};

export const specializationsService = {
  createSpecializations,
  getSpecializations,
};
