// lib/currency.js
// Configuración de divisas y conversión de precios en tiempo real para Festejia.
// La moneda base de negocio es USD.
// En Bolivia, se utiliza la tasa de mercado real solicitada (11.5 BOB/USD).
// En todos los demás países de Latinoamérica y el mundo, se aplican tasas internacionales
// con actualización continua cada hora.

export const BOB_MARKET_RATE = 11.5

export const LATAM_CURRENCIES = {
  BOB: {
    code: 'BOB',
    name: 'Bolivianos',
    country: 'Bolivia',
    symbol: 'Bs.',
    flag: '🇧🇴',
    defaultRate: BOB_MARKET_RATE,
    roundStep: 10,
    isMarketRate: true,
  },
  USD: {
    code: 'USD',
    name: 'Dólares',
    country: 'Internacional / EE.UU.',
    symbol: '$',
    flag: '🇺🇸',
    defaultRate: 1,
    roundStep: 1,
    isMarketRate: false,
  },
  PEN: {
    code: 'PEN',
    name: 'Soles',
    country: 'Perú',
    symbol: 'S/',
    flag: '🇵🇪',
    defaultRate: 3.75,
    roundStep: 5,
    isMarketRate: false,
  },
  MXN: {
    code: 'MXN',
    name: 'Pesos Mexicanos',
    country: 'México',
    symbol: 'MX$',
    flag: '🇲🇽',
    defaultRate: 18.5,
    roundStep: 10,
    isMarketRate: false,
  },
  COP: {
    code: 'COP',
    name: 'Pesos Colombianos',
    country: 'Colombia',
    symbol: 'COL$',
    flag: '🇨🇴',
    defaultRate: 4100,
    roundStep: 1000,
    isMarketRate: false,
  },
  ARS: {
    code: 'ARS',
    name: 'Pesos Argentinos',
    country: 'Argentina',
    symbol: 'AR$',
    flag: '🇦🇷',
    defaultRate: 1250,
    roundStep: 500,
    isMarketRate: false,
  },
  CLP: {
    code: 'CLP',
    name: 'Pesos Chilenos',
    country: 'Chile',
    symbol: 'CLP$',
    flag: '🇨🇱',
    defaultRate: 940,
    roundStep: 500,
    isMarketRate: false,
  },
  BRL: {
    code: 'BRL',
    name: 'Reales',
    country: 'Brasil',
    symbol: 'R$',
    flag: '🇧🇷',
    defaultRate: 5.4,
    roundStep: 5,
    isMarketRate: false,
  },
  UYU: {
    code: 'UYU',
    name: 'Pesos Uruguayos',
    country: 'Uruguay',
    symbol: '$U',
    flag: '🇺🇾',
    defaultRate: 40,
    roundStep: 10,
    isMarketRate: false,
  },
  PYG: {
    code: 'PYG',
    name: 'Guaraníes',
    country: 'Paraguay',
    symbol: '₲',
    flag: '🇵🇾',
    defaultRate: 7500,
    roundStep: 5000,
    isMarketRate: false,
  },
  GTQ: {
    code: 'GTQ',
    name: 'Quetzales',
    country: 'Guatemala',
    symbol: 'Q',
    flag: '🇬🇹',
    defaultRate: 7.7,
    roundStep: 5,
    isMarketRate: false,
  },
  CRC: {
    code: 'CRC',
    name: 'Colones',
    country: 'Costa Rica',
    symbol: '₡',
    flag: '🇨🇷',
    defaultRate: 510,
    roundStep: 100,
    isMarketRate: false,
  },
  DOP: {
    code: 'DOP',
    name: 'Pesos Dominicanos',
    country: 'Rep. Dominicana',
    symbol: 'RD$',
    flag: '🇩🇴',
    defaultRate: 59,
    roundStep: 50,
    isMarketRate: false,
  },
  HNL: {
    code: 'HNL',
    name: 'Lempiras',
    country: 'Honduras',
    symbol: 'L',
    flag: '🇭🇳',
    defaultRate: 25,
    roundStep: 10,
    isMarketRate: false,
  },
  NIO: {
    code: 'NIO',
    name: 'Córdobas',
    country: 'Nicaragua',
    symbol: 'C$',
    flag: '🇳🇮',
    defaultRate: 36.8,
    roundStep: 10,
    isMarketRate: false,
  },
  VES: {
    code: 'VES',
    name: 'Bolívares',
    country: 'Venezuela',
    symbol: 'Bs.',
    flag: '🇻🇪',
    defaultRate: 36.5,
    roundStep: 10,
    isMarketRate: false,
  },
  PAB: {
    code: 'PAB',
    name: 'Balboas / USD',
    country: 'Panamá',
    symbol: 'B/.',
    flag: '🇵🇦',
    defaultRate: 1,
    roundStep: 1,
    isMarketRate: false,
  },
}

