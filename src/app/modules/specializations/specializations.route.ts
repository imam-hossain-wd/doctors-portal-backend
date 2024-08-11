import { Router } from 'express';
import { SpecializationsController } from './specializations.controller';


const router = Router();

router.post(
  '/create',
  SpecializationsController.createSpecializations
);



export const SpecializationRoutes = router;