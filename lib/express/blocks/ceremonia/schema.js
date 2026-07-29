export default {
  tipo: 'ceremonia',
  nombre: 'Ceremonia',
  icono: '💍',
  campos: [
    { key: 'lugar', tipo: 'texto', label: 'Nombre del lugar', requerido: true, placeholder: 'Iglesia San Sebastián' },
    { key: 'direccion', tipo: 'texto', label: 'Dirección', placeholder: 'Av. Siempre Viva 123' },
    { key: 'maps_url', tipo: 'url', label: 'Link de Google Maps', placeholder: 'https://maps.google.com/...' },
    { key: 'hora', tipo: 'hora', label: 'Hora', requerido: true },
  ],
  iaCampos: [],
  estilosDisponibles: ['default', 'con-mapa-embebido'],
}
