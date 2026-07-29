export default {
  tipo: 'padres',
  nombre: 'Padres',
  icono: '👨‍👩‍👧',
  campos: [
    { key: 'padres_novia', tipo: 'texto', label: 'Padres de la novia', placeholder: 'Nombre y Nombre' },
    { key: 'padres_novio', tipo: 'texto', label: 'Padres del novio', placeholder: 'Nombre y Nombre' },
    { key: 'mensaje', tipo: 'textarea', label: 'Mensaje (opcional)', placeholder: 'Con la bendición de nuestros padres...' },
  ],
  iaCampos: ['mensaje'],
  estilosDisponibles: ['default'],
}
