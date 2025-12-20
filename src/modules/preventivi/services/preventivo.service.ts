// src/modules/preventivi/services/preventivo.service.ts
import { PreventivoRepository } from '../repository/preventivo.repository';
import { PdfService } from '../../pdf/pdf-service';
import { Preventivo } from '../models/preventivo.entity';
import { RighePreventivo } from '../models/riga-preventivo.entity';
import { IPreventivo } from '../models/IPreventivo';

export class PreventivoService {
    private repo = new PreventivoRepository();
    private pdfService = new PdfService();

    getAll() {
        return this.repo.findAll();
    }

    create(preventivo: Preventivo) {
        return this.repo.create(preventivo);
    }

    async update(id: number, preventivo: Preventivo) {

        const bodySenzaIdNull = {
            ...preventivo,
            righe: preventivo.righe.map(r => {
                if (r.id === null || r.id === undefined) {
                    const { id, ...rest } = r;
                    return rest;
                }
                return r;
            })
        } as IPreventivo;

        const entity = await this.repo.preload({
            ...bodySenzaIdNull
        });

        if (!entity) {
            throw new Error('Preventivo non trovato');
        }

        return this.repo.update(entity);
    }


    async delete(id: number) {
        return this.repo.deleteById(id);
    }

    async generatePdf(id: number) {
        const preventivo = await this.repo.findById(id);
        if (!preventivo) {
            throw new Error('Preventivo non trovato');
        }
        return this.pdfService.generaPreventivo(preventivo);
    }
}
