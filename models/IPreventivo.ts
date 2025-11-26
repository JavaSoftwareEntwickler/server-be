import { IRighePreventivo } from "./IRighePreventivo";

export interface IPreventivo {
    id: number;
    nomeCliente: string;
    dataPreventivo: string;
    importoTotale: number;
    creatoIl: Date;
    modificatoIl: Date;
}