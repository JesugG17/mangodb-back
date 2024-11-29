import { HectareaRepository } from "../../modules/hectareas/hectareas.repository";
import { HectareaService } from "../../modules/hectareas/hectareas.service";
import { SensoresRepository } from "../../modules/sensores/sensores.repository";
import { SensoresService } from "../../modules/sensores/sensores.service";
import { WorkerInterface } from "./interface/worker-interface";

export class HectareaWorkers implements WorkerInterface {
  public start(): void {
    throw new Error("Method not implemented.");
  }

  private readonly hectareaService: HectareaService;
  private readonly sensoresService: SensoresService;

  constructor() {
    this.hectareaService = new HectareaService(new HectareaRepository());
    this.sensoresService = new SensoresService(new SensoresRepository());
  }

  checarEstatusHectareas() {
    const workerInterval = 1000 * 60 * 10;

    const checarEstatusHectarea = async() => {
      const { success, data } = await this.hectareaService.obtenerHectareas();

      if (!success) {
        return;
      }

      await this.sensoresService.checarParametrosSensores(data!);
    }

    setInterval(() => {
      checarEstatusHectarea();
    }, workerInterval);
  }

}