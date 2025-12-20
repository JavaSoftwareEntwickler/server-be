import { IRigaPreventivo } from "./IRighePreventivo";
import { RighePreventivo } from "./riga-preventivo.entity";

export interface IPreventivo {
    id: number;
    nomeCliente: string;
    indirizzo: string;
    dataPreventivo: Date;
    importoTotale: number;
    righe: RighePreventivo[];
    creatoIl: Date;
    modificatoIl: Date;
}