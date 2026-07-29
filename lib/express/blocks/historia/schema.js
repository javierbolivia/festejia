export default {
  tipo: 'historia',
  nombre: 'Historia',
  icono: '📖',
  campos: [
    { key: 'titulo', tipo: 'texto', label: 'Título', placeholder: 'Nuestra historia' },
    { key: 'texto', tipo: 'textarea', label: 'Cuéntanos cómo se conocieron', filas: 5 },
  ],
  iaCampos: ['texto'],
  estilosDisponibles: ['default'],
}
