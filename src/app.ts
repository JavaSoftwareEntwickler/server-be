// src/app.ts
import express from 'express';
import cors from 'cors';
import preventivoRoutes from './modules/preventivi/preventivo.routes';
import righePreventivoRoutes from './modules/preventivi/righe-preventivo.routes';

export function createServer() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/preventivi', preventivoRoutes);
    app.use('/righe-preventivo', righePreventivoRoutes);
    return app;
}
