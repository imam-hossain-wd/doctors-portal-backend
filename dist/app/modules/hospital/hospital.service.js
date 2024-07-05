"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalService = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hospital_model_1 = require("./hospital.model");
const generateRamdomId_1 = require("../../../shared/generateRamdomId");
const createHospital = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hospital_id = (0, generateRamdomId_1.generateRamdonHospitalId)();
    //@ts-ignore
    payload.hospital_id = hospital_id;
    const createdUser = yield hospital_model_1.Hospital.create(payload);
    return createdUser;
});
const getAllHospitals = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hospital_model_1.Hospital.find({});
    return result;
});
const getSingleHospital = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isexits = yield hospital_model_1.Hospital.findOne({ _id: id });
    if (!isexits) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Hospital is not found');
    }
    const singleUser = yield hospital_model_1.Hospital.findOne({ _id: id });
    return singleUser;
});
const updateHospital = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield hospital_model_1.Hospital.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Hospital not found !');
    }
    const result = yield hospital_model_1.Hospital.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteHospital = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hospital_model_1.Hospital.findByIdAndDelete(id);
    return result;
});
exports.HospitalService = {
    createHospital,
    getAllHospitals,
    getSingleHospital,
    updateHospital,
    deleteHospital,
};
