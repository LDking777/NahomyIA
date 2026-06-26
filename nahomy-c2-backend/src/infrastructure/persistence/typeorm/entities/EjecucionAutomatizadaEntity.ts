import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm'
import { ProcesoIntencionEntity } from './ProcesoIntencionEntity'

@Entity('ejecucion_automatizada')
@Unique(['procesoId', 'funcionId'])
export class EjecucionAutomatizadaEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', name: 'proceso_id' })
  procesoId!: number

  @Column({ type: 'int', name: 'funcion_id' })
  funcionId!: number

  @Column({ type: 'int', name: 'orden_ejecucion' })
  ordenEjecucion!: number

  @Column({ type: 'text', nullable: true, name: 'resultado_raw' })
  resultadoRaw!: string | null

  @Column({ type: 'varchar', length: 50, default: 'Pendiente' })
  estado!: string

  @ManyToOne(() => ProcesoIntencionEntity, (p) => p.ejecuciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proceso_id' })
  proceso!: ProcesoIntencionEntity
}
