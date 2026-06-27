from sqlalchemy import Column, Integer, String, Text, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from .base import Base


class EjecucionAutomatizadaModel(Base):
    __tablename__ = "ejecucion_automatizada"
    __table_args__ = (
        UniqueConstraint("proceso_id", "funcion_id", name="unique_funcion_por_proceso"),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    proceso_id = Column("proceso_id", Integer, ForeignKey("procesos_intenciones.id", ondelete="CASCADE"))
    funcion_id = Column("funcion_id", Integer, nullable=False)
    orden_ejecucion = Column("orden_ejecucion", Integer, nullable=False)
    resultado_raw = Column("resultado_raw", Text, nullable=True)
    estado = Column(String(50), default="Pendiente")

    proceso = relationship("ProcesoIntencionModel", back_populates="ejecuciones")
