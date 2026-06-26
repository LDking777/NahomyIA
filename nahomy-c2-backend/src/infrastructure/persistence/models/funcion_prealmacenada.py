from sqlalchemy import Column, Integer, String, Text
from .base import Base


class FuncionPrealmacenadaModel(Base):
    __tablename__ = "funciones_prealmacenadas"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre_funcion = Column("nombre_funcion", String(100), nullable=False)
    comando_sistema = Column("comando_sistema", Text, nullable=False)
