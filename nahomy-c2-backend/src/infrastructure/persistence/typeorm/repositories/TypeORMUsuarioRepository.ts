import { Repository } from 'typeorm'
import type { IUsuarioRepository } from '../../../../domain/repositories/IUsuarioRepository'
import { Usuario } from '../../../../domain/entities/Usuario'
import { UserId } from '../../../../domain/value-objects/UserId'
import { PasswordHash } from '../../../../domain/value-objects/PasswordHash'
import { UsuarioEntity } from '../entities/UsuarioEntity'
import type { UsuarioRole } from '../../../../domain/entities/Usuario'

export class TypeORMUsuarioRepository implements IUsuarioRepository {
  constructor(private readonly repo: Repository<UsuarioEntity>) {}

  async findById(id: UserId): Promise<Usuario | null> {
    const entity = await this.repo.findOne({ where: { id: id.getValue() } })
    return entity ? this.toDomain(entity) : null
  }

  async findByNombre(nombre: string): Promise<Usuario | null> {
    const entity = await this.repo.findOne({ where: { nombre } })
    return entity ? this.toDomain(entity) : null
  }

  async findAll(): Promise<Usuario[]> {
    const entities = await this.repo.find()
    return entities.map(this.toDomain)
  }

  async save(usuario: Usuario): Promise<void> {
    const entity = this.toEntity(usuario)
    await this.repo.save(entity)
  }

  async update(usuario: Usuario): Promise<void> {
    await this.repo.update(usuario.id.getValue(), this.toEntity(usuario))
  }

  async delete(id: UserId): Promise<void> {
    await this.repo.delete(id.getValue())
  }

  private toDomain(entity: UsuarioEntity): Usuario {
    return new Usuario(
      new UserId(entity.id),
      entity.nombre,
      new PasswordHash(entity.passwordHash),
      entity.rol as UsuarioRole,
    )
  }

  private toEntity(domain: Usuario): Partial<UsuarioEntity> {
    return {
      id: domain.id.getValue(),
      nombre: domain.nombre,
      passwordHash: domain.passwordHash.getValue(),
      rol: domain.rol,
    }
  }
}
