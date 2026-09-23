---
title: Finanzas, Sistema Multidivisa y Mercado
tags:
  - festejia/finanzas
  - divisas
  - precios
  - bolivia
updated: 2026-09-23
---

# 🌐 Finanzas, Sistema Multidivisa y Mercado

Festejia opera con un modelo financiero adaptado a la realidad económica tanto del mercado local boliviano como del mercado internacional y de toda América Latina.

---

## 1. La Política de Mercado para Bolivia: Tasa 11.5 BOB/USD

> [!IMPORTANT] Regla Fundamental de Negocio
> En Bolivia, el tipo de cambio oficial del banco central no refleja la realidad del mercado de divisas. Por tanto, Festejia utiliza una **tasa mínima de mercado libre de 11.5 Bolivianos por cada Dólar (BOB_MARKET_RATE = 11.5)**.
>
> Ningún precio en bolivianos se calcula jamás a la tasa oficial antigua (6.96).

### Cálculo de Precios para Bolivia (con redondeo comercial amigable):
- **Plan Clásico:** $45 USD × 11.5 = 517.5 ➔ **Bs. 520**
- **Plan Elegante:** $75 USD × 11.5 = 862.5 ➔ **Bs. 860**
- **Plan Imperial:** $110 USD × 11.5 = 1265.0 ➔ **Bs. 1.270**
- **Reserva Inicial:** $15 USD × 11.5 = 172.5 ➔ **Bs. 170**

---

## 2. Cobertura Internacional y Detección Automática de País

El sitio web de Festejia no obliga al visitante a buscar una lista de países ni a cambiar monedas manualmente. El sistema **detecta automáticamente el país del visitante** mediante:
1. Zona horaria del navegador (`Intl.DateTimeFormat().resolvedOptions().timeZone`).
2. Idioma y configuración regional del dispositivo (`navigator.language`).

### Tabla de Divisas y Tasas Base de Referencia:

| Código | País / Región | Símbolo | Moneda | Tasa Base USD | Paso Redondeo |
|:---:|---|:---:|---|:---:|:---:|
| **BOB** | Bolivia | Bs. | Bolivianos (Tasa Mercado) | **11.50** | 10 |
| **USD** | Internacional / EE.UU. | $ | Dólares Americanos | 1.00 | 1 |
| **PEN** | Perú | S/ | Soles Peruanos | 3.75 | 5 |
| **MXN** | México | MX$ | Pesos Mexicanos | 18.50 | 10 |
| **COP** | Colombia | COL$ | Pesos Colombianos | 4.100 | 1000 |
| **ARS** | Argentina | AR$ | Pesos Argentinos | 1.250 | 500 |
| **CLP** | Chile | CLP$ | Pesos Chilenos | 940 | 500 |
| **BRL** | Brasil | R$ | Reales Brasileños | 5.40 | 5 |
| **UYU** | Uruguay | $U | Pesos Uruguayos | 40.00 | 10 |
| **PYG** | Paraguay | ₲ | Guaraníes | 7.500 | 5000 |
| **GTQ** | Guatemala | Q | Quetzales | 7.70 | 5 |
| **CRC** | Costa Rica | ₡ | Colones | 510 | 100 |
| **DOP** | Rep. Dominicana | RD$ | Pesos Dominicanos | 59.00 | 50 |
| **HNL** | Honduras | L | Lempiras | 25.00 | 10 |
| **NIO** | Nicaragua | C$ | Córdobas | 36.80 | 10 |
| **VES** | Venezuela | Bs. | Bolívares | 36.50 | 10 |
| **EUR** | Europa / España | € | Euros | 0.92 | 1 |
| **GBP** | Reino Unido | £ | Libras Esterlinas | 0.78 | 1 |
| **CAD** | Canadá | CA$ | Dólares Canadienses | 1.36 | 5 |
| **AUD** | Australia | AU$ | Dólares Australianos | 1.50 | 5 |

---

## 3. Actualización de Tasas en Tiempo Real
- El sistema cuenta con un endpoint `/api/currency` que consulta las variaciones del mercado internacional.
- La página web actualiza las tasas **automáticamente cada 1 hora** (`setInterval`) y cada vez que el usuario enfoca la pestaña (`window.addEventListener('focus')`).
- Si la conexión falla, se usan las tasas de respaldo seguras sin interrumpir la experiencia de compra.
- Para Bolivia, el código siempre evalúa `Math.max(BOB_MARKET_RATE, rate)` garantizando que nunca baje de 11.5.

---

## 4. Selector de Divisa Limpio (Toggle de 2 Opciones)
Para evitar saturar al cliente con barras infinitas de botones o selectores complejos, la interfaz presenta una barra minimalista de 2 opciones:
1. **[Moneda Local Auto-detectada]** (Ejemplo: `[Bs. Bolivianos]` en Bolivia, `[S/ Soles]` en Perú, `[MX$ Pesos]` en México).
2. **[USD Dólares]** (Para quienes prefieren cotizar o pagar en moneda internacional).

---

## 5. Política de Pagos y Facturación
- **Reserva Inicial ($15 USD / Bs. 170):** Permite iniciar el proceso de diseño y asegurar la fecha en el cronograma.
- **Saldo Contra Entrega:** El cliente abona el saldo restante únicamente cuando ha revisado el enlace privado de su invitación, realizado las correcciones deseadas y dado su aprobación final.
- **Métodos de Pago Aceptados:**
  - Bolivia: Transferencia bancaria (todos los bancos), cobro por código QR simple.
  - Internacional: PayPal, tarjetas de débito/crédito internacionales, Binance (USDC/USDT), transferencia SWIFT.

---

Volver al índice: [[00_INDICE_MAESTRO]] | Ver Catálogo: [[04_CATALOGO_COLECCIONES]]
