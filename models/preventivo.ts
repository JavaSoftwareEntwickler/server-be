import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IPreventivo } from "./IPreventivo";
import { RighePreventivo } from "./righe-preventivo";


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

    @OneToMany(() => RighePreventivo, riga => riga.preventivo, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    righe: RighePreventivo[];

    @CreateDateColumn()
    creatoIl: Date;

    @UpdateDateColumn()
    modificatoIl: Date;
}