export default {
  tipo: 'itinerario',
  nombre: 'Itinerario',
  icono: '🗒️',
  campos: [
    {
      key: 'items',
      tipo: 'lista-items',
      label: 'Momentos del evento',
      itemCampos: [
        { key: 'hora', tipo: 'hora', label: 'Hora' },
        { key: 'descripcion', tipo: 'texto', label: 'Descripción' },
      ],
    },
  ],
  iaCampos: [],
  estilosDisponibles: ['linea-tiempo', 'lista'],
}
