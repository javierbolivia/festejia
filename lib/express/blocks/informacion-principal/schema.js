export default {
  tipo: 'informacion-principal',
  nombre: 'Información principal',
  icono: '💌',
  campos: [
    { key: 'nombre1', tipo: 'texto', label: 'Nombre de uno de los novios', requerido: true, placeholder: 'Carlos' },
    { key: 'nombre2', tipo: 'texto', label: 'Nombre del otro novio', requerido: true, placeholder: 'Carmen' },
    { key: 'fecha_evento', tipo: 'fecha', label: 'Fecha del evento', requerido: true },
    { key: 'hora_evento', tipo: 'hora', label: 'Hora del evento', requerido: true },
    { key: 'padres_novia', tipo: 'texto', label: 'Padres de la novia', placeholder: 'José Hernan Saavedra, Lizeth del Carmen Osinaga' },
    { key: 'padres_novio', tipo: 'texto', label: 'Padres del novio', placeholder: 'Julio Maldonado Apaza, Ruth Quispe Honorio' },
  ],
  iaCampos: [],
}
