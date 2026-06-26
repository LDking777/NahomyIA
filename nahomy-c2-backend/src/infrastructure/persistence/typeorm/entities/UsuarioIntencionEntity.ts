import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UsuarioEntity } from './UsuarioEntity'
import { ProcesoIntencionEntity } from './ProcesoIntencionEntity'

@Entity('usuario_intencion')
export class UsuarioIntencionEntity {
  @PrimaryColumn({ type: 'uuid', name: 'usuario_id' })
  usuarioId!: string

  @PrimaryColumn({ type: 'int', name: 'proceso_id' })
  procesoId!: number

  @ManyToOne(() => UsuarioEntity, (u) => u.usuarioIntenciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity

  @ManyToOne(() => ProcesoIntencionEntity, (p) => p.usuarioIntenciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proceso_id' })
  proceso!: ProcesoIntencionEntity
}
