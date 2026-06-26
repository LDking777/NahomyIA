import type { IniciarIntencionDTO } from '../dto/IniciarIntencionDTO'
import type { IProcesoIntencionRepository } from '../../domain/repositories/IProcesoIntencionRepository'
import type { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository'
import type { IMessageBus } from '../ports/IMessageBus'
import { ProcesoIntencion } from '../../domain/entities/ProcesoIntencion'
import { EstadoProceso, EstadoProcesoValue } from '../../domain/value-objects/EstadoProceso'
import { UserId } from '../../domain/value-objects/UserId'
import { IntentionStartedEvent } from '../../domain/events/IntentionStartedEvent'
import { v4 as uuid } from 'uuid'

export class IniciarIntencionUseCase {
  constructor(
    private readonly procesoRepo: IProcesoIntencionRepository,
    private readonly usuarioRepo: IUsuarioRepository,
    private readonly messageBus: IMessageBus,
  ) {}

  async execute(dto: IniciarIntencionDTO): Promise<{ procesoId: number }> {
    const usuario = await this.usuarioRepo.findById(new UserId(dto.usuarioId))
    if (!usuario) {
      throw new Error(`Usuario ${dto.usuarioId} no encontrado`)
    }

    const proceso = new ProcesoIntencion(
      0,
      dto.agenteId,
      dto.intencion,
      new EstadoProcesoValue(EstadoProceso.INICIADO),
      new Date(),
      null,
    )

    const procesoId = await this.procesoRepo.save(proceso)

    const event = new IntentionStartedEvent(uuid(), {
      usuarioId: dto.usuarioId,
      agenteId: dto.agenteId,
      intencion: dto.intencion,
      procesoId,
    })

    await this.messageBus.publish(event)

    return { procesoId }
  }
}
