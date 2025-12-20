import { Request, Response } from 'express';
import { RighePreventivoService } from '../services/righe-preventivo.service';

export class RighePreventivoController {
    private service = new RighePreventivoService();

    create = async (req: Request, res: Response) => {
        const data = await this.service.create(req.body);
        res.json({ status: 'OK', data });
    };

    update = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const data = await this.service.update(id, req.body);
        res.json({ status: 'OK', data });
    };

    delete = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const data = await this.service.delete(id);
        res.json({ status: 'OK', data });
    };
}
