import { Router } from 'express';
import { RighePreventivoController } from './controllers/righe-preventivo.controller';

const router = Router();
const controller = new RighePreventivoController();

router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
