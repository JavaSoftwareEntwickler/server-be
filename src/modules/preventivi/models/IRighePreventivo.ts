import { Preventivo } from "./preventivo.entity";

export interface IRigaPreventivo {
    id: number | null;
    descrizione: string;
    um: string;
    quantita: number;
    importo: number;
    importoTotale: number;
    preventivo: Preventivo;
    creatoIl: Date;
    modificatoIl: Date;
}
//export interface RighePreventivoModel { descrizione: string; quantita: number; um: String; importo: number; }