export const GLOBAL_CURRENCIES = {
  EUR: {
    code: 'EUR',
    name: 'Euros',
    country: 'España / Europa',
    symbol: '€',
    flag: '🇪🇺',
    defaultRate: 0.92,
    roundStep: 1,
    isMarketRate: false,
  },
  GBP: {
    code: 'GBP',
    name: 'Libras Esterlinas',
    country: 'Reino Unido',
    symbol: '£',
    flag: '🇬🇧',
    defaultRate: 0.78,
    roundStep: 1,
    isMarketRate: false,
  },
  CAD: {
    code: 'CAD',
    name: 'Dólares Canadienses',
    country: 'Canadá',
    symbol: 'CA$',
    flag: '🇨🇦',
    defaultRate: 1.36,
    roundStep: 5,
    isMarketRate: false,
  },
  AUD: {
    code: 'AUD',
    name: 'Dólares Australianos',
    country: 'Australia',
    symbol: 'AU$',
    flag: '🇦🇺',
    defaultRate: 1.5,
    roundStep: 5,
    isMarketRate: false,
  },
  CHF: {
    code: 'CHF',
    name: 'Francos Suizos',
    country: 'Suiza',
    symbol: 'CHF',
    flag: '🇨🇭',
    defaultRate: 0.88,
    roundStep: 1,
    isMarketRate: false,
  },
  JPY: {
    code: 'JPY',
    name: 'Yenes',
    country: 'Japón',
    symbol: '¥',
    flag: '🇯🇵',
    defaultRate: 155,
    roundStep: 100,
    isMarketRate: false,
  },
}

export const CURRENCIES = {
  ...LATAM_CURRENCIES,
  ...GLOBAL_CURRENCIES,
}

/**
 * Obtiene la configuración de una divisa, admitiendo cualquier código ISO 4217 del mundo.
 */
export function getCurrencyMeta(code) {
  if (CURRENCIES[code]) return CURRENCIES[code]
  return {
    code,
    name: code,
    country: code,
    symbol: code,
    flag: '🌐',
    defaultRate: 1,
    roundStep: 1,
    isMarketRate: false,
  }
}

/**
 * Detecta la divisa sugerida según la zona horaria y el idioma del visitante.
 * Cobertura para toda Latinoamérica, Norteamérica y Europa.
 */
