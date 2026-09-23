---
tipo: resumen
tags: [festejia, divisas, configuracion, monedas, redondeo, helper]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[15_SISTEMA_DE_CONFIGURACION_Y_DIVISAS_GLOBAL|raw/documentos/festejia/15_SISTEMA_DE_CONFIGURACION_Y_DIVISAS_GLOBAL.md]]"]
---

# Resumen de Fuente: Sistema de Configuración y 23 Divisas Globales

- **Fuente cruda**: `raw/documentos/festejia/15_SISTEMA_DE_CONFIGURACION_Y_DIVISAS_GLOBAL.md`
- **Materia**: Configuración centralizada de WhatsApp, diccionario de 23 monedas oficiales y algoritmos matemáticos de redondeo estético.

## Tesis Central
El motor de localización de Festejia amplía su cobertura a **23 divisas oficiales** (17 latinoamericanas y 6 globales), utilizando un algoritmo de redondeo dinámico por orden de magnitud que elimina centavos confusos y genera cifras comercialmente atractivas en cualquier moneda.

## Puntos Clave
1. **Configuración Centralizada (`lib/config.js`)**:
   - `WHATSAPP_NUMERO`: Variable única para redirigir toda la conversión.
   - Helper `waLink(mensaje)`: Codifica el texto y devuelve la URL canónica de WhatsApp.
2. **Las 23 Divisas Oficiales**:
   - **Latinoamérica (17)**: BOB (Bolivia 11.5), PEN (Perú 3.75), MXN (México 18.5), COP (Colombia 4.100), ARS (Argentina 1.250), CLP (Chile 940), BRL (Brasil 5.4), UYU (Uruguay 40.0), PYG (Paraguay 7.500), GTQ (Guatemala 7.7), CRC (Costa Rica 510), DOP (Rep. Dominicana 59.0), HNL (Honduras 25.0), NIO (Nicaragua 36.8), VES (Venezuela 36.5), PAB (Panamá 1.0), USD-SV (El Salvador 1.0).
   - **Globales (6)**: USD (Estados Unidos), EUR (Europa), GBP (Reino Unido), CAD (Canadá), AUD (Australia), CHF (Suiza).
3. **Algoritmo de Redondeo Estético por Orden de Magnitud**:
   - Precios < 50: Redondea a múltiplos de 1 o 5.
   - Precios 50 - 500: Redondea a múltiplos de 10.
   - Precios 500 - 5.000: Redondea a múltiplos de 50 o 100.
   - Precios > 5.000: Redondea a múltiplos de 500 o 1.000.

## Conexiones y Enlaces
- Conceptos: [[politica-cambiaria-mercado]], [[scripts-whatsapp-festejia]]
- Entidades: [[festejia]], [[whatsapp]]
