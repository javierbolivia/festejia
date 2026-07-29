// Plantilla C — "Romance" (rosa pastel, delicada y suave)
export default {
  id: 'plantilla-c',
  nombre: 'Romance',
  paleta: { primario: '#8b5f6b', dorado: '#d4a5b0' },
  bloques: [
    { tipo: 'informacion-principal', estilo: 'default', fijo: true },
    { tipo: 'portada', estilo: 'clasico-dorado', fijo: true },
    { tipo: 'cuenta-regresiva', estilo: 'circular' },
    { tipo: 'historia', estilo: 'default' },
    { tipo: 'padres', estilo: 'default' },
    { tipo: 'ceremonia', estilo: 'default' },
    { tipo: 'recepcion', estilo: 'default' },
    { tipo: 'galeria', estilo: 'carrusel' },
    { tipo: 'musica', estilo: 'default' },
    { tipo: 'dress-code', estilo: 'default' },
    { tipo: 'regalos', estilo: 'default' },
    { tipo: 'confirmacion', estilo: 'default', fijo: true },
    { tipo: 'configuracion', fijo: true },
  ],
  ordenReordenable: ['cuenta-regresiva', 'historia', 'padres', 'ceremonia', 'recepcion', 'galeria', 'musica', 'dress-code', 'regalos'],
}
