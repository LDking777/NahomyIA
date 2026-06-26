import { Usuario } from '../entities/Usuario'
import { UserId } from '../value-objects/UserId'

export interface IUsuarioRepository {
  findById(id: UserId): Promise<Usuario | null>
  findByNombre(nombre: string): Promise<Usuario | null>
  findAll(): Promise<Usuario[]>
  save(usuario: Usuario): Promise<void>
  update(usuario: Usuario): Promise<void>
  delete(id: UserId): Promise<void>
}
