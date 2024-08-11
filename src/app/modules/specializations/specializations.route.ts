import { Router } from 'express';
import { SpecializationsController } from './specializations.controller';


const router = Router();

router.post(
  '/create',
  SpecializationsController.createSpecializations
);
router.get(
  '/',
  SpecializationsController.getSpecializations
);



export const SpecializationRoutes = router;