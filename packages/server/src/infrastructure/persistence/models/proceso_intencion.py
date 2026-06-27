from sqlalchemy import Column, Integer, String, TIMESTAMP, text
from sqlalchemy.orm import relationship
from .base import Base


class ProcesoIntencionModel(Base):
    __tablename__ = "procesos_intenciones"

    id = Column(Integer, primary_key=True, autoincrement=True)
    agente_id = Column("agente_id", Integer, nullable=False)
    intencion = Column(String(100), nullable=False)
    estado = Column(String(50), default="Iniciado")
    fecha_creacion = Column("fecha_creacion", TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
    fecha_cierre = Column("fecha_cierre", TIMESTAMP, nullable=True)

    usuario_intenciones = relationship("UsuarioIntencionModel", back_populates="proceso")
    ejecuciones = relationship("EjecucionAutomatizadaModel", back_populates="proceso")
    feedbacks = relationship("FeedbackReporteModel", back_populates="proceso")
    metricas = relationship("MetricaRendimientoModel", back_populates="proceso")
