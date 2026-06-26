import type { Request, Response } from 'express'
import { IniciarIntencionUseCase } from '../../application/use-cases/IniciarIntencionUseCase'

export class IntencionController {
  constructor(private readonly iniciarIntencionUseCase: IniciarIntencionUseCase) {}

  async iniciar(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, agenteId, intencion } = req.body
      if (!usuarioId || !agenteId || !intencion) {
        res.status(400).json({ error: 'usuarioId, agenteId e intencion requeridos' })
        return
      }
      const result = await this.iniciarIntencionUseCase.execute({
        usuarioId,
        agenteId,
        intencion,
      })
      res.status(201).json(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error interno'
      res.status(500).json({ error: message })
    }
  }
}
