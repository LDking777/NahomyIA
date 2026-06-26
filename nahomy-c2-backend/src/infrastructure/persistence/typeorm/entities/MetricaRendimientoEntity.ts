import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ProcesoIntencionEntity } from './ProcesoIntencionEntity'

@Entity('metricas_rendimiento')
export class MetricaRendimientoEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', name: 'proceso_id' })
  procesoId!: number

  @Column({ type: 'int', name: 'tiempo_ejecucion_ms' })
  tiempoEjecucionMs!: number

  @Column({ type: 'int', name: 'bytes_transferidos' })
  bytesTransferidos!: number

  @Column({ type: 'boolean', default: true, name: 'resultado_exitoso' })
  resultadoExitoso!: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_metrica' })
  fechaMetrica!: Date

  @ManyToOne(() => ProcesoIntencionEntity, (p) => p.metricas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proceso_id' })
  proceso!: ProcesoIntencionEntity
}
