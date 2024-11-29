import express, { Router, Application } from 'express';
import { AppDataSource } from './core/db/data-source';
import cors from 'cors';
import { Seed } from './core/utils/seed';
import { WorkerInterface } from './core/workers/interface/worker-interface';

interface Options {
  port: number;
  routes: Router;
  workers: WorkerInterface[]
}


export class Server {
  private app: Application;
  private port: number;
  private routes: Router;
  private workers: WorkerInterface[];

  constructor(options: Options) {
    const { port, routes, workers } = options;

    this.app = express();
    this.port = port;
    this.routes = routes;
    this.workers = workers;

    this.initDatabase();
    
    this.middlewares();

    this.setupRoutes();
  }

  private async initDatabase() {
    try {
      await AppDataSource.initialize();
      Seed.start();
      this.initWorkers();
      console.log('Base de datos conectada exitosamente');
    } catch (error) {
      console.log(error)
      console.log('Algo salió mal al conectar la base de datos');
    }
  }

  private async setupRoutes() {
    this.app.use(this.routes);
  }

  private async middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initWorkers() {
    this.workers.forEach((worker) => {
      worker.start();
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    })
  }
}