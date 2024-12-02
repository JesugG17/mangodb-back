import { Almacen } from "../../core/db/entities/almacen-entity";
import { CajaEntity } from "../../core/db/entities/caja-entity";
import { Estante } from "../../core/db/entities/estante-entity";
import { Semaforo } from "../../core/models/semaforo";
import { EstanteRepository } from "./estante.repository";
const CAPACIDAD_ALMACEN = 20;
const CAPACIDAD_POR_ESTANTE = 10;
const MAX_PARTICION = 5;
const MAX_DIVISION = 2;
const MAX_ESTANTE = 2;

export class EstanteService {

  constructor(
    private readonly estanteRepository: EstanteRepository
  ) {}

  async asignarEspacioCaja(caja: CajaEntity, almacen: Almacen) {
    const semaforo = new Semaforo(almacen.id);
    await semaforo.espera();
    const espaciosOcupados = await this.estanteRepository.checarEspaciosDisponibles(almacen.id);

    if (espaciosOcupados === CAPACIDAD_ALMACEN) {
      return {
        isValid: false,
        message: 'El almacen ya esta lleno'
      };
    }

    const cajaYaIngresada = await this.estanteRepository.buscarCajaEnEstante(caja);

    if (cajaYaIngresada) {
      return {
        isValid: false,
        message: 'Esta caja ya fue ingresada al almacen'
      };
    }
    const estante = await this.estanteRepository.obtenerUltimoEstante(almacen.id) as Estante;
    const siguienteEspacio  = this.calcularSiguienteEspacio({
      numEstante: estante ? estante.id : 1,
      numDivision: estante ? estante.division : 1,
      numParticion: estante ? estante.particion : 0
    });
    const estanteDisponible = await this.estanteRepository.obtenerEstanteDisponible({
      estante: siguienteEspacio.numEstante,
      division: siguienteEspacio.numDivision,
      particion: siguienteEspacio.numParticion,
      almacen: almacen.id
    }) as Estante;
   
    estanteDisponible.caja = caja;
    estanteDisponible.fechaIngreso = new Date();

    await this.estanteRepository.actualizarEstante(estanteDisponible);
    await semaforo.libera();

    return {
      isValid: true,
      message: 'Caja introducida correctamente',
      data: {
        idCaja: estanteDisponible.caja.idCaja,
        fechaRegistro: estanteDisponible.fechaIngreso,
        estante: estanteDisponible.id,
        division: estanteDisponible.division,
        particion: estanteDisponible.particion
      }
    };
  }

  async obtenerEstantePorId(estanteId: number, almacenId: number) {

    const estanteInfo = await this.estanteRepository.obtenerEstantePorId(estanteId, almacenId);

    if (!estanteInfo.length) {
      return {
        isValid: false,
        code: 404,
        message: 'Este estante no existe'
      }
    }

    const data: any[] = []
    for(let i = 0; i < estanteInfo.length; i++) {
      const info = estanteInfo[i];
      const index = data.findIndex((item) => item.division === info.division);

      if (index !== -1) {
        data[index].particiones.push({
          particion: info.particion,
          caja: info.caja
        });
        continue;
      }
      
      data.push({
        division: info.division,
        particiones: [
          {
            particion: info.particion,
            caja: info.caja
          }
        ]
      });
    } 

    const formattedData = data.map(division => ({
      ...division,
      particiones: division.particiones.sort((a: any, b: any) => a.particion - b.particion)
    }))
    .sort((a, b) => a.division - b.division)

    return {
      isValid: true,
      code: 200,
      data: formattedData
    }
  }

  async obtenerEstantesPorAlmacenId(almacenId: number) {
    const estantes = await this.estanteRepository.obtenerEstantesPorAlmacenId(almacenId);

    if (!estantes.length) {
      return null;
    }

    const formattedEstantes = estantes.map(estante => ({
      estante: estante.id,
      disponibles: CAPACIDAD_POR_ESTANTE - estante.espaciosOcupados,
      lleno: +estante.espaciosOcupados === CAPACIDAD_POR_ESTANTE
    }));

    return formattedEstantes
  }

  private calcularSiguienteEspacio({ numEstante, numDivision, numParticion }: { numEstante: number, numDivision: number, numParticion: number }) {
    if (numParticion < MAX_PARTICION) {
      return {
        numParticion: numParticion + 1,
        numDivision,
        numEstante
      };
    }
  
    if (numDivision < MAX_DIVISION) {
      return {
        numParticion: 1,
        numDivision: numDivision + 1,
        numEstante
      };
    }
  
    return {
      numParticion: 1,
      numDivision: 1,
      numEstante: numEstante < MAX_ESTANTE ? numEstante + 1 : 1
    };
  }
}