import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('logs_auditoria')
export class LogAuditoriaEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'uuid', nullable: true, name: 'usuario_id' })
  usuarioId!: string | null

  @Column({ type: 'int', nullable: true, name: 'proceso_id' })
  procesoId!: number | null

  @Column({ type: 'varchar', length: 100 })
  accion!: string

  @Column({ type: 'varchar', length: 50, name: 'tabla_afectada' })
  tablaAfectada!: string

  @Column({ type: 'text', nullable: true })
  detalles!: string | null

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_registro' })
  fechaRegistro!: Date
}
