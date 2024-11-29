import { CajaEntity } from "../../core/db/entities/caja-entity";
import { Estante } from "../../core/db/entities/estante-entity";
import { EstanteRepository } from "./estante.repository";

const CAPACIDAD_ALMACEN = 20;
const MAX_PARTICION = 5;
const MAX_DIVISION = 2;
const MAX_ESTANTE = 2;

export class EstanteService {
  constructor(
    private readonly estanteRepository: EstanteRepository
  ) {}

  async asignarEspacioCaja(caja: CajaEntity, idAlmacen: number) {
    const espaciosOcupados = await this.estanteRepository.checarEspaciosDisponibles(idAlmacen);

    if (espaciosOcupados === CAPACIDAD_ALMACEN) {
      return {
        isValid: false,
        message: 'El almacen ya esta lleno'
      };
    }

    const estante = await this.estanteRepository.obtenerUltimoEstante(idAlmacen) as Estante;
    const siguienteEspacio  = this.calcularSiguienteEspacio({
      numEstante: estante ? estante.id : 1,
      numDivision: estante ? estante.division : 1,
      numParticion: estante ? estante.particion : 0
    });

    const estanteDisponible = await this.estanteRepository.obtenerEstanteDisponible({
      estante: siguienteEspacio.numEstante,
      division: siguienteEspacio.numDivision,
      particion: siguienteEspacio.numParticion,
      almacen: idAlmacen
    }) as Estante;
   
    estanteDisponible.caja = caja;
    estanteDisponible.fechaIngreso = new Date();

    await this.estanteRepository.actualizarEstante(estanteDisponible);

    return {
      isValid: true,
      message: 'Caja introducida correctamente'
    };
  }

  async obtenerEstantePorId(estanteId: number, almacenId: number) {

    const estante = await this.estanteRepository.obtenerEstantePorId(estanteId, almacenId);

    if (!estante.length) {
      return {
        isValid: false,
        code: 404,
        message: 'Este estante no existe'
      }
    }

    return {
      isValid: true,
      code: 200,
      data: estante
    }
  }

  async obtenerEstantesPorAlmacenId(almacenId: number) {
    const estantes = await this.estanteRepository.obtenerEstantesPorAlmacenId(almacenId);

    if (!estantes.length) {
      return {
        isValid: false,
        code: 404,
        message: `No hay estantes para el almacen ${almacenId}`
      };
    }

    return {
      isValid: true,
      code: 200,
      data: estantes
    }
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