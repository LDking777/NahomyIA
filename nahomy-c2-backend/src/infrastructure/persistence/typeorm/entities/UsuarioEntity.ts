import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UsuarioIntencionEntity } from './UsuarioIntencionEntity'

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 100 })
  nombre!: string

  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash!: string

  @Column({ type: 'varchar', length: 50, default: 'Operador' })
  rol!: string

  @OneToMany(() => UsuarioIntencionEntity, (ui) => ui.usuario)
  usuarioIntenciones!: UsuarioIntencionEntity[]
}
