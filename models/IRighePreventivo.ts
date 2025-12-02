import { Preventivo } from "./preventivo";

export interface IRighePreventivo {
    id: number;
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
