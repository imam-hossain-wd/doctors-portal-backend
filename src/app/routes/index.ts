import { ServiceRoutes } from './../modules/services/services.route';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { HospitalRoutes } from '../modules/hospital/hospital.route';
import { SpecializationRoutes } from '../modules/specializations/specializations.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/hospital',
    route: HospitalRoutes,
  },
  {
    path: '/doctor',
    route: DoctorRoutes,
  },
  {
    path: '/specializations',
    route: SpecializationRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
];
//@ts-ignore
moduleRoutes.forEach(route => router.use(route.path, route.route));

export const routes = router;