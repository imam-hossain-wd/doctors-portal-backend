import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RequestHandler } from 'express';
import { HospitalService } from './hospital.service';
import { IHospital } from './hospital.interface';

const createHospital: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await HospitalService.createHospital(data);
  sendResponse<IHospital>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Hospital successfully',
    data: result,
  });
});

const getAllHospitals: RequestHandler = catchAsync(async (req, res) => {
  const result = await HospitalService.getAllHospitals();
  sendResponse<IHospital[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived all Hospitals successfully',
    data: result,
  });
});

const getSingleHospital: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await HospitalService.getSingleHospital(id);
  sendResponse<IHospital>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived single Hospital successfully',
    data: result,
  });
});

const updateHospital: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await HospitalService.updateHospital(id, updatedData);
  sendResponse<IHospital>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Hospital successfully',
    data: result,
  });
});

const deleteHospital: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HospitalService.deleteHospital(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital deleted successfully !',
    data: result,
  });
});

export const HospitalController = {
  createHospital,
  getSingleHospital,
  getAllHospitals,
  updateHospital,
  deleteHospital,
};
