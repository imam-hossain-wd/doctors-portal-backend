import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { DonorService } from './donor.service';
import { IDonor } from './donor.interface';
import pick from '../../../shared/pick';
import { donorFilterableFields } from './donor.constants';


const addDonor: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await DonorService.addDonor(data);
  sendResponse<IDonor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Add Donor successfully',
    data: result,
  });
});

const getDonors: RequestHandler = catchAsync(async (req, res) => {

  const options = pick(req.query, ['sortBy', 'sortOrder', 'page', 'limit']);
  const filters = pick(req.query,donorFilterableFields);

  const result = await DonorService.getDonors(options, filters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived Donor successfully',
    data: result,
  });
});

const getSingleDonor: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DonorService.getSingleDonor(id);
  sendResponse<IDonor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived single Donor successfully',
    data: result,
  });
});

const updateDonor: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await DonorService.updateDonor(id, updatedData);
  sendResponse<IDonor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Donor successfully',
    data: result,
  });
});

const deleteDonor: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DonorService.deleteDonor(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donor deleted successfully !',
    data: result,
  });
});

export const DonorController = {
  addDonor,
  getDonors,
  getSingleDonor,
  updateDonor,
  deleteDonor,
};
