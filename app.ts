import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './db/data-source';
import { Preventivo } from './models/preventivo';
import { RighePreventivo } from './models/righe-preventivo';
import { IRighePreventivo } from './models/IRighePreventivo';

const app = express();
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
    .then(() => {
        app.listen(8088, () => {
            console.log('App in ascolto nella porta 8088');
            const righePreventivoRepository = AppDataSource.getRepository(RighePreventivo);
            const preventivoRepository = AppDataSource.getRepository(Preventivo);


            app.get('/preventivi', async (req: Request, res: Response) => {
                const preventivi = await preventivoRepository.find({ relations: ["righe"] });
                return res.json({
                    status: 'OK',
                    data: preventivi
                });
            });

            app.post('/preventivi', async (req: Request, res: Response) => {
                const preventivo: Preventivo = req.body;
                const risultato = await preventivoRepository.save(preventivo);

                return res.json({
                    status: 'OK',
                    data: risultato
                });
            });

            app.put('/preventivi/:id', async (req: Request, res: Response) => {
                const id = Number(req.params.id);
                // Rimuovi l'ID dalle righe che lo hanno valorizzato a null perchè nuove
                const bodyRequestSenzaIDseNull = {
                    ...req.body,
                    righe: req.body.righe.map((riga: IRighePreventivo) => {
                        if (riga.id === null) {
                            const { id, ...restoRiga } = riga;  // Rimuovi 'id' se è null
                            return { ...restoRiga };  // Restituisci la riga senza l'ID
                        }
                        return riga;  // Mantieni la riga così com'è se l'ID non è null
                    })
                };
                const preventivoEsistente = await preventivoRepository.preload({
                    id: id,
                    ...bodyRequestSenzaIDseNull
                });
                // Ora salva TUTTO in automatico
                const risultato = await preventivoRepository.save({
                    id: id,
                    ...preventivoEsistente
                });
                return res.json({
                    status: 'OK',
                    data: risultato
                });
            });

            app.delete('/preventivi/:id', async (req: Request, res: Response) => {
                const id = Number(req.params.id);
                const risultato = await preventivoRepository.delete(id);

                return res.json({
                    status: 'OK',
                    data: risultato
                });
            });

        });
    })
    .catch((error) => {
        console.log('Error in AppDataSource.initialize: ', error);
    });


