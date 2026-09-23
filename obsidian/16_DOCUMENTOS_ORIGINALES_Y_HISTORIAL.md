# 16 - DOCUMENTOS ORIGINALES Y REGISTRO HISTÓRICO DEL PROYECTO

> Consolidación de los archivos maestros de documentación del repositorio: `PROYECTO-FESTEJIA.md`, `ESTADO-PROYECTO.md`, `EXPRESS-ARQUITECTURA.md` y `festejia-vault/`.

---

## 1. INFRAESTRUCTURA DE PRODUCCIÓN Y ENLACES OFICIALES

| Recurso | Proveedor / Enlace | Descripción |
| :--- | :--- | :--- |
| **Dominio** | [Porkbun](https://porkbun.com) | `festejia.com` con DNS configurado hacia Vercel |
| **Hosting & Deploy** | [Vercel](https://vercel.com) | Proyecto `festejia/festejia` conectado a la rama `main` |
| **Repositorio** | [GitHub](https://github.com/javierbolivia/festejia) | `javierbolivia/festejia` |
| **Base de Datos & Auth** | [Supabase](https://supabase.com) | Instancia PostgreSQL con Row Level Security y Storage |
| **Producción Web** | `https://www.festejia.com` | Landing y sistema público |

---

## 2. HISTORIAL DE COMMITS Y EVOLUCIÓN TÉCNICA

Registro de los últimos hitos de desarrollo consolidados en la rama `main`:
- `8891b05`: `feat(express)` - Agregar acción "Eliminar" en paneles de usuario y admin, limitando a una sola plantilla editable en el lanzamiento.
- `91afc27`: `fix(admin-express)` - Prevención de colisión de slug al publicar borradores sin nombres capturados mediante fallback a código interno.
- `7341dc1`: `feat(admin-express)` - Panel administrativo para confirmación de pagos y publicación con cálculo de expiración automática.
- `90a6880`: `feat(express)` - Editor interactivo tipo Canva con arquitectura de 17 bloques desacoplados y ordenamiento Drag & Drop.
- `f9b7e50`: `fix` - Decodificación y optimización de isotipo, logotipo y video hero en landing principal.
- `f34d1cd`: `feat` - Enlaces visibles y banners promocionales hacia Festejia Express en la home.
- `caea2fc`: `fix` - Recuperación de assets gráficos y póster del hero.
- `0850235`: `fix(security)` - Actualización de seguridad de Next.js para mitigar vulnerabilidad RCE CVE-2025-55182.
- `262a518`: `feat(express)` - Creación inicial del módulo Festejia Express (auth, dashboard, editor, storage, pagos).

---

## 3. COMPARATIVA HISTÓRICA: TARIFAS LEGACY VS. TARIFAS 2026

En las primeras etapas del proyecto (documentadas en `PROYECTO-FESTEJIA.md`), los precios se calculaban con una tasa preliminar fija:
- *Tarifas Originales (Legacy):*
  - Plan Clásico: $45 USD / Bs. 450 (Reserva de Bs. 100).
  - Plan Elegante: $75 USD / Bs. 700.
  - Plan Imperial: $110 USD / Bs. 950.
- *Tarifas Actuales 2026 (Alineadas a la tasa real de mercado de 11.5 BOB/USD):*
  - Plan Clásico: $45 USD / Bs. 520 (Reserva de $15 USD / Bs. 170).
  - Plan Elegante: $75 USD / Bs. 860.
  - Plan Imperial: $110 USD / Bs. 1270.
  - Plan Express: Bs. 200 (Pago único).

### 3.1. Catálogo Histórico de Servicios Adicionales (Legacy Addons)
- **Personalización Total:** $100 USD (Diseño exclusivo creado desde cero por un diseñador senior).
- **Entrega Express en 48 Horas:** $30 USD (Reducido a $15 USD / Bs. 170 en el tarifario actual).
- **Menú de Navegación Sticky:** $15 USD.
- **Save the Date Digital:** $30 USD (Pieza animada previa para WhatsApp).
- **Dominio Propio Independiente (`.com` directo):** $120 USD.
- **Visibilidad Extendida (+3 Meses):** $30 USD (Para mantener la web activa más allá de los 30 días posteriores al evento).
- **Ronda de Ajustes Post-Entrega:** $10 USD.

---

## 4. ESTRATEGIA DE PASARELAS DE PAGO PARA BOLIVIA (PLAN DE 3 FASES)

Debido a que pasarelas globales como Stripe no tienen cobertura nativa para acreditación directa en cuentas bancarias de Bolivia, el proyecto definió un plan de despliegue en tres fases:

### Fase 1: Actual (Manual con Cero Comisiones)
- Se utiliza WhatsApp con código QR Simple (Banco Unión, BNB, BCP, Mercantil Santa Cruz, etc.).
- El cliente transfiere, envía el comprobante por WhatsApp y el administrador confirma la activación en `/admin` o `/admin-express`.

### Fase 2: Escalamiento (Links de Pago Libélula)
- Recomendada al superar los 50 clientes mensuales.
- Integración de **Libélula.bo** (16 años en el mercado boliviano, +600 comercios).
- Generación de links de pago que aceptan QR Simple, tarjetas Visa/Mastercard nacionales e internacionales, Google Pay y Tigo Money con facturación electrónica automática.

### Fase 3: Automatización Total (API Libélula REST Checkout)
- Recomendada al superar los 200 clientes mensuales.
- Checkout embebido directamente en la aplicación sin redirecciones a WhatsApp: la API de Libélula envía webhooks a Supabase y publica la invitación al instante de recibir el pago.

---

## 5. LA BÓVEDA ANTERIOR (`festejia-vault/`)

Antes de la creación de esta memoria exhaustiva en `obsidian/`, existía una versión preliminar en `festejia-vault/` que contenía 4 archivos introductorios:
- `00 - Guía para Usar esta Bóveda en Obsidian.md`: Instrucciones sobre cómo instalar Obsidian y abrir carpetas.
- `00 - Inicio (MOC).md`: Borrador del índice con tags `#festejia` y `#moc`.
- `01 - Marca/01 - Identidad y Propuesta de Valor.md`: Resumen del slogan "Imagina el recuerdo, nosotros lo creamos".
- `02 - Planes y Servicios/01 - Plan Clasico.md`: Ficha preliminar del Plan Clásico.

*Toda esa información ha sido completamente absorbida, actualizada, expandida y perfeccionada dentro de los 15 documentos maestros actuales.*
