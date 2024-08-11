import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { HospitalController } from './hospital.controller';

const router = Router();

router.post(
  '/create',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  HospitalController.createHospital
);

router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.DOCTOR,
  //   ENUM_USER_ROLE.DONOR
  // ),
  HospitalController.getAllHospitals
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.PATIENT,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.DOCTOR,
    ENUM_USER_ROLE.DONOR
  ),
  HospitalController.getSingleHospital
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  HospitalController.updateHospital
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  HospitalController.deleteHospital
);

export const HospitalRoutes = router;
