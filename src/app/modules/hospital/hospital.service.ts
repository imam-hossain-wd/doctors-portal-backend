/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { hospitalFilterableFields, hospitalSearchAbleFields } from './hospital.constrants';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IHospital } from './hospital.interface';
import Hospital from './hospital.model';
import { IGenericResponse, IPaginationProps } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';


const createHospital = async (
  payload: IHospital
): Promise<IHospital | null> => {
  const createdUser = await Hospital.create(payload);
  return createdUser;
};



type SortOrder = 1 | -1 | 'asc' | 'desc';

const getAllHospitals = async (
  options: IPaginationProps,
  filters: any
): Promise<IGenericResponse<IHospital[]>> => {

  
  const { page, limit, skip, sortBy, sortOrder } =
  paginationHelpers.calculatePagination(options);
const { searchTerm, ...filtersData } = filters;

const andConditions: any[] = [];

// Search functionality
if (searchTerm) {
  const orConditions = hospitalSearchAbleFields.map(field => ({
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
  if (hospitalFilterableFields.includes(field) && filtersData[field]) {
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
  Hospital.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit),
    Hospital.countDocuments(whereConditions),
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
