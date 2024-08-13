import { Router } from 'express';
import { DonorController } from './donor.controller';

const router = Router();

router.post('/create', DonorController.addDonor);
router.get('/', DonorController.getDonors);

router.get('/:id', DonorController.getSingleDonor);
router.patch('/:id', DonorController.updateDonor);
router.delete('/:id', DonorController.deleteDonor);

export const DonorRoutes = router;
