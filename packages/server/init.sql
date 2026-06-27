CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'Operador'
);

CREATE TABLE IF NOT EXISTS procesos_intenciones (
    id SERIAL PRIMARY KEY,
    agente_id INT NOT NULL,
    intencion VARCHAR(100) NOT NULL,
    estado VARCHAR(50) DEFAULT 'Iniciado',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_cierre TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuario_intencion (
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    proceso_id INT REFERENCES procesos_intenciones(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, proceso_id)
);

CREATE TABLE IF NOT EXISTS funciones_prealmacenadas (
    id SERIAL PRIMARY KEY,
    nombre_funcion VARCHAR(100) NOT NULL,
    comando_sistema TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ejecucion_automatizada (
    id SERIAL PRIMARY KEY,
    proceso_id INT REFERENCES procesos_intenciones(id) ON DELETE CASCADE,
    funcion_id INT REFERENCES funciones_prealmacenadas(id),
    orden_ejecucion INT NOT NULL,
    resultado_raw TEXT,
    estado VARCHAR(50) DEFAULT 'Pendiente',
    CONSTRAINT unique_funcion_por_proceso UNIQUE (proceso_id, funcion_id)
);

CREATE TABLE IF NOT EXISTS feedback_reporte (
    id SERIAL PRIMARY KEY,
    proceso_id INT REFERENCES procesos_intenciones(id) ON DELETE CASCADE,
    resumen_ia TEXT NOT NULL,
    nivel_alerta VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS logs_auditoria (
    id SERIAL PRIMARY KEY,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    proceso_id INT REFERENCES procesos_intenciones(id) ON DELETE SET NULL,
    accion VARCHAR(100) NOT NULL,
    tabla_afectada VARCHAR(50) NOT NULL,
    detalles TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS metricas_rendimiento (
    id SERIAL PRIMARY KEY,
    proceso_id INT REFERENCES procesos_intenciones(id) ON DELETE CASCADE,
    tiempo_ejecucion_ms INT NOT NULL,
    bytes_transferidos INT NOT NULL,
    resultado_exitoso BOOLEAN DEFAULT TRUE,
    fecha_metrica TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed: admin user (password: Nahomy2024)
INSERT INTO usuarios (nombre, password_hash, rol)
VALUES ('admin', '$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQkf9Rn6bm1FZwOJK3v0pMl0IRLG2y', 'Administrador')
ON CONFLICT (id) DO NOTHING;

-- Seed: stored functions
INSERT INTO funciones_prealmacenadas (nombre_funcion, comando_sistema) VALUES
    ('Reconocimiento de Red', 'nmap -sV -O target_ip'),
    ('Escaneo de Puertos', 'nmap -p- target_ip'),
    ('Extraccion de Hashes', 'secretsdump.py DOMAIN/user:pass@target'),
    ('Ejecucion Remota', 'wmiexec.py DOMAIN/user:pass@target'),
    ('Captura de Trafico', 'tcpdump -i eth0 -w capture.pcap')
ON CONFLICT (id) DO NOTHING;

-- Trigger Function
CREATE OR REPLACE FUNCTION funcion_auditar_procesos()
RETURNS TRIGGER AS $$
DECLARE
    v_usuario_id UUID;
BEGIN
    SELECT usuario_id INTO v_usuario_id
    FROM usuario_intencion
    WHERE proceso_id = NEW.id
    LIMIT 1;

    IF (TG_OP = 'INSERT') THEN
        INSERT INTO logs_auditoria (usuario_id, proceso_id, accion, tabla_afectada, detalles)
        VALUES (
            v_usuario_id, NEW.id, 'CREACION_PROCESO', 'procesos_intenciones',
            'Se registró la intención: [' || NEW.intencion || '] para el agente: ' || NEW.agente_id
        );
        RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (OLD.estado IS DISTINCT FROM NEW.estado) THEN
            IF NEW.estado IN ('Finalizado', 'Fallido', 'Cancelado') THEN
                NEW.fecha_cierre := CURRENT_TIMESTAMP;
            END IF;
            INSERT INTO logs_auditoria (usuario_id, proceso_id, accion, tabla_afectada, detalles)
            VALUES (
                v_usuario_id, NEW.id, 'CAMBIO_ESTADO_PROCESO', 'procesos_intenciones',
                'Estado cambió de [' || OLD.estado || '] a [' || NEW.estado || ']'
            );
        END IF;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tgr_auditoria_procesos ON procesos_intenciones;
CREATE TRIGGER tgr_auditoria_procesos
BEFORE INSERT OR UPDATE ON procesos_intenciones
FOR EACH ROW EXECUTE FUNCTION funcion_auditar_procesos();
