import { UserId } from '../value-objects/UserId'
import { PasswordHash } from '../value-objects/PasswordHash'

export type UsuarioRole = 'Administrador' | 'Operador' | 'Auditor'

export class Usuario {
  private readonly _id: UserId
  private _nombre: string
  private _passwordHash: PasswordHash
  private _rol: UsuarioRole

  constructor(id: UserId, nombre: string, passwordHash: PasswordHash, rol: UsuarioRole) {
    this._id = id
    this._nombre = nombre
    this._passwordHash = passwordHash
    this._rol = rol
  }

  get id(): UserId {
    return this._id
  }

  get nombre(): string {
    return this._nombre
  }

  get passwordHash(): PasswordHash {
    return this._passwordHash
  }

  get rol(): UsuarioRole {
    return this._rol
  }

  cambiarRol(nuevoRol: UsuarioRole): void {
    this._rol = nuevoRol
  }

  actualizarNombre(nombre: string): void {
    this._nombre = nombre
  }

  actualizarPassword(hash: PasswordHash): void {
    this._passwordHash = hash
  }
}
