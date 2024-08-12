

import { Router } from 'express';
import { DoctorController } from './doctor.controller';



const router = Router();

router.post(
  '/create',
  DoctorController.addDoctor
);




export const DoctorRoutes = router;