import { DataSource } from 'typeorm'
import { createDataSource } from '../infrastructure/config/DatabaseConfig'
import { RabbitMQConfig } from '../infrastructure/config/RabbitMQConfig'
import { RabbitMQAdapter } from '../infrastructure/messaging/RabbitMQAdapter'
import { ExpressServer } from '../infrastructure/webserver/ExpressServer'

import { TypeORMUsuarioRepository } from '../infrastructure/persistence/typeorm/repositories/TypeORMUsuarioRepository'
import { TypeORMProcesoIntencionRepository } from '../infrastructure/persistence/typeorm/repositories/TypeORMProcesoIntencionRepository'
import { TypeORMEjecucionAutomatizadaRepository } from '../infrastructure/persistence/typeorm/repositories/TypeORMEjecucionAutomatizadaRepository'
import { TypeORMFeedbackReporteRepository } from '../infrastructure/persistence/typeorm/repositories/TypeORMFeedbackReporteRepository'
import { TypeORMLogAuditoriaRepository } from '../infrastructure/persistence/typeorm/repositories/TypeORMLogAuditoriaRepository'
import { TypeORMMetricaRendimientoRepository } from '../infrastructure/persistence/typeorm/repositories/TypeORMMetricaRendimientoRepository'

import { AutenticarUsuarioUseCase } from '../application/use-cases/AutenticarUsuarioUseCase'
import { IniciarIntencionUseCase } from '../application/use-cases/IniciarIntencionUseCase'
import { EjecutarComandoUseCase } from '../application/use-cases/EjecutarComandoUseCase'
import { GenerarFeedbackUseCase } from '../application/use-cases/GenerarFeedbackUseCase'
import { ObtenerMetricasUseCase } from '../application/use-cases/ObtenerMetricasUseCase'
import { ObtenerLogsAuditoriaUseCase } from '../application/use-cases/ObtenerLogsAuditoriaUseCase'

import { AuthController } from '../interface-adapters/controllers/AuthController'
import { IntencionController } from '../interface-adapters/controllers/IntencionController'
import { ComandoController } from '../interface-adapters/controllers/ComandoController'
import { MetricasController } from '../interface-adapters/controllers/MetricasController'
import { FeedbackController } from '../interface-adapters/controllers/FeedbackController'
import { IntencionMessageHandler } from '../interface-adapters/message-handlers/IntencionMessageHandler'

export class Container {
  private _dataSource!: DataSource
  private _messageBus!: RabbitMQAdapter
  private _server!: ExpressServer

  async initialize(): Promise<void> {
    this._dataSource = createDataSource()
    await this._dataSource.initialize()
    console.log('[DB] Conexión a PostgreSQL establecida')

    const rabbitConfig = new RabbitMQConfig()
    this._messageBus = new RabbitMQAdapter(rabbitConfig)
    await this._messageBus.connect()

    const usuarioRepo = new TypeORMUsuarioRepository(this._dataSource.getRepository('UsuarioEntity'))
    const procesoRepo = new TypeORMProcesoIntencionRepository(this._dataSource.getRepository('ProcesoIntencionEntity'))
    const ejecucionRepo = new TypeORMEjecucionAutomatizadaRepository(this._dataSource.getRepository('EjecucionAutomatizadaEntity'))
    const feedbackRepo = new TypeORMFeedbackReporteRepository(this._dataSource.getRepository('FeedbackReporteEntity'))
    const logRepo = new TypeORMLogAuditoriaRepository(this._dataSource.getRepository('LogAuditoriaEntity'))
    const metricaRepo = new TypeORMMetricaRendimientoRepository(this._dataSource.getRepository('MetricaRendimientoEntity'))

    const authUseCase = new AutenticarUsuarioUseCase(usuarioRepo)
    const iniciarIntencionUseCase = new IniciarIntencionUseCase(procesoRepo, usuarioRepo, this._messageBus)
    const ejecutarComandoUseCase = new EjecutarComandoUseCase(procesoRepo, ejecucionRepo, this._messageBus)
    const generarFeedbackUseCase = new GenerarFeedbackUseCase(feedbackRepo, metricaRepo, this._messageBus)
    const obtenerMetricasUseCase = new ObtenerMetricasUseCase(metricaRepo)
    const obtenerLogsUseCase = new ObtenerLogsAuditoriaUseCase(logRepo)

    const authController = new AuthController(authUseCase)
    const intencionController = new IntencionController(iniciarIntencionUseCase)
    const comandoController = new ComandoController(ejecutarComandoUseCase)
    const metricasController = new MetricasController(obtenerMetricasUseCase, obtenerLogsUseCase)
    const feedbackController = new FeedbackController(generarFeedbackUseCase)

    const messageHandler = new IntencionMessageHandler(this._messageBus)
    this._messageBus.subscribe('c2.intention.*', (event) => messageHandler.handleIntencionIniciada(event))
    this._messageBus.subscribe('c2.command.*', (event) => messageHandler.handleComandoEjecutado(event))

    this._server = new ExpressServer(
      authController,
      intencionController,
      comandoController,
      metricasController,
      feedbackController,
    )
    this._server.setup()

    const port = Number(process.env.PORT) || 3000
    this._server.start(port)
  }

  async shutdown(): Promise<void> {
    await this._messageBus?.disconnect()
    await this._dataSource?.destroy()
    console.log('[Container] Recursos liberados')
  }
}
