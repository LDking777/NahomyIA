from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class FeedbackReporteModel(Base):
    __tablename__ = "feedback_reporte"

    id = Column(Integer, primary_key=True, autoincrement=True)
    proceso_id = Column("proceso_id", Integer, ForeignKey("procesos_intenciones.id", ondelete="CASCADE"))
    resumen_ia = Column("resumen_ia", Text, nullable=False)
    nivel_alerta = Column("nivel_alerta", String(30), nullable=True)

    proceso = relationship("ProcesoIntencionModel", back_populates="feedbacks")
