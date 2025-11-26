import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IPreventivo } from "./IPreventivo";
import { IRighePreventivo } from "./IRighePreventivo";


@Entity()
export class RighePreventivo implements IRighePreventivo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descrizione: string;

    @Column()
    quantita: number;

    @CreateDateColumn()
    creatoIl: Date;

    @UpdateDateColumn()
    modificatoIl: Date;
}