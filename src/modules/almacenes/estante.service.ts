import { Caja } from "../../core/db/entities/caja-entity";
import { Estante } from "../../core/db/entities/estante-entity";
import { EstanteRepository } from "./estante.repository";

const CAPACIDAD_ALMACEN = 20;
const MAX_PARTICION = 5;
const MAX_DIVISION = 2;

export class EstanteService {
  constructor(
    private readonly estanteRepository: EstanteRepository
  ) {}

  async asignarEspacioCaja(caja: Caja, idAlmacen: number) {
    const espacios = await this.estanteRepository.checarEspaciosDisponibles(idAlmacen);

    if (espacios === CAPACIDAD_ALMACEN) {
      return {
        isValid: false,
        message: 'El almacen ya esta lleno'
      };
    }

    const estante = await this.estanteRepository.obtenerUltimoEstante(idAlmacen);
    
    if (!estante) {
      return {};
    }

    let numEstante = estante.id;
    let numDivision = estante.division;
    let numParticion = estante.particion;

    if (numParticion === MAX_PARTICION) {
      if (numDivision === MAX_DIVISION) {
        numEstante++;
        numDivision = 1;
        numParticion = 1;
      } else {
        numDivision++;
        numParticion = 1;
      }
    } else {
      numParticion++;
    }

    const estanteDisponible = await this.estanteRepository.obtenerEstanteDisponible({
      estante: numEstante,
      division: numDivision,
      particion: numParticion,
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
}