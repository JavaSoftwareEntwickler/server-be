import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IPreventivo } from "./IPreventivo";
import { IRighePreventivo } from "./IRighePreventivo";


@Entity()
export class Preventivo implements IPreventivo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeCliente: string;

    @Column()
    dataPreventivo: string;

    @Column()
    importoTotale: number;

    @CreateDateColumn()
    creatoIl: Date;

    @UpdateDateColumn()
    modificatoIl: Date;
}