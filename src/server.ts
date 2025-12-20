// src/server.ts
import { AppDataSource } from './config/data-source';
import { createServer } from './app';

const PORT = 8088;

AppDataSource.initialize()
    .then(() => {
        const app = createServer();
        app.listen(PORT, () => {
            console.log(`🚀 Server avviato sulla porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Errore inizializzazione DataSource', err);
    });
