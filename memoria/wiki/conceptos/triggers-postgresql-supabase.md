---
tipo: concepto
tags: [postgresql, supabase, triggers, sql, base-datos, seguridad, rls]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-13-notificaciones-triggers-bd]]", "[[SCRIPTS_Y_SQL/premium-plan-enforcement.sql|raw/documentos/festejia/SCRIPTS_Y_SQL/premium-plan-enforcement.sql]]"]
---

# Triggers de PostgreSQL y Seguridad de Base de Datos en Supabase

En la arquitectura de [[festejia]], las restricciones comerciales más críticas no dependen exclusivamente de validaciones en JavaScript o frontend, sino que están blindadas a nivel de motor de base de datos mediante **Triggers y Procedimientos Almacenados en PostgreSQL**.

---

## 1. El Trigger de Aplicación de Límites: `validar_limite_invitados_por_plan`

### Definición y Lógica
Evita que un usuario de un plan inferior sobrepase su cuota máxima de invitados inyectando llamadas directas a la API de Supabase.
- **Tabla afectada:** `invitados`
- **Momento:** `BEFORE INSERT ON invitados FOR EACH ROW`

### Código SQL Oficial (`premium-plan-enforcement.sql`):
```sql
CREATE OR REPLACE FUNCTION validar_limite_invitados_por_plan()
RETURNS TRIGGER AS $$
DECLARE
    v_user_id UUID;
    v_plan TEXT;
    v_total_actual INT;
    v_limite INT;
BEGIN
    -- 1. Obtener el propietario del evento
    SELECT user_id INTO v_user_id
    FROM eventos
    WHERE id = NEW.evento_id;

    -- 2. Consultar el plan del cliente
    SELECT plan INTO v_plan
    FROM profiles
    WHERE id = v_user_id;

    -- 3. Definir límites comerciales estrictos
    IF v_plan = 'plus' THEN
        v_limite := 50;   -- Plan Clásico
    ELSIF v_plan = 'premium' THEN
        v_limite := 150;  -- Plan Elegante
    ELSIF v_plan = 'exclusive' THEN
        v_limite := 9999; -- Plan Imperial (Ilimitado)
    ELSE
        v_limite := 50;   -- Fallback por defecto
    END IF;

    -- 4. Contar invitados existentes
    SELECT COUNT(*) INTO v_total_actual
    FROM invitados
    WHERE evento_id = NEW.evento_id;

    -- 5. Bloquear inserción si supera el cupo
    IF v_total_actual >= v_limite THEN
        RAISE EXCEPTION 'Límite de invitados alcanzado para el plan actual (% invitados permitidos). Contacte a Festejia para ampliar su plan.', v_limite;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_validar_limite_invitados
BEFORE INSERT ON invitados
FOR EACH ROW
EXECUTE FUNCTION validar_limite_invitados_por_plan();
```

---

## 2. Trigger de Marcas de Tiempo: `express_set_updated_at`
Asegura que cualquier modificación en el editor de Festejia Express actualice automáticamente la columna de auditoría:
```sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_express_set_updated_at
BEFORE UPDATE ON express_invitaciones
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
```

---

## 3. Políticas de Seguridad RLS en Almacenamiento (Bucket `express-media`)
Para aislar las imágenes de cada cliente:
1. **Política de Lectura Pública**: Cualquier invitado puede ver las fotos de la invitación:
   `bucket_id = 'express-media' AND (storage.foldername(name))[1] IS NOT NULL`
2. **Política de Escritura Segura**: Solo el usuario autenticado puede subir a su propia carpeta:
   `bucket_id = 'express-media' AND auth.uid()::text = (storage.foldername(name))[1]`

---

## Enlaces Relacionados
- [[festejia-arquitectura-backend-base-datos]]
- [[festejia-sistemas-tecnologia]]
- [[modelo-comercial-festejia]]
- [[festejia-especificacion-panel-admin]]
