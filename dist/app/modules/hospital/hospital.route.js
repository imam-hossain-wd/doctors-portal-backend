"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const hospital_controller_1 = require("./hospital.controller");
const router = (0, express_1.Router)();
router.post('/create', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
hospital_controller_1.HospitalController.createHospital);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DOCTOR, user_1.ENUM_USER_ROLE.DONOR), hospital_controller_1.HospitalController.getAllHospitals);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.PATIENT, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DOCTOR, user_1.ENUM_USER_ROLE.DONOR), hospital_controller_1.HospitalController.getSingleHospital);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), hospital_controller_1.HospitalController.updateHospital);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), hospital_controller_1.HospitalController.deleteHospital);
exports.HospitalRoutes = router;
