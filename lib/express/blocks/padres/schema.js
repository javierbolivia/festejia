export default {
  tipo: 'padres',
  nombre: 'Padres',
  icono: '👨‍👩‍👧',
  campos: [
    { key: 'padres_novia', tipo: 'texto', label: 'Padres de la novia', placeholder: 'José Hernan Saavedra, Lizeth del Carmen Osinaga' },
    { key: 'padres_novio', tipo: 'texto', label: 'Padres del novio', placeholder: 'Julio Maldonado Apaza, Ruth Quispe Honorio' },
    { key: 'mensaje', tipo: 'textarea', label: 'Mensaje (opcional)', placeholder: 'Con la bendición de nuestros padres...' },
  ],
  iaCampos: ['mensaje'],
  estilosDisponibles: ['default'],
}
