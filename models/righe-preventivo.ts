import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IRighePreventivo } from "./IRighePreventivo";
import { Preventivo } from "./preventivo";


@Entity()
export class RighePreventivo implements IRighePreventivo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descrizione: string;

    @Column()
    quantita: number;

    @ManyToOne(() => Preventivo, preventivo => preventivo.righe, { onDelete: "CASCADE" })
    preventivo: Preventivo;

    @CreateDateColumn()
    creatoIl: Date;

    @UpdateDateColumn()
    modificatoIl: Date;
}