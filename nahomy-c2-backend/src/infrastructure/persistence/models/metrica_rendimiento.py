from sqlalchemy import Column, Integer, Boolean, TIMESTAMP, ForeignKey, text
from sqlalchemy.orm import relationship
from .base import Base


class MetricaRendimientoModel(Base):
    __tablename__ = "metricas_rendimiento"

    id = Column(Integer, primary_key=True, autoincrement=True)
    proceso_id = Column("proceso_id", Integer, ForeignKey("procesos_intenciones.id", ondelete="CASCADE"))
    tiempo_ejecucion_ms = Column("tiempo_ejecucion_ms", Integer, nullable=False)
    bytes_transferidos = Column("bytes_transferidos", Integer, nullable=False)
    resultado_exitoso = Column("resultado_exitoso", Boolean, default=True)
    fecha_metrica = Column("fecha_metrica", TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))

    proceso = relationship("ProcesoIntencionModel", back_populates="metricas")
