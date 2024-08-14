import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";
import { IUser } from "../auth/auth.interface";
import { RequestHandler } from "express";

import pick from "../../../shared/pick";
import { userSearchAbleFields } from "./user.constants";


const getAllUsers:RequestHandler = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'sortOrder', 'page', 'limit']);
  const filters = pick(req.query,userSearchAbleFields);
    const result = await userService.getAllUsers(options,filters);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrived all users successfully',
      data: result
    });
  });


const getSingleUser:RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await userService.getSingleUser(id);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrived single user successfully',
      data: result,
    });
  });

  const updateUser:RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await userService.updateUser(id, updatedData);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "update user successfully",
      data: result,
    });
});
  
  const deleteUser:RequestHandler = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await userService.deleteUser(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully !',
      data: result
    });
  });




  export const userController = {
    getSingleUser,
    getAllUsers,
    updateUser,
    deleteUser,
    
  }