// Plantilla B — "Clásica" (blanco y dorado, minimalista)
export default {
  id: 'plantilla-b',
  nombre: 'Clásica',
  paleta: { primario: '#1a1a1a', dorado: '#c9a96e' },
  bloques: [
    { tipo: 'informacion-principal', estilo: 'default', fijo: true },
    { tipo: 'portada', estilo: 'minimal', fijo: true },
    { tipo: 'cuenta-regresiva', estilo: 'minimal' },
    { tipo: 'ceremonia', estilo: 'default' },
    { tipo: 'recepcion', estilo: 'default' },
    { tipo: 'itinerario', estilo: 'lista' },
    { tipo: 'galeria', estilo: 'grid-3' },
    { tipo: 'dress-code', estilo: 'default' },
    { tipo: 'regalos', estilo: 'default' },
    { tipo: 'padres', estilo: 'default' },
    { tipo: 'confirmacion', estilo: 'default', fijo: true },
    { tipo: 'configuracion', fijo: true },
  ],
  ordenReordenable: ['cuenta-regresiva', 'ceremonia', 'recepcion', 'itinerario', 'galeria', 'dress-code', 'regalos', 'padres'],
}
