export default {
  tipo: 'recepcion',
  nombre: 'Recepción',
  icono: '🥂',
  campos: [
    { key: 'lugar', tipo: 'texto', label: 'Nombre del lugar', requerido: true, placeholder: 'Salón de Eventos Paradise' },
    { key: 'direccion', tipo: 'texto', label: 'Dirección', placeholder: 'Av. Siempre Viva 456' },
    { key: 'maps_url', tipo: 'url', label: 'Link de Google Maps', placeholder: 'https://maps.google.com/...' },
    { key: 'hora', tipo: 'hora', label: 'Hora', requerido: true },
  ],
  iaCampos: [],
  estilosDisponibles: ['default', 'con-mapa-embebido'],
}
