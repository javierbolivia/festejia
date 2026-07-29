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
      placeholder: 'Amamos a los más pequeños, pero este día es solo para adultos.',
      mostrarSi: { campo: 'activo', valor: true },
    },
  ],
  iaCampos: ['mensaje'],
  estilosDisponibles: ['default'],
}
