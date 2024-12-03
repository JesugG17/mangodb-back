import { UpdateHectareaDto } from "../../modules/hectareas/dto/update-hectarea.dto";
import { HectareaRepository } from "../../modules/hectareas/hectareas.repository";
import { HectareaService } from "../../modules/hectareas/hectareas.service";
import { SensoresRepository } from "../../modules/sensores/sensores.repository";
import { SensoresService } from "../../modules/sensores/sensores.service";
import { WorkerInterface } from "./interface/worker-interface";

export class HectareaWorker implements WorkerInterface {

  private readonly hectareaService: HectareaService;
  private readonly sensoresService: SensoresService;

  constructor() {
    this.hectareaService = new HectareaService(new HectareaRepository());
    this.sensoresService = new SensoresService(new SensoresRepository());
  }

  private checarEstatusHectareas() {
    const workerInterval = 1000 * 60;

    const checarEstatusHectarea = async() => {
      console.log('SE CORRIO EL CHECAR STATUS');
      const { isValid, data: hectareas, message} = await this.hectareaService.obtenerHectareas({
        status: 'NO COSECHABLE'
      });

      if (!isValid) {
        return;
      }
      const hectareasListasParaCosecha = await this.sensoresService.checarParametrosSensores(hectareas!);

      for(let i = 0; i < hectareasListasParaCosecha.length; i++) {
        const hectarea = hectareasListasParaCosecha[i];
        await this.hectareaService.actualizarHectarea(hectarea.idHectarea, hectarea);

      }
    }

    checarEstatusHectarea();
    setInterval(() => {
      checarEstatusHectarea();
    }, workerInterval);
  }

  public start(): void {
    this.checarEstatusHectareas();
  }
}