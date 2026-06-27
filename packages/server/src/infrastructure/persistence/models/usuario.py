import uuid
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from .base import Base


class UsuarioModel(Base):
    __tablename__ = "usuarios"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre = Column(String(100), nullable=False)
    password_hash = Column("password_hash", String(255), nullable=False)
    rol = Column(String(50), default="Operador")

    usuario_intenciones = relationship("UsuarioIntencionModel", back_populates="usuario")
