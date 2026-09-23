---
tipo: concepto
tags: [finanzas, divisas, tipo-de-cambio, bolivia, latam, pricing, algoritmos]
creado: 2026-09-23
actualizado: 2026-09-23
fuentes: ["[[festejia-finanzas-divisas]]", "[[03_FINANZAS_Y_DIVISAS|raw/documentos/festejia/03_FINANZAS_Y_DIVISAS.md]]"]
---

# Política Cambiaria de Mercado Libre y Sistema Multidivisa

## Definición
La **política cambiaria de mercado libre** es la estrategia financiera y algorítmica adoptada por [[festejia]] para operar tanto en el mercado local boliviano (caracterizado por una brecha entre la cotización bancaria oficial y la cotización real de calle) como en más de 19 países de América Latina y el mundo con detección geográfica automática.

---

## 1. El Caso Bolivia: `BOB_MARKET_RATE = 11.5`
- Mientras que la cotización oficial histórica fija el dólar en 6.96 BOB, los costes de reposición de servidores, dominios, licencias y software en dólares exigen utilizar la cotización real: **11.50 BOB por USD**.
- **Regla Inquebrantable en Código**: En `lib/currency.js`, el cálculo para Bolivia evalúa:
  ```javascript
  const effectiveRate = Math.max(BOB_MARKET_RATE, apiRate); // Nunca menor a 11.5
  ```

### Precios Oficiales para Bolivia (Redondeo Comercial a 10 Bs.):
- **Plan Clásico**: $45 USD $\times 11.5 = 517.5 \to$ **Bs. 520**
- **Plan Elegante**: $75 USD $\times 11.5 = 862.5 \to$ **Bs. 860**
- **Plan Imperial**: $110 USD $\times 11.5 = 1265.0 \to$ **Bs. 1.270**
- **Reserva Inicial (Seña)**: $15 USD $\times 11.5 = 172.5 \to$ **Bs. 170**
- **Festejia Express**: Precio base fijo de **Bs. 200**

---

## 2. Tabla Completa de Tasas Base y Redondeos (20 Países y Regiones)

| Código | País / Región | Símbolo | Moneda | Tasa Base USD | Paso de Redondeo Comercial |
|:---:|---|:---:|---|:---:|:---:|
| **BOB** | Bolivia | Bs. | Bolivianos (Tasa Mercado Real) | **11.50** | Múltiplo de 10 Bs. |
| **USD** | EE.UU. / Internacional | $ | Dólares Americanos | 1.00 | Múltiplo de $1 USD |
| **PEN** | Perú | S/ | Soles Peruanos | 3.75 | Múltiplo de 5 Soles |
| **MXN** | México | MX$ | Pesos Mexicanos | 18.50 | Múltiplo de 10 Pesos |
| **COP** | Colombia | COL$ | Pesos Colombianos | 4.100 | Múltiplo de 1.000 Pesos |
| **ARS** | Argentina | AR$ | Pesos Argentinos | 1.250 | Múltiplo de 500 Pesos |
| **CLP** | Chile | CLP$ | Pesos Chilenos | 940 | Múltiplo de 500 Pesos |
| **BRL** | Brasil | R$ | Reales Brasileños | 5.40 | Múltiplo de 5 Reales |
| **UYU** | Uruguay | $U | Pesos Uruguayos | 40.00 | Múltiplo de 10 Pesos |
| **PYG** | Paraguay | ₲ | Guaraníes | 7.500 | Múltiplo de 5.000 Guaraníes |
| **GTQ** | Guatemala | Q | Quetzales | 7.70 | Múltiplo de 5 Quetzales |
| **CRC** | Costa Rica | ₡ | Colones | 510 | Múltiplo de 100 Colones |
| **DOP** | Rep. Dominicana | RD$ | Pesos Dominicanos | 59.00 | Múltiplo de 50 Pesos |
| **HNL** | Honduras | L | Lempiras | 25.00 | Múltiplo de 10 Lempiras |
| **NIO** | Nicaragua | C$ | Córdobas | 36.80 | Múltiplo de 10 Córdobas |
| **VES** | Venezuela | Bs. | Bolívares | 36.50 | Múltiplo de 10 Bolívares |
| **EUR** | Europa / España | € | Euros | 0.92 | Múltiplo de 1 Euro |
| **GBP** | Reino Unido | £ | Libras Esterlinas | 0.78 | Múltiplo de 1 Libra |
| **CAD** | Canadá | CA$ | Dólares Canadienses | 1.36 | Múltiplo de 5 Dólares |
| **AUD** | Australia | AU$ | Dólares Australianos | 1.50 | Múltiplo de 5 Dólares |

---

## 3. Algoritmo de Detección Geográfica y Ciclo de Vida
1. **Detección Automática**:
   El frontend consulta la zona horaria (`Intl.DateTimeFormat().resolvedOptions().timeZone`) y el idioma (`navigator.language`). Si detecta `America/La_Paz` o `es-BO`, activa inmediatamente BOB.
2. **Actualización Horaria en Tiempo Real**:
   El endpoint `/api/currency` consulta proveedores de divisas y refresca el estado en el navegador:
   - Cada 1 hora mediante `setInterval`.
   - Cada vez que el usuario vuelve a enfocar la pestaña del navegador (`window.addEventListener('focus')`).
3. **Respaldo sin Caídas (*Fallback*)**:
   Si la conexión o el endpoint fallan, el código carga inmediatamente las tasas base de referencia de la tabla superior, garantizando que el usuario jamás vea un precio en blanco o un error.
4. **Selector Limpio de Dos Opciones (Toggle)**:
   La interfaz web no muestra desplegables complejos; solo ofrece dos botones:
   `[ Moneda Local Detectada ]` y `[ USD Dólares ]`.

---

## Enlaces Relacionados
- [[modelo-comercial-festejia]]
- [[addons-servicios-adicionales]]
- [[festejia-finanzas-divisas]]
- [[festejia-guia-desarrollo-web]]
