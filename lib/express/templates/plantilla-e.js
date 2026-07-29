// Plantilla E — "Moderna" (negro y dorado, contemporánea)
export default {
  id: 'plantilla-e',
  nombre: 'Moderna',
  paleta: { primario: '#0a0a0a', dorado: '#c4a265' },
  bloques: [
    { tipo: 'informacion-principal', estilo: 'default', fijo: true },
    { tipo: 'portada', estilo: 'minimal', fijo: true },
    { tipo: 'cuenta-regresiva', estilo: 'minimal' },
    { tipo: 'ceremonia', estilo: 'default' },
    { tipo: 'recepcion', estilo: 'default' },
    { tipo: 'itinerario', estilo: 'lista' },
    { tipo: 'galeria', estilo: 'grid-3' },
    { tipo: 'musica', estilo: 'default' },
    { tipo: 'dress-code', estilo: 'default' },
    { tipo: 'solo-adultos', estilo: 'default' },
    { tipo: 'regalos', estilo: 'default' },
    { tipo: 'redes-sociales', estilo: 'default' },
    { tipo: 'confirmacion', estilo: 'default', fijo: true },
    { tipo: 'configuracion', fijo: true },
  ],
  ordenReordenable: ['ceremonia', 'recepcion', 'itinerario', 'galeria', 'musica', 'dress-code', 'solo-adultos', 'regalos', 'redes-sociales'],
}
