// src/modules/preventivi/controllers/preventivo.controller.ts
import { Request, Response } from 'express';
import { PreventivoService } from '../services/preventivo.service';

export class PreventivoController {
    private service = new PreventivoService();

    getAll = async (_req: Request, res: Response) => {
        const data = await this.service.getAll();
        res.json({ status: 'OK', data });
    };

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
        await this.service.delete(id);
        res.json({ status: 'OK' });
    };

    downloadPdf = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const pdf = await this.service.generatePdf(id);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=preventivo-${id}.pdf`
        );

        res.send(pdf);
    };
}
