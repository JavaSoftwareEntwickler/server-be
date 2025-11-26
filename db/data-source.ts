import { DataSource } from "typeorm";
import { Preventivo } from "../models/preventivo";
import { RighePreventivo } from "../models/righe-preventivo";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'preventivi.db',
    synchronize: true,
    logging: true,
    entities: [Preventivo, RighePreventivo]
});