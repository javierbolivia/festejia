---
tipo: concepto
tags: [ia, kimi, moonshot, seguridad, rate-limit, auditoria, api]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-13-notificaciones-triggers-bd]]", "[[SCRIPTS_Y_SQL/express-migration-ia-security.sql|raw/documentos/festejia/SCRIPTS_Y_SQL/express-migration-ia-security.sql]]"]
---

# Microservicio de IA: Integración Moonshot Kimi, Rate Limiting y Auditoría

Para ayudar a los clientes de [[festejia-express]] a redactar votos, dedicatorias y textos emotivos, la plataforma integra un microservicio de inteligencia artificial conectado con la API de **Moonshot AI (modelo `kimi-k2.7-code`)** a través de la ruta `/api/express/generate-text`.

Para proteger el servicio contra abusos, ataques de denegación de servicio (DoS) o sobrecostes de API, se implementó una arquitectura de **defensa en profundidad**.

---

## 1. Limitador de Tasa (*Rate Limiter*)
- **Umbral**: Máximo **40 peticiones por hora** por dirección IP y por identificador de usuario (`user_id`).
- **Implementación**: Si el cliente supera las 40 llamadas en una ventana deslizante de 60 minutos, el servidor responde inmediatamente con código `429 Too Many Requests`:
  ```json
  {
    "error": "Has alcanzado el límite de 40 sugerencias de texto por hora. Por favor, intenta de nuevo más tarde."
  }
  ```

---

## 2. Tabla de Auditoría: `express_ia_generaciones`
Cada interacción con el modelo de lenguaje queda registrada de forma inmutable para análisis de uso y detección de anomalías:

```sql
CREATE TABLE IF NOT EXISTS express_ia_generaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    invitacion_id UUID REFERENCES express_invitaciones(id) ON DELETE CASCADE,
    tipo_evento TEXT NOT NULL,
    tono TEXT NOT NULL,
    prompt_resumen TEXT,
    texto_generado TEXT,
    tokens_utilizados INT,
    ip_origen TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para acelerar el recuento del limitador de tasa
CREATE INDEX IF NOT EXISTS idx_ia_generaciones_user_time 
ON express_ia_generaciones (user_id, created_at DESC);
```

---

## 3. Sanitización y Prompt Engineering
El endpoint aplica un filtro estricto antes de enviar el prompt al modelo:
1. Elimina caracteres de control y recorta la entrada a un máximo de 500 caracteres.
2. Inyecta un *System Prompt* inmutable que restringe la respuesta exclusivamente a textos festivos y nupciales en español, neutralizando posibles intentos de inyección de prompts (*jailbreaks*).

---

## Enlaces Relacionados
- [[festejia-express]]
- [[los-17-bloques-express]]
- [[festejia-arquitectura-backend-base-datos]]
