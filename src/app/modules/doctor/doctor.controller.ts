import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IDoctor } from './doctor.interface';
import httpStatus from 'http-status';
import { DoctorService } from './doctor.service';

const addDoctor: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await DoctorService.addDoctor(data);
  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Add Doctor successfully',
    data: result,
  });
});

const getDoctors: RequestHandler = catchAsync(async (req, res) => {
  const result = await DoctorService.getDoctors();
  sendResponse<IDoctor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived Doctor successfully',
    data: result,
  });
});

const getSingleDoctor: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DoctorService.getSingleDoctor(id);
  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived single Doctor successfully',
    data: result,
  });
});

const updateDoctor: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await DoctorService.updateDoctor(id, updatedData);
  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Doctor successfully',
    data: result,
  });
});

const deleteDoctor: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorService.deleteDoctor(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor deleted successfully !',
    data: result,
  });
});

export const DoctorController = {
  addDoctor,
  getDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
