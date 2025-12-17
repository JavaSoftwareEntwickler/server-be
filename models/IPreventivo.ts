import { IRighePreventivo } from "./IRighePreventivo";
import { RighePreventivo } from "./righe-preventivo";

export interface IPreventivo {
    id: number;
    nomeCliente: string;
    dataPreventivo: Date;
    importoTotale: number;
    righe: RighePreventivo[];
    creatoIl: Date;
    modificatoIl: Date;
}