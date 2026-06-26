import { DataSource } from 'typeorm'
import {
  UsuarioEntity,
  ProcesoIntencionEntity,
  UsuarioIntencionEntity,
  FuncionPrealmacenadaEntity,
  EjecucionAutomatizadaEntity,
  FeedbackReporteEntity,
  LogAuditoriaEntity,
  MetricaRendimientoEntity,
} from '../persistence/typeorm/entities'

export function createDataSource(): DataSource {
  return new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'nahomy',
    password: process.env.DB_PASSWORD || 'nahomy_secret',
    database: process.env.DB_NAME || 'nahomy_c2',
    entities: [
      UsuarioEntity,
      ProcesoIntencionEntity,
      UsuarioIntencionEntity,
      FuncionPrealmacenadaEntity,
      EjecucionAutomatizadaEntity,
      FeedbackReporteEntity,
      LogAuditoriaEntity,
      MetricaRendimientoEntity,
    ],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development' ? true : false,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  })
}
