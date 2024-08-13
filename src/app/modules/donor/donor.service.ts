/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { generateRamdonDonor } from '../../../shared/generateRamdomId';
import Donor from './donor.model';
import { IDonor } from './donor.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { donorFilterableFields, donorSearchAbleFields } from './donor.constants';

const addDonor = async (payload: IDonor): Promise<IDonor | null> => {
  const donorId = generateRamdonDonor();
  payload.donor_id = donorId;
  const result = await Donor.create(payload);
  return result;
};

type SortOrder = 1 | -1 | 'asc' | 'desc';

const getDonors = async (options:any, filters:any) => {
  const { page, limit, skip, sortBy, sortOrder } =
  paginationHelpers.calculatePagination(options);
const { searchTerm, ...filtersData } = filters;

const andConditions: any[] = [];

// Search functionality
if (searchTerm) {
  const orConditions = donorSearchAbleFields.map(field => ({
    [field]: {
      $regex: searchTerm,
      $options: 'i',
    },
  }));
  andConditions.push({ $or: orConditions });
}

// Filtering functionality
Object.keys(filtersData).forEach(field => {
  //@ts-ignore
  if (donorFilterableFields.includes(field) && filtersData[field]) {
    andConditions.push({
      //@ts-ignore
      [field]: filtersData[field],
    });
  }
});

// Combine all conditions
const whereConditions =
  andConditions.length > 0 ? { $and: andConditions } : {};

// Ensure sortOrder is of the correct type
const sortConditions: { [key: string]: SortOrder } = {};
if (sortBy && sortOrder) {
  const validSortOrder: SortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : (sortOrder === '1' ? 1 : -1);
  sortConditions[sortBy] = validSortOrder;
}

// Querying the database
const [data, total] = await Promise.all([
  Donor.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit),
    Donor.countDocuments(whereConditions),
]);

// Return the results
return {
  meta: {
    page,
    limit,
    total,
    count: data.length,
  },
  data,
};
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
