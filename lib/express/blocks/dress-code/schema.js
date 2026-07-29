export default {
  tipo: 'dress-code',
  nombre: 'Dress Code',
  icono: '👗',
  campos: [
    {
      key: 'icono',
      tipo: 'icono',
      label: 'Icono',
      opciones: [
        { value: 'formal', label: 'Formal', emoji: '🎩' },
        { value: 'elegante', label: 'Elegante', emoji: '👗' },
        { value: 'casual', label: 'Casual', emoji: '👕' },
        { value: 'playa', label: 'Playa', emoji: '🏖️' },
      ],
    },
    { key: 'texto', tipo: 'textarea', label: 'Descripción', filas: 2, placeholder: 'Formal - Elegante' },
    { key: 'color_sugerido', tipo: 'color', label: 'Color sugerido' },
  ],
  iaCampos: ['texto'],
  estilosDisponibles: ['default'],
}
