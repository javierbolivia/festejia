export default {
  tipo: 'informacion-principal',
  nombre: 'Información principal',
  icono: '💌',
  campos: [
    { key: 'nombre1', tipo: 'texto', label: 'Nombre de uno de los novios', requerido: true, placeholder: 'Laura' },
    { key: 'nombre2', tipo: 'texto', label: 'Nombre del otro novio', requerido: true, placeholder: 'Carlos' },
    { key: 'fecha_evento', tipo: 'fecha', label: 'Fecha del evento', requerido: true },
    { key: 'hora_evento', tipo: 'hora', label: 'Hora del evento', requerido: true },
    { key: 'padres_novia', tipo: 'texto', label: 'Padres de la novia', placeholder: 'Nombre y Nombre' },
    { key: 'padres_novio', tipo: 'texto', label: 'Padres del novio', placeholder: 'Nombre y Nombre' },
  ],
  iaCampos: [],
}
