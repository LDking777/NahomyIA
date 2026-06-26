import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ProcesoIntencionEntity } from './ProcesoIntencionEntity'

@Entity('feedback_reporte')
export class FeedbackReporteEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', name: 'proceso_id' })
  procesoId!: number

  @Column({ type: 'text', name: 'resumen_ia' })
  resumenIa!: string

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'nivel_alerta' })
  nivelAlerta!: string | null

  @ManyToOne(() => ProcesoIntencionEntity, (p) => p.feedbacks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proceso_id' })
  proceso!: ProcesoIntencionEntity
}
