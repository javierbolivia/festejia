export default {
  tipo: 'confirmacion',
  nombre: 'Confirmación',
  icono: '✅',
  campos: [
    { key: 'titulo', tipo: 'texto', label: 'Título', placeholder: 'Confirma tu asistencia' },
    { key: 'fecha_limite', tipo: 'fecha', label: 'Fecha límite para confirmar' },
    { key: 'telefono_whatsapp', tipo: 'texto', label: 'WhatsApp para confirmar', placeholder: '+591 700 00000' },
  ],
  iaCampos: [],
  estilosDisponibles: ['default'],
}
