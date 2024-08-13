import httpStatus from 'http-status';
import { IService } from './services.interface';
import Service from './services.model';
import ApiError from '../../../errors/ApiError';


const crteateService = async (payload: IService): Promise<IService | null> => {
  const result = await Service.create(payload);
  return result;
};


const getServices = async (): Promise<IService[] | null> => {
  const result = await Service.find({});
  return result;
};


const getSingleService = async (id: string): Promise<IService | null> => {
  const isexits = await Service.findOne({ _id: id });
  if (!isexits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service is not found');
  }
  const singleService = await Service.findOne({ _id: id });
  return singleService;
};


const updateService = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const isExist = await Service.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found !');
  }

  const result = await Service.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};


const deleteService = async (id: string) => {
  console.log(id, 'id delete Service');
  const result = await Service.findByIdAndDelete(id);
  return result;
};


export const ServiceService = {
  crteateService,
  getServices,
  getSingleService,
  updateService,
  deleteService,
};
