import { ProcesoIntencion } from '../entities/ProcesoIntencion'

export interface IProcesoIntencionRepository {
  findById(id: number): Promise<ProcesoIntencion | null>
  findAll(): Promise<ProcesoIntencion[]>
  findActivos(): Promise<ProcesoIntencion[]>
  findByAgenteId(agenteId: number): Promise<ProcesoIntencion[]>
  save(proceso: ProcesoIntencion): Promise<number>
  update(proceso: ProcesoIntencion): Promise<void>
}
