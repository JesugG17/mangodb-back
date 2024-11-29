import { Planta } from "../db/entities/planta-entity";

export class Caja {
  constructor(
    private readonly kg: number,
    private readonly planta: Planta,
    private readonly fecha: Date,
    private readonly tipo: string
  ){}

  public get getKg() {
    return this.kg;
  }

  public get getPlanta() {
    return this.planta;
  }

  public get getFecha() {
    return this.fecha;
  }

  public get getTipo() {
    return this.tipo;
  }
}