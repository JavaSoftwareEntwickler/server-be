import { RighePreventivoRepository } from '../repository/righe-preventivo.repository';
import { RighePreventivo } from '../models/riga-preventivo.entity';

export class RighePreventivoService {
    private repo = new RighePreventivoRepository();

    async create(riga: RighePreventivo) {
        const risultato = await this.repo.create(riga);

        return {
            id: risultato.id,
            descrizione: risultato.descrizione,
            um: risultato.um,
            quantita: risultato.quantita,
            importo: risultato.importo,
            importoTotale: risultato.importoTotale,
            creatoIl: risultato.creatoIl,
            modificatoIl: risultato.modificatoIl
        };
    }

    update(id: number, data: Partial<RighePreventivo>) {
        return this.repo.update(id, data);
    }

    delete(id: number) {
        return this.repo.deleteById(id);
    }
}
