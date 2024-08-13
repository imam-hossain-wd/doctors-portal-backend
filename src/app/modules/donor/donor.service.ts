import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { generateRamdonDonor } from '../../../shared/generateRamdomId';
import Donor from './donor.model';
import { IDonor } from './donor.interface';

const addDonor = async (payload: IDonor): Promise<IDonor | null> => {
  const donorId = generateRamdonDonor();
  payload.donor_id = donorId;
  const result = await Donor.create(payload);
  return result;
};

const getDonors = async (): Promise<IDonor[] | null> => {
  const result = await Donor.find({});
  return result;
};

const getSingleDonor = async (id: string): Promise<IDonor | null> => {
  const isexits = await Donor.findOne({ _id: id });
  if (!isexits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donor is not found');
  }
  const singleDonor = await Donor.findOne({ _id: id });
  return singleDonor;
};

const updateDonor = async (
  id: string,
  payload: Partial<IDonor>
): Promise<IDonor | null> => {
  const isExist = await Donor.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donor not found !');
  }

  const result = await Donor.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteDonor = async (id: string) => {
  const result = await Donor.findByIdAndDelete(id);
  return result;
};

export const DonorService = {
  addDonor,
  getDonors,
  getSingleDonor,
  updateDonor,
  deleteDonor,
};
