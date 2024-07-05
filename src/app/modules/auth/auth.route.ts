import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { profileUpload } from '../../../utils/multerUploader';


const router = Router();

router.post(
  '/signup',
  profileUpload.single('image'),
  // validateRequest(AuthValidation.createUserZodSchema),
  authController.createUser
);

router.patch(
  '/change-password',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.PATIENT,
    ENUM_USER_ROLE.DOCTOR,
    ENUM_USER_ROLE.DONOR
  ),
  validateRequest(AuthValidation.changePassWordZodSchema),
  authController.changePAssword
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginUserZodSchema),
  authController.logInUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  authController.refreshToken
);

export const AuthRoutes = router;
