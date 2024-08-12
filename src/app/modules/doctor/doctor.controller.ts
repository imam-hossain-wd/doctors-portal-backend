import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IDoctor } from "./doctor.interface";
import httpStatus from "http-status";
import { DoctorService } from "./doctor.service";




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


  export const DoctorController = {
    addDoctor 
  }