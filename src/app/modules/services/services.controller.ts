import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ServiceService } from "./services.service";
import { IService } from "./services.interface";





const createService: RequestHandler = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await ServiceService.crteateService(data);
    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Add Service successfully',
      data: result,
    });
  });


const getServices: RequestHandler = catchAsync(async (req, res) => {
    const result = await ServiceService.getServices();
    sendResponse<IService[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrived Service successfully',
      data: result,
    });
  });


  const getSingleService:RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await ServiceService.getSingleService(id);
    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrived single Service successfully',
      data: result,
    });
  });

  

  const updateService:RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await ServiceService.updateService(id, updatedData);
    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "update Service successfully",
      data: result,
    });
});
  
  const deleteService:RequestHandler = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await ServiceService.deleteService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service deleted successfully !',
      data: result
    });
  });


  export const ServiceController = {
    createService,
    getServices,
    getSingleService,updateService,
    deleteService
  }