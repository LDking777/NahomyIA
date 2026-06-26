import { Container } from './container'

const container = new Container()

container.initialize().catch((err) => {
  console.error('[FATAL] Error al inicializar la aplicación:', err)
  process.exit(1)
})

process.on('SIGINT', async () => {
  console.log('\n[App] Cerrando aplicación...')
  await container.shutdown()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n[App] Señal de terminación recibida...')
  await container.shutdown()
  process.exit(0)
})
