import { Router } from 'express';
import { healthController } from '.';

const router = Router();

// GET
router.get('/', healthController.checkHealth);

export default router;
