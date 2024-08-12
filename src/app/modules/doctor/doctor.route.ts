

import { Router } from 'express';
import { DoctorController } from './doctor.controller';



const router = Router();

router.post(
  '/create',
  DoctorController.addDoctor
);
router.get(
  '/',
  DoctorController.getDoctors
);




export const DoctorRoutes = router;