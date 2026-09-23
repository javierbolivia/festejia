export default {
  tipo: 'solo-adultos',
  nombre: 'Solo Adultos',
  icono: '🔞',
  campos: [
    { key: 'activo', tipo: 'checkbox', label: 'Este evento es solo para adultos' },
    {
      key: 'mensaje',
      tipo: 'textarea',
      label: 'Mensaje',
      filas: 2,
      placeholder: 'Aunque amamos a sus pequeños, este dia especial es solo para adultos, les pedimos que nos acompañen sin niños.',
      mostrarSi: { campo: 'activo', valor: true },
    },
  ],
  iaCampos: ['mensaje'],
  estilosDisponibles: ['default'],
}
