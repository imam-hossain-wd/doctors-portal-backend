import { hospitalFilterableFields } from './hospital.constrants';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IHospital, IHospitalFiltersProps, IHospitalPaginationProps } from './hospital.interface';
import Hospital from './hospital.model';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';


const createHospital = async (
  payload: IHospital
): Promise<IHospital | null> => {
  const createdUser = await Hospital.create(payload);
  return createdUser;
};


// const getAllHospitals = async (options:IHospitalPaginationProps, filters:IHospitalFiltersProps):Promise<IGenericResponse<IHospital[]>>  => {

//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filtersData } = filters;
//   const { sortBy, sortOrder } = options;

//   console.log(sortBy, sortOrder,page, limit, skip, searchTerm, filtersData ,'sortBy, sortOrder,page, limit, skip, searchTerm, ...filtersData ');

//   const andConditions = [];

// const stringFields = hospitalFilterableFields.filter(field => field !== 'price');
// //@ts-ignore
// const numericSearchTerm = !isNaN(parseFloat(searchTerm)) ? parseFloat(searchTerm) : null;
// const priceRange = 1;

// if (searchTerm) {
//   const orConditions = stringFields.map((field) => ({
//     [field]: {
//       $regex: searchTerm,
//       $options: 'i',
//     },
//   }));

//   if (category) {
//     andConditions.push({ category });
//   }
  

//   const whereConditions =
//   andConditions.length > 0 ? { $and: andConditions } : {};

// const sortConditions : {[key:string]:sortOrder} = {};

// if(sortBy && sortOrder){
//   //@ts-ignore
//   sortConditions[sortBy]= sortOrder
// }


// const [data, total] = await Promise.all([
//   Hospital.find(whereConditions).sort(sortConditions).skip(skip).limit(limit),
//   Hospital.countDocuments(whereConditions),
// ]);

// return {
//   meta: {
//     page,
//     limit,
//     total,
//     count: data.length
//   },
//   data
// };
// };

const getAllHospitals = async (
  options: IHospitalPaginationProps,
  filters: IHospitalFiltersProps
): Promise<IGenericResponse<IHospital[]>> => {

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  const { sortBy, sortOrder } = options;

  const andConditions = [];

  // Construct search condition
  if (searchTerm) {
    const orConditions = hospitalFilterableFields.map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    }));
    andConditions.push({ $or: orConditions });
  }

  // Add additional filters to the query
  Object.keys(filtersData).forEach((key) => {
    if (filtersData[key]) {
      andConditions.push({ [key]: filtersData[key] });
    }
  });

  // Combine conditions
  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  // Sort conditions
  const sortConditions: { [key: string]: string } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Execute query
  const [data, total] = await Promise.all([
    Hospital.find(whereConditions).sort(sortConditions).skip(skip).limit(limit),
    Hospital.countDocuments(whereConditions),
  ]);

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
