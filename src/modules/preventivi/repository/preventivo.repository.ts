// src/modules/preventivi/repository/preventivo.repository.ts
import { AppDataSource } from '../../../config/data-source';
import { Preventivo } from '../models/preventivo.entity';

export class PreventivoRepository {
    private repo = AppDataSource.getRepository(Preventivo);

    findAll() {
        return this.repo.find({ relations: ['righe'] });
    }

    findById(id: number) {
        return this.repo.findOne({ where: { id }, relations: ['righe'] });
    }

    create(preventivo: Preventivo) {
        return this.repo.save(preventivo);
    }

    preload(data: Partial<Preventivo>) {
        return this.repo.preload(data);
    }

    update(preventivo: Preventivo) {
        return this.repo.save(preventivo);
    }

    deleteById(id: number) {
        return this.repo.delete(id);
    }
}
