export default {
  tipo: 'regalos',
  nombre: 'Regalos',
  icono: '🎁',
  campos: [
    { key: 'mensaje', tipo: 'textarea', label: 'Mensaje', filas: 3, placeholder: 'Tu presencia es un regalo de Dios para nosotros. Si deseas hacernos un obsequio, agradeceremos de corazón una contribución para nuestra luna de miel y comenzar esta nueva etapa.' },
    { key: 'qr_imagen', tipo: 'imagen', label: 'QR bancario (opcional)' },
    { key: 'mesa_link', tipo: 'url', label: 'Link de mesa de regalos (opcional)', placeholder: 'https://...' },
  ],
  iaCampos: ['mensaje'],
  estilosDisponibles: ['default'],
}
