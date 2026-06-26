import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('funciones_prealmacenadas')
export class FuncionPrealmacenadaEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 100, name: 'nombre_funcion' })
  nombreFuncion!: string

  @Column({ type: 'text', name: 'comando_sistema' })
  comandoSistema!: string
}
