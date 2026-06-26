import type { Request, Response } from 'express'
import { AutenticarUsuarioUseCase } from '../../application/use-cases/AutenticarUsuarioUseCase'

export class AuthController {
  constructor(private readonly authUseCase: AutenticarUsuarioUseCase) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, password } = req.body
      if (!nombre || !password) {
        res.status(400).json({ error: 'Nombre y contraseña requeridos' })
        return
      }
      const result = await this.authUseCase.execute(nombre, password)
      res.json(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error interno'
      res.status(401).json({ error: message })
    }
  }
}
