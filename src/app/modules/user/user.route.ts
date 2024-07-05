import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.PATIENT,
  //   ENUM_USER_ROLE.DOCTOR,
  //   ENUM_USER_ROLE.DONOR
  // ),
  userController.getAllUsers
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
  userController.getSingleUser
);

router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.PATIENT,
    ENUM_USER_ROLE.DOCTOR,
    ENUM_USER_ROLE.DONOR
  ),
  userController.updateUser
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.DOCTOR,
    ENUM_USER_ROLE.DONOR,
    ENUM_USER_ROLE.PATIENT
  ),
  userController.deleteUser
);

export const UserRoutes = router;
