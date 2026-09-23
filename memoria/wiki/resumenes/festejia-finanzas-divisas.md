---
tipo: resumen
tags: [festejia, finanzas, divisas, tipo-de-cambio, bolivia, latam]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[03_FINANZAS_Y_DIVISAS|raw/documentos/festejia/03_FINANZAS_Y_DIVISAS.md]]"]
---

# Resumen de Fuente: Finanzas, Sistema Multidivisa y Mercado

- **Fuente cruda**: `raw/documentos/festejia/03_FINANZAS_Y_DIVISAS.md`
- **Materia**: Política cambiaria, algoritmo de detección geográfica y conversión monetaria.

## Tesis Central
Festejia opera con una política de doble realidad cambiaria: en Bolivia se desacopla intencionalmente de la tasa oficial del banco central (6.96) fijando una **tasa mínima de mercado libre de 11.5 BOB/USD** para proteger la rentabilidad, mientras que internacionalmente implementa un motor automático de geolocalización que muestra la moneda local del visitante sin fricciones.

## Puntos Clave
1. **Regla de Mercado para Bolivia**:
   - Variable de entorno/código `BOB_MARKET_RATE = 11.5`.
   - Redondeo comercial adaptado:
     - Clásico: $45 USD ➔ Bs. 520
     - Elegante: $75 USD ➔ Bs. 860
     - Imperial: $110 USD ➔ Bs. 1.270
     - Seña de reserva: $15 USD ➔ Bs. 170
2. **Detección Geográfica Automática**:
   - Se realiza mediante combinación de zona horaria (`Intl.DateTimeFormat().resolvedOptions().timeZone`) e idioma (`navigator.language`).
   - Cobertura completa de América Latina (PEN, MXN, COP, ARS, CLP, BRL, UYU, PYG, GTQ, CRC, DOP, HNL, NIO, VES) y monedas globales (USD, EUR, GBP, CAD, AUD).
3. **Mecanismo de Actualización de Tasas**:
   - Endpoint `/api/currency` con recarga horaria (`setInterval`) y al enfocar pestaña (`window.addEventListener('focus')`).
   - Para Bolivia, se asegura `Math.max(BOB_MARKET_RATE, rate)`.
4. **UX de Selección Simplificada**:
   - Toggle binario minimalista: `[Moneda Local Auto-detectada]` vs `[USD Dólares]`.
5. **Pasarelas y Formas de Cobro**:
   - Bolivia: Transferencias bancarias directas y código QR simple.
   - Internacional: PayPal, tarjetas internacionales, Binance (USDT/USDC) y transferencias bancarias.

## Conexiones y Enlaces
- Conceptos: [[politica-cambiaria-mercado]], [[modelo-comercial-festejia]]
- Entidades: [[festejia]]
- Componente técnico: `lib/currency.js` en [[festejia-arquitectura-tecnica]]
