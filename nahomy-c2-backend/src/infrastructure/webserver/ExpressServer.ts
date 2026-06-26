import express from 'express'
import cors from 'cors'
import type { AuthController } from '../../interface-adapters/controllers/AuthController'
import type { IntencionController } from '../../interface-adapters/controllers/IntencionController'
import type { ComandoController } from '../../interface-adapters/controllers/ComandoController'
import type { MetricasController } from '../../interface-adapters/controllers/MetricasController'
import type { FeedbackController } from '../../interface-adapters/controllers/FeedbackController'
import { authMiddleware } from '../../interface-adapters/middleware/AuthMiddleware'
import { errorHandler } from '../../interface-adapters/middleware/ErrorHandler'

export class ExpressServer {
  private app = express()

  constructor(
    private readonly authController: AuthController,
    private readonly intencionController: IntencionController,
    private readonly comandoController: ComandoController,
    private readonly metricasController: MetricasController,
    private readonly feedbackController: FeedbackController,
  ) {}

  setup(): void {
    this.app.use(cors())
    this.app.use(express.json())

    this.app.get('/health', (_req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() })
    })

    this.app.post('/api/auth/login', (req, res) => this.authController.login(req, res))

    this.app.post('/api/intenciones', authMiddleware, (req, res) =>
      this.intencionController.iniciar(req, res),
    )

    this.app.post('/api/comandos/ejecutar', authMiddleware, (req, res) =>
      this.comandoController.ejecutar(req, res),
    )

    this.app.get('/api/metricas', authMiddleware, (req, res) =>
      this.metricasController.getMetricas(req, res),
    )

    this.app.get('/api/logs', authMiddleware, (req, res) =>
      this.metricasController.getLogs(req, res),
    )

    this.app.post('/api/feedback/:procesoId', authMiddleware, (req, res) =>
      this.feedbackController.generar(req, res),
    )

    this.app.use(errorHandler)
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`[Server] Nahomy C2 API corriendo en puerto ${port}`)
    })
  }

  getApp() {
    return this.app
  }
}
