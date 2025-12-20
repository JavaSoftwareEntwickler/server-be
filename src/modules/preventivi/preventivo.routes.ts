import { Router } from 'express';
import { PreventivoController } from './controllers/preventivo.controller';

const router = Router();
const controller = new PreventivoController();

router.get('/', controller.getAll);
router.get('/:id/pdf', controller.downloadPdf);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
