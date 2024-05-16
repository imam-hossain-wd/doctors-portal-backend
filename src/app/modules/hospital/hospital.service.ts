/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IHospital } from './hospital.interface';
import { Hospital } from './hospital.model';
import { generateRamdonHospitalId } from '../../../shared/generateRamdomId';


const createHospital = async (
  payload: IHospital
): Promise<IHospital | null> => {
  const hospital_id = generateRamdonHospitalId();
  //@ts-ignore
  payload.hospital_id = hospital_id;

  const createdUser = await Hospital.create(payload);
  return createdUser;
};

const getAllHospitals = async () => {
  const result = await Hospital.find({});
  return result;
};

const getSingleHospital = async (id: string): Promise<IHospital | null> => {
  const isexits = await Hospital.findOne({ _id: id });
  if (!isexits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hospital is not found');
  }
  const singleUser = await Hospital.findOne({ _id: id });
  return singleUser;
};

const updateHospital = async (
  id: string,
  payload: Partial<IHospital>
): Promise<IHospital | null> => {
  const isExist = await Hospital.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hospital not found !');
  }

  const result = await Hospital.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteHospital = async (id: string) => {
  const result = await Hospital.findByIdAndDelete(id);
  return result;
};

export const HospitalService = {
  createHospital,
  getAllHospitals,
  getSingleHospital,
  updateHospital,
  deleteHospital,
};
