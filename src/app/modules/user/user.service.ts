/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../auth/auth.interface';
import { User } from '../auth/auth.model';
import { userFilterableFields, userSearchAbleFields } from './user.constants';
import { paginationHelpers } from '../../../helpers/paginationHelper';



type SortOrder = 1 | -1 | 'asc' | 'desc';

const getAllUsers = async (options:any,filters:any) => {
  const { page, limit, skip, sortBy, sortOrder } =
  paginationHelpers.calculatePagination(options);
const { searchTerm, ...filtersData } = filters;
const andConditions: any[] = [];

if (searchTerm) {
  const orConditions = userSearchAbleFields.map(field => ({
    [field]: {
      $regex: searchTerm,
      $options: 'i',
    },
  }));
  andConditions.push({ $or: orConditions });
}

Object.keys(filtersData).forEach(field => {
  if (userFilterableFields.includes(field) && filtersData[field]) {
    andConditions.push({
      
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
  User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit),
    User.countDocuments(whereConditions),
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

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isexits = await User.findOne({ _id: id });
  if (!isexits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user is not found');
  }
  const singleUser = await User.findOne({ _id: id });
  return singleUser;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