export function detectUserCurrency() {
  if (typeof window === 'undefined') return 'BOB'
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase()
    const lang = (navigator.language || navigator.userLanguage || '').toLowerCase()

    // 1. Zonas horarias de Latinoamérica
    if (tz.includes('la_paz')) return 'BOB'
    if (tz.includes('lima')) return 'PEN'
    if (tz.includes('bogota')) return 'COP'
    if (
      tz.includes('mexico') || tz.includes('monterrey') || tz.includes('cancun') || 
      tz.includes('tijuana') || tz.includes('merida') || tz.includes('chihuahua') || 
      tz.includes('hermosillo') || tz.includes('mazatlan')
    ) return 'MXN'
    if (
      tz.includes('buenos_aires') || tz.includes('cordoba') || tz.includes('rosario') || 
      tz.includes('mendoza') || tz.includes('tucuman') || tz.includes('salta') || 
      tz.includes('argentina')
    ) return 'ARS'
    if (tz.includes('santiago') || tz.includes('punta_arenas') || tz.includes('easter')) return 'CLP'
    if (
      tz.includes('sao_paulo') || tz.includes('rio') || tz.includes('bahia') || 
      tz.includes('fortaleza') || tz.includes('manaus') || tz.includes('belem') || 
      tz.includes('recife') || tz.includes('cuiaba')
    ) return 'BRL'
    if (tz.includes('montevideo')) return 'UYU'
    if (tz.includes('asuncion')) return 'PYG'
    if (tz.includes('guayaquil') || tz.includes('galapagos')) return 'USD' // Ecuador usa USD
    if (tz.includes('guatemala')) return 'GTQ'
    if (tz.includes('costa_rica')) return 'CRC'
    if (tz.includes('santo_domingo')) return 'DOP'
    if (tz.includes('tegucigalpa')) return 'HNL'
    if (tz.includes('managua')) return 'NIO'
    if (tz.includes('panama')) return 'USD' // Panamá usa USD / PAB paritario
    if (tz.includes('el_salvador')) return 'USD' // El Salvador usa USD
    if (tz.includes('caracas')) return 'VES'

    // 2. Europa y resto del mundo
    if (tz.includes('madrid') || tz.includes('canary') || tz.includes('europe/')) return 'EUR'
    if (tz.includes('london')) return 'GBP'
    if (tz.includes('canada/') || tz.includes('toronto') || tz.includes('vancouver') || tz.includes('montreal')) return 'CAD'
    if (tz.includes('australia/') || tz.includes('sydney') || tz.includes('melbourne')) return 'AUD'
    if (tz.includes('tokyo')) return 'JPY'
    if (
      tz.includes('america/new_york') || tz.includes('america/chicago') || 
      tz.includes('america/los_angeles') || tz.includes('america/denver') || 
      tz.includes('america/phoenix')
    ) return 'USD'

    // 3. Fallback por idioma / locale del navegador
    if (lang.includes('es-bo')) return 'BOB'
    if (lang.includes('es-pe')) return 'PEN'
    if (lang.includes('es-mx')) return 'MXN'
    if (lang.includes('es-co')) return 'COP'
    if (lang.includes('es-ar')) return 'ARS'
    if (lang.includes('es-cl')) return 'CLP'
    if (lang.includes('pt-br')) return 'BRL'
    if (lang.includes('es-uy')) return 'UYU'
    if (lang.includes('es-py')) return 'PYG'
    if (lang.includes('es-ec')) return 'USD'
    if (lang.includes('es-gt')) return 'GTQ'
    if (lang.includes('es-cr')) return 'CRC'
    if (lang.includes('es-do')) return 'DOP'
    if (lang.includes('es-hn')) return 'HNL'
    if (lang.includes('es-ni')) return 'NIO'
    if (lang.includes('es-pa')) return 'USD'
    if (lang.includes('es-sv')) return 'USD'
    if (lang.includes('es-ve')) return 'VES'
    if (lang.includes('es-es')) return 'EUR'
    if (lang.includes('en-us')) return 'USD'
    if (lang.includes('en-gb')) return 'GBP'

    return 'BOB'
  } catch (e) {
    return 'BOB'
  }
}

/**
 * Convierte un monto base en USD a la divisa seleccionada aplicando redondeo comercial estético.
 * @param {number} usdAmount - Monto base en USD (ej. 45, 60, 110)
 * @param {string} currencyCode - Código de moneda (ej. 'BOB', 'PEN', 'MXN', 'COP')
 * @param {object} customRates - Mapa de tasas actualizadas desde la API
 */
export function convertPrice(usdAmount, currencyCode = 'BOB', customRates = {}) {
  const meta = getCurrencyMeta(currencyCode)
  if (currencyCode === 'USD') return usdAmount

  let rate = customRates[currencyCode] || meta.defaultRate

  // Para Bolivia: tasa real de mercado (mínimo 11.5)
  if (currencyCode === 'BOB') {
    rate = Math.max(BOB_MARKET_RATE, rate)
  }

  const raw = usdAmount * rate

  // Redondeo inteligente según orden de magnitud de la divisa
  if (rate >= 1000) {
    // Monedas de alta denominación (COP, PYG, CLP): redondear a 1000 o 500
    const step = meta.roundStep || 1000
    return Math.round(raw / step) * step
  } else if (rate >= 100) {
    // Monedas como CRC, ARS, JPY
    const step = meta.roundStep || 100
    return Math.round(raw / step) * step
  } else if (rate >= 10) {
    // Monedas como BOB, MXN, UYU, DOP, NIO, HNL
    const step = meta.roundStep || 10
    return Math.round(raw / step) * step
  } else if (rate >= 2) {
    // Monedas como PEN, BRL, GTQ
    const step = meta.roundStep || 5
    return Math.round(raw / step) * step
  } else {
    // Monedas paritarias o menores a 1 (EUR, GBP, USD, PAB)
    return Math.round(raw)
  }
}

/**
 * Formatea un precio para mostrarlo con su símbolo y formato local.
 */
export function formatPrice(amount, currencyCode = 'BOB') {
  const meta = getCurrencyMeta(currencyCode)
  const formattedNumber = new Intl.NumberFormat('es-BO').format(amount)

  if (currencyCode === 'EUR') {
    return `${formattedNumber} €`
  }
  return `${meta.symbol} ${formattedNumber}`
}
