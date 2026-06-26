import { EjecucionAutomatizada } from '../entities/EjecucionAutomatizada'

export interface IEjecucionAutomatizadaRepository {
  findById(id: number): Promise<EjecucionAutomatizada | null>
  findByProcesoId(procesoId: number): Promise<EjecucionAutomatizada[]>
  save(ejecucion: EjecucionAutomatizada): Promise<number>
  update(ejecucion: EjecucionAutomatizada): Promise<void>
}
