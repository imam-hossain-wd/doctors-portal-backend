"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRamdonHospitalId = exports.generateRamdonUserId = void 0;
//generate 5 digits ramdon user id
const generateRamdonUserId = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
exports.generateRamdonUserId = generateRamdonUserId;
//generate 5 digits ramdon hospital id
const generateRamdonHospitalId = () => {
    return Math.floor(10000 + Math.random() * 90000);
};
exports.generateRamdonHospitalId = generateRamdonHospitalId;
