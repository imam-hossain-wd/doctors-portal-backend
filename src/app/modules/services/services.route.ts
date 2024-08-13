import { Router } from 'express';
import { ServiceController } from './services.controller';

const router = Router();

router.post('/create', ServiceController.createService);
router.get('/', ServiceController.getServices);
router.get('/:id', ServiceController.getSingleService);
router.patch('/:id', ServiceController.updateService);
router.delete('/:id', ServiceController.deleteService);

export const ServiceRoutes = router;
