import { SensoresWorker } from './core/workers/sensores-worker';
import { AppRoutes } from './modules/app.routes';
import { Server } from './server';
import listEndpoints from 'express-list-endpoints';
import 'reflect-metadata';

new Server({
  port: 3002,
  routes: AppRoutes.routes,
  workers: [new SensoresWorker()]
}).listen();
console.log(listEndpoints(AppRoutes.routes));
