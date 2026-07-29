export default {
  tipo: 'configuracion',
  nombre: 'Configuración',
  icono: '⚙️',
  campos: [
    { key: 'idioma', tipo: 'select', label: 'Idioma', opciones: [{ value: 'es', label: 'Español' }, { value: 'en', label: 'English' }] },
    { key: 'password_protegida', tipo: 'checkbox', label: 'Proteger con contraseña' },
    { key: 'password', tipo: 'texto', label: 'Contraseña', mostrarSi: { campo: 'password_protegida', valor: true } },
  ],
  iaCampos: [],
  // Configuración es de negocio, no visual: no tiene Preview.
  sinPreview: true,
}
