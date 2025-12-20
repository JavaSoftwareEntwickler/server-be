import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IRigaPreventivo } from "./IRighePreventivo";
import { Preventivo } from "./preventivo.entity";


@Entity()
export class RighePreventivo implements IRigaPreventivo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descrizione: string;

    @Column()
    um: string;

    @Column()
    quantita: number;

    @Column()
    importo: number;

    @Column()
    importoTotale: number;

    @ManyToOne(() => Preventivo, preventivo => preventivo.righe, { onDelete: "CASCADE" })
    preventivo: Preventivo;

    @CreateDateColumn()
    creatoIl: Date;

    @UpdateDateColumn()
    modificatoIl: Date;
}