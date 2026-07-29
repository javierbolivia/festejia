// Plantilla A — "Paradise" (verde y dorado, estilo tropical elegante)
//
// Este archivo es LO ÚNICO que define una plantilla: qué bloques usa,
// en qué orden aparecen por defecto, y qué estilo visual aplica cada uno.
// El motor del editor (EditorEngine.js) nunca importa este archivo por
// nombre: lo recibe dinámicamente según invitacion.plantilla.
export default {
  id: 'plantilla-a',
  nombre: 'Paradise',
  paleta: { primario: '#2d4a3e', dorado: '#b8860b' },
  bloques: [
    { tipo: 'informacion-principal', estilo: 'default', fijo: true },
    { tipo: 'portada', estilo: 'clasico-dorado', fijo: true },
    { tipo: 'cuenta-regresiva', estilo: 'circular' },
    { tipo: 'padres', estilo: 'default' },
    { tipo: 'ceremonia', estilo: 'default' },
    { tipo: 'recepcion', estilo: 'default' },
    { tipo: 'itinerario', estilo: 'linea-tiempo' },
    { tipo: 'historia', estilo: 'default' },
    { tipo: 'galeria', estilo: 'grid-3' },
    { tipo: 'musica', estilo: 'default' },
    { tipo: 'dress-code', estilo: 'default' },
    { tipo: 'solo-adultos', estilo: 'default' },
    { tipo: 'regalos', estilo: 'default' },
    { tipo: 'padrinos', estilo: 'default' },
    { tipo: 'redes-sociales', estilo: 'default' },
    { tipo: 'confirmacion', estilo: 'default', fijo: true },
    { tipo: 'configuracion', fijo: true },
  ],
  // Solo estos bloques se pueden arrastrar para reordenar en el panel.
  // Portada, Información principal, Confirmación y Configuración son fijos.
  ordenReordenable: ['cuenta-regresiva', 'padres', 'ceremonia', 'recepcion', 'itinerario', 'historia', 'galeria', 'musica', 'dress-code', 'solo-adultos', 'regalos', 'padrinos', 'redes-sociales'],
}
