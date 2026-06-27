from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class UsuarioIntencionModel(Base):
    __tablename__ = "usuario_intencion"

    usuario_id = Column("usuario_id", String, ForeignKey("usuarios.id", ondelete="CASCADE"), primary_key=True)
    proceso_id = Column("proceso_id", Integer, ForeignKey("procesos_intenciones.id", ondelete="CASCADE"), primary_key=True)

    usuario = relationship("UsuarioModel", back_populates="usuario_intenciones")
    proceso = relationship("ProcesoIntencionModel", back_populates="usuario_intenciones")
