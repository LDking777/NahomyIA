import type { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'nahomy-c2-secret-key'

export interface AuthResult {
  token: string
  usuario: {
    id: string
    nombre: string
    rol: string
  }
}

export class AutenticarUsuarioUseCase {
  constructor(private readonly usuarioRepo: IUsuarioRepository) {}

  async execute(nombre: string, password: string): Promise<AuthResult> {
    const usuario = await this.usuarioRepo.findByNombre(nombre)
    if (!usuario) {
      throw new Error('Credenciales inválidas')
    }

    const valid = await bcrypt.compare(password, usuario.passwordHash.getValue())
    if (!valid) {
      throw new Error('Credenciales inválidas')
    }

    const token = jwt.sign(
      { id: usuario.id.getValue(), nombre: usuario.nombre, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: '8h' },
    )

    return {
      token,
      usuario: {
        id: usuario.id.getValue(),
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    }
  }
}
