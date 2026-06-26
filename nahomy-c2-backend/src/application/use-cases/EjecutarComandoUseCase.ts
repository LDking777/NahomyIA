import type { EjecutarComandoDTO } from '../dto/EjecutarComandoDTO'
import type { IProcesoIntencionRepository } from '../../domain/repositories/IProcesoIntencionRepository'
import type { IEjecucionAutomatizadaRepository } from '../../domain/repositories/IEjecucionAutomatizadaRepository'
import type { IMessageBus } from '../ports/IMessageBus'
import { EjecucionAutomatizada } from '../../domain/entities/EjecucionAutomatizada'
import { CommandExecutedEvent } from '../../domain/events/CommandExecutedEvent'
import { v4 as uuid } from 'uuid'

export class EjecutarComandoUseCase {
  constructor(
    private readonly procesoRepo: IProcesoIntencionRepository,
    private readonly ejecucionRepo: IEjecucionAutomatizadaRepository,
    private readonly messageBus: IMessageBus,
  ) {}

  async execute(dto: EjecutarComandoDTO): Promise<{ ejecucionId: number }> {
    const proceso = await this.procesoRepo.findById(dto.procesoId)
    if (!proceso) {
      throw new Error(`Proceso ${dto.procesoId} no encontrado`)
    }

    const ejecucion = new EjecucionAutomatizada(
      0,
      dto.procesoId,
      dto.funcionId,
      dto.ordenEjecucion,
      null,
      'Pendiente',
    )

    const ejecucionId = await this.ejecucionRepo.save(ejecucion)

    const event = new CommandExecutedEvent(uuid(), {
      procesoId: dto.procesoId,
      funcionId: dto.funcionId,
      comando: '',
      resultado: 'Pendiente',
      ordenEjecucion: dto.ordenEjecucion,
    })

    await this.messageBus.publish(event)

    return { ejecucionId }
  }
}
