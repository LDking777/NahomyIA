from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, text
from .base import Base


class LogAuditoriaModel(Base):
    __tablename__ = "logs_auditoria"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column("usuario_id", String, nullable=True)
    proceso_id = Column("proceso_id", Integer, nullable=True)
    accion = Column(String(100), nullable=False)
    tabla_afectada = Column("tabla_afectada", String(50), nullable=False)
    detalles = Column(Text, nullable=True)
    fecha_registro = Column("fecha_registro", TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
