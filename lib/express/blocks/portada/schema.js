export default {
  tipo: 'portada',
  nombre: 'Portada',
  icono: '🖼️',
  campos: [
    { key: 'titulo', tipo: 'texto', label: 'Título', requerido: true, placeholder: 'Nos casamos' },
    { key: 'subtitulo', tipo: 'texto', label: 'Subtítulo', placeholder: '¡Acompáñanos a celebrar!' },
    { key: 'imagen', tipo: 'imagen', label: 'Imagen de portada', requerido: true },
  ],
  iaCampos: ['subtitulo'],
  estilosDisponibles: ['clasico-dorado', 'minimal'],
}
