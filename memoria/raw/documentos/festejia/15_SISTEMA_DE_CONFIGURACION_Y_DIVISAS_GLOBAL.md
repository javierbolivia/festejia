# 15 - SISTEMA DE CONFIGURACIÓN GLOBAL Y MOTOR MULTIDIVISAS

> Configuración centralizada de negocio, enlaces inteligentes de WhatsApp y especificación matemática del motor de conversión multidivisas.
> Archivos: `lib/config.js`, `lib/currency.js`.

---

## 1. CONFIGURACIÓN CENTRALIZADA (`lib/config.js`)

Para eliminar duplicaciones en el código y evitar errores de mantenimiento, todas las referencias al número de contacto y la generación de enlaces de WhatsApp se centralizan en un único módulo:

### 1.1. Variable de Entorno y Fallback Seguro
```javascript
export const WHATSAPP_NUMERO =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59100000000'
```
Permite actualizar el número de WhatsApp de soporte y ventas desde el panel de control de Vercel sin necesidad de modificar el código fuente.

### 1.2. Constructor de Enlaces (`waLink`)
```javascript
export function waLink(mensaje) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`
}
```
Utilizado en más de 11 componentes del proyecto (catálogos de bodas, quinceañeras, graduaciones, bautizos, pie de página, login y panel de ayuda) para garantizar que los mensajes lleguen siempre codificados con formato UTF-8 válido.

---

## 2. ESPECIFICACIÓN DEL MOTOR MULTIDIVISAS (`lib/currency.js`)

Festejia cuenta con una arquitectura multidivisas nativa diseñada para atender anfitriones en toda América Latina, Estados Unidos y Europa.
- **Moneda Base del Negocio:** **USD** (Dólar estadounidense).
- **Tasa Fija de Mercado para Bolivia:** **11.50 BOB/USD** (`BOB_MARKET_RATE = 11.5`).

---

## 3. TABLA COMPLETA DE LAS 23 DIVISAS SOPORTADAS

### 3.1. Las 17 Divisas de Latinoamérica (`LATAM_CURRENCIES`)

| Código | Moneda | País | Símbolo | Bandera | Tasa Ref. | Paso de Redondeo | Tasa Mercado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BOB** | Bolivianos | Bolivia | `Bs.` | 🇧🇴 | **11.50** | 10 | **SÍ (Fija)** |
| **USD** | Dólares | Internacional / EE.UU. | `$` | 🇺🇸 | 1.00 | 1 | No |
| **PEN** | Soles | Perú | `S/` | 🇵🇪 | 3.75 | 5 | No |
| **MXN** | Pesos Mexicanos | México | `MX$` | 🇲🇽 | 18.50 | 10 | No |
| **COP** | Pesos Colombianos | Colombia | `COL$` | 🇨🇴 | 4,100 | 1,000 | No |
| **ARS** | Pesos Argentinos | Argentina | `AR$` | 🇦🇷 | 1,250 | 500 | No |
| **CLP** | Pesos Chilenos | Chile | `CLP$` | 🇨🇱 | 940 | 500 | No |
| **BRL** | Reales | Brasil | `R$` | 🇧🇷 | 5.40 | 5 | No |
| **UYU** | Pesos Uruguayos | Uruguay | `$U` | 🇺🇾 | 40.00 | 10 | No |
| **PYG** | Guaraníes | Paraguay | `₲` | 🇵🇾 | 7,500 | 5,000 | No |
| **GTQ** | Quetzales | Guatemala | `Q` | 🇬🇹 | 7.70 | 5 | No |
| **CRC** | Colones | Costa Rica | `₡` | 🇨🇷 | 510 | 100 | No |
| **DOP** | Pesos Dominicanos | Rep. Dominicana | `RD$` | 🇩🇴 | 59.00 | 50 | No |
| **HNL** | Lempiras | Honduras | `L` | 🇭🇳 | 25.00 | 10 | No |
| **NIO** | Córdobas | Nicaragua | `C$` | 🇳🇮 | 36.80 | 10 | No |
| **VES** | Bolívares | Venezuela | `Bs.` | 🇻🇪 | 36.50 | 10 | No |
| **PAB** | Balboas / USD | Panamá | `B/.` | 🇵🇦 | 1.00 | 1 | No |

### 3.2. Las 6 Divisas Globales (`GLOBAL_CURRENCIES`)

| Código | Moneda | Región | Símbolo | Bandera | Tasa Ref. | Paso de Redondeo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **EUR** | Euros | España / Europa | `€` | 🇪🇺 | 0.92 | 1 |
| **GBP** | Libras Esterlinas | Reino Unido | `£` | 🇬🇧 | 0.78 | 1 |
| **CAD** | Dólares Canadienses | Canadá | `CA$` | 🇨🇦 | 1.36 | 5 |
| **AUD** | Dólares Australianos | Australia | `AU$` | 🇦🇺 | 1.50 | 5 |
| **CHF** | Francos Suizos | Suiza | `CHF` | 🇨🇭 | 0.88 | 1 |
| **JPY** | Yenes | Japón | `¥` | 🇯🇵 | 155 | 100 |

---

## 4. ALGORITMO DE DETECCIÓN GEOGRÁFICA (`detectUserCurrency`)

El sistema detecta automáticamente la divisa adecuada en el primer milisegundo de carga:
1. **Fase 1: Zona Horaria (Timezone):**
   - Evalúa `Intl.DateTimeFormat().resolvedOptions().timeZone`.
   - Mapea zonas precisas (ej. `la_paz` ➔ `BOB`, `bogota` ➔ `COP`, `madrid` ➔ `EUR`, `buenos_aires` ➔ `ARS`, `sao_paulo` ➔ `BRL`, etc.).
   - Reconoce economías dolarizadas nativas: `guayaquil`/`galapagos` (Ecuador) ➔ `USD`, `panama` ➔ `USD`, `el_salvador` ➔ `USD`.
2. **Fase 2: Idioma del Navegador (Locale Fallback):**
   - Si la zona horaria no es concluyente, evalúa `navigator.language` (ej. `es-bo`, `es-pe`, `es-mx`, `es-co`, `pt-br`, `es-es`, `en-us`).
3. **Fase 3: Fallback Predeterminado:**
   - Si no se puede determinar, asume `BOB` (Bolivia) como mercado principal.

---

## 5. ALGORITMO DE REDONDEO COMERCIAL (`convertPrice`)

A diferencia de los conversores financieros rígidos que muestran centavos poco estéticos (ej. "Bs. 517.50" o "COL$ 307,521"), Festejia aplica una regla matemática por orden de magnitud para generar precios comerciales limpios y elegantes:

```javascript
export function convertPrice(usdAmount, currencyCode = 'BOB', customRates = {}) {
  const meta = getCurrencyMeta(currencyCode)
  if (currencyCode === 'USD') return usdAmount

  let rate = customRates[currencyCode] || meta.defaultRate

  // Protección Bolivia: nunca menor a 11.5
  if (currencyCode === 'BOB') {
    rate = Math.max(BOB_MARKET_RATE, rate)
  }

  const raw = usdAmount * rate

  // Redondeo según magnitud de la moneda
  if (rate >= 1000) {
    // COP, PYG, CLP -> múltiplos de 500 o 1000
    const step = meta.roundStep || 1000
    return Math.round(raw / step) * step
  } else if (rate >= 100) {
    // ARS, JPY, CRC -> múltiplos de 100
    const step = meta.roundStep || 100
    return Math.round(raw / step) * step
  } else if (rate >= 10) {
    // BOB, MXN, UYU, DOP, NIO, HNL -> múltiplos de 10
    const step = meta.roundStep || 10
    return Math.round(raw / step) * step
  } else if (rate >= 2) {
    // PEN, BRL, GTQ -> múltiplos de 5
    const step = meta.roundStep || 5
    return Math.round(raw / step) * step
  } else {
    // EUR, GBP, USD, PAB -> enteros
    return Math.round(raw)
  }
}
```

### 5.1. Formateo Local (`formatPrice`)
- Aplica formato numérico de millares en español (`1.270` o `860`).
- Si es Euro (`EUR`), ubica el símbolo al final: `110 €`.
- Para el resto de monedas, antepone el símbolo: `Bs. 860`, `S/ 280`, `$ 75`.
