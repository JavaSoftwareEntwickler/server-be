import { DataSource } from "typeorm";
import { Preventivo } from "../modules/preventivi/models/preventivo.entity";
import { RighePreventivo } from "../modules//preventivi/models/riga-preventivo.entity";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'preventivi.db',
    synchronize: true,
    logging: true,
    entities: [Preventivo, RighePreventivo]
});