import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ISpecializations } from "./specializations.interface";
import { RequestHandler } from "express";
import { specializationsService } from "./specializations.service";



const createSpecializations: RequestHandler = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await specializationsService.createSpecializations(data);
    sendResponse<ISpecializations>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create Specializations successfully',
      data: result,
    });
  });

const getSpecializations: RequestHandler = catchAsync(async (req, res) => {
    const result = await specializationsService.getSpecializations();
    sendResponse<ISpecializations[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrived Specializations successfully',
      data: result,
    });
  });



  export const SpecializationsController = {
    createSpecializations,
    getSpecializations
  }
  