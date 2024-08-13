import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IDoctor } from './doctor.interface';
import Doctor from './doctor.model';

const addDoctor = async (payload: IDoctor): Promise<IDoctor | null> => {
  const result = await Doctor.create(payload);
  return result;
};

const getDoctors = async (): Promise<IDoctor[] | null> => {
  const result = await Doctor.find({});
  return result;
};

const getSingleDoctor = async (id: string): Promise<IDoctor | null> => {
  const isexits = await Doctor.findOne({ _id: id });
  if (!isexits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor is not found');
  }
  const singleDoctor = await Doctor.findOne({ _id: id });
  return singleDoctor;
};

const updateDoctor = async (
  id: string,
  payload: Partial<IDoctor>
): Promise<IDoctor | null> => {
  const isExist = await Doctor.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found !');
  }

  const result = await Doctor.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteDoctor = async (id: string) => {
  const result = await Doctor.findByIdAndDelete(id);
  return result;
};

export const DoctorService = {
  addDoctor,
  getDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
