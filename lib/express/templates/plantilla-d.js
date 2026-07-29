// Plantilla D — "Jardín" (verde natural, con flores)
export default {
  id: 'plantilla-d',
  nombre: 'Jardín',
  paleta: { primario: '#4a6e5c', dorado: '#c9a96e' },
  bloques: [
    { tipo: 'informacion-principal', estilo: 'default', fijo: true },
    { tipo: 'portada', estilo: 'clasico-dorado', fijo: true },
    { tipo: 'cuenta-regresiva', estilo: 'circular' },
    { tipo: 'ceremonia', estilo: 'con-mapa-embebido' },
    { tipo: 'recepcion', estilo: 'con-mapa-embebido' },
    { tipo: 'itinerario', estilo: 'linea-tiempo' },
    { tipo: 'galeria', estilo: 'grid-3' },
    { tipo: 'dress-code', estilo: 'default' },
    { tipo: 'solo-adultos', estilo: 'default' },
    { tipo: 'regalos', estilo: 'default' },
    { tipo: 'padrinos', estilo: 'default' },
    { tipo: 'confirmacion', estilo: 'default', fijo: true },
    { tipo: 'configuracion', fijo: true },
  ],
  ordenReordenable: ['ceremonia', 'recepcion', 'itinerario', 'galeria', 'dress-code', 'solo-adultos', 'regalos', 'padrinos'],
}
