import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './db/data-source';
import { Preventivo } from './models/preventivo';

const app = express();
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
    .then(() => {
        app.listen(8088, () => {
            console.log('App in ascolto nella porta 8088');

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
                const preventivo: Preventivo = req.body;
                const risultato = await preventivoRepository.save({
                    ...preventivo,
                    id: id
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


