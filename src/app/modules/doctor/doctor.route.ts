import { Router } from 'express';
import { DoctorController } from './doctor.controller';

const router = Router();

router.post('/create', DoctorController.addDoctor);
router.get('/', DoctorController.getDoctors);

router.get('/:id', DoctorController.getSingleDoctor);
router.patch('/:id', DoctorController.updateDoctor);
router.delete('/:id', DoctorController.deleteDoctor);

export const DoctorRoutes = router;
