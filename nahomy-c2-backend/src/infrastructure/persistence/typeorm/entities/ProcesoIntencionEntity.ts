import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UsuarioIntencionEntity } from './UsuarioIntencionEntity'
import { EjecucionAutomatizadaEntity } from './EjecucionAutomatizadaEntity'
import { FeedbackReporteEntity } from './FeedbackReporteEntity'
import { MetricaRendimientoEntity } from './MetricaRendimientoEntity'

@Entity('procesos_intenciones')
export class ProcesoIntencionEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', name: 'agente_id' })
  agenteId!: number

  @Column({ type: 'varchar', length: 100 })
  intencion!: string

  @Column({ type: 'varchar', length: 50, default: 'Iniciado' })
  estado!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_creacion' })
  fechaCreacion!: Date

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_cierre' })
  fechaCierre!: Date | null

  @OneToMany(() => UsuarioIntencionEntity, (ui) => ui.proceso)
  usuarioIntenciones!: UsuarioIntencionEntity[]

  @OneToMany(() => EjecucionAutomatizadaEntity, (ea) => ea.proceso)
  ejecuciones!: EjecucionAutomatizadaEntity[]

  @OneToMany(() => FeedbackReporteEntity, (fr) => fr.proceso)
  feedbacks!: FeedbackReporteEntity[]

  @OneToMany(() => MetricaRendimientoEntity, (mr) => mr.proceso)
  metricas!: MetricaRendimientoEntity[]
}
