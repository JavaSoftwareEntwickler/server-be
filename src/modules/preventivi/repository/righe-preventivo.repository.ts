import { AppDataSource } from '../../../config/data-source';
import { RighePreventivo } from '../models/riga-preventivo.entity';

export class RighePreventivoRepository {
    private repo = AppDataSource.getRepository(RighePreventivo);

    create(riga: RighePreventivo) {
        return this.repo.save(riga);
    }

    update(id: number, data: Partial<RighePreventivo>) {
        return this.repo.save({ id, ...data });
    }

    deleteById(id: number) {
        return this.repo.delete(id);
    }
}
