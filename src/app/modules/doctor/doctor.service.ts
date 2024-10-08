/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { generateRamdonDoctorId } from './../../../shared/generateRamdomId';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IDoctor, IDoctorReview, IFiltersProps } from './doctor.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  doctorFilterableFields,
  doctorSearchAbleFields,
} from './doctor.constants';
import { Doctor, DoctorReview } from './doctor.model';
import { IPaginationProps } from '../../../interfaces/common';

const addDoctor = async (payload: IDoctor): Promise<IDoctor | null> => {
  const doctor_id = generateRamdonDoctorId();
  payload.doctor_id = doctor_id;
  const result = await Doctor.create(payload);
  return result;
};

type SortOrder = 1 | -1 | 'asc' | 'desc';

const getDoctors = async (
  options: IPaginationProps,
  filters: IFiltersProps
): Promise<any> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions: any[] = [];

  // Search functionality
  if (searchTerm) {
    const orConditions = doctorSearchAbleFields.map(field => ({
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
    if (doctorFilterableFields.includes(field) && filtersData[field]) {
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
    const validSortOrder: SortOrder =
      sortOrder === 'asc' || sortOrder === 'desc'
        ? sortOrder
        : sortOrder === '1'
        ? 1
        : -1;
    sortConditions[sortBy] = validSortOrder;
  }

  // Querying the database
  const [data, total] = await Promise.all([
    Doctor.find(whereConditions)
      .populate('specilization_id')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit),
    Doctor.countDocuments(whereConditions),
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

// doctor review

const addDoctorReview = async (
  payload: IDoctorReview
): Promise<IDoctorReview | null> => {
  const result = await DoctorReview.create(payload);
  return result;
};
const allDoctorReviews = async (): Promise<IDoctorReview[] | null> => {
  const result = await DoctorReview.find({});
  return result;
};

const singleDoctorReview = async (
  id: string
): Promise<IDoctorReview | null> => {
  const result = await DoctorReview.findById(id);
  return result;
};


const updateDoctorReview = async (
  payload: IDoctorReview,
  id: string
): Promise<IDoctorReview | null> => {
  const isDoctorExist = await DoctorReview.findOne({ _id: id });

  if (!isDoctorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }
  const result = await DoctorReview.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};


const deleteDoctorReview = async (id: string): Promise<any> => {
  const result = await DoctorReview.findByIdAndDelete(id);
  return result;
};

export const DoctorService = {
  addDoctor,
  getDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
  addDoctorReview,
  allDoctorReviews,
  singleDoctorReview,
  updateDoctorReview,
  deleteDoctorReview,
};
