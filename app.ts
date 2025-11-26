import express, { Request, Response } from 'express'
import cors from 'cors'
import { AppDataSource } from './db/data-source'
import e from 'express'
import { Preventivo } from './models/preventivo'

const app = express()
app.use(express.json())
app.use(cors())

AppDataSource.initialize()
    .then(() => {
        app.listen(8088, () => {
            console.log('App in ascolto nella porta 8088');

            const preventivoRepository = AppDataSource.getRepository(Preventivo);

            app.get('/preventivi', async (req: Request, res: Response) => {
                const preventivi = await preventivoRepository.find();
                return res.json({
                    status: 'OK',
                    data: preventivi
                });
            });

            app.post('/preventivo/crea', async (req: Request, res: Response) => {
                const preventivo: Preventivo = req.body;
                const risultato = await preventivoRepository.save(preventivo);

                return res.json({
                    status: 'OK',
                    data: risultato
                });
            });
        });
    })
    .catch((error) => {
        console.log('Error in AppDataSource.initialize: ', error)
    });


