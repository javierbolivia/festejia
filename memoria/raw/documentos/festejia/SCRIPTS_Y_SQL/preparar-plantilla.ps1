# ════════════════════════════════════════════════════════════
# SKILL: Preparar Plantilla para Festejia
# ════════════════════════════════════════════════════════════
#
# USO:
#   .\preparar-plantilla.ps1 "RUTA_CARPETA_SCRAPEADA" "plantillaN"
#
# EJEMPLO:
#   .\preparar-plantilla.ps1 "C:\Users\user23\.kiro\scrapeo de paginas web\PAGINA WEB 5" "plantilla3"
#
# QUÉ HACE:
#   1. Copia la carpeta scrapeada a public/plantillaN/
#   2. Limpia referencias a VOGA (title, og tags, RSS, tracking, footer)
#   3. Agrega IDs dinámicos (nombre-novio1, nombre-novio2, fecha-mes, nombre-invitado-dinamico)
#   4. Inyecta el script completo de Festejia (Supabase, countdown, formulario, QR)
#   5. Elimina footer de VOGA y scripts de tracking externos
#
# DESPUÉS DE EJECUTAR:
#   - Revisar manualmente el index.html para verificar que los IDs quedaron en los elementos correctos
#   - Hacer git add, commit, push
#   - En el panel admin de Festejia, asignar "plantillaN" al evento del cliente
#
# REQUISITOS:
#   - La plantilla scrapeada debe tener la estructura: index.html, css/, images/, fonts/
#   - El HTML debe tener portada con id="v2-capa-bloqueo" y class="v2-boton-entrar"
#   - El HTML debe tener .elementor-countdown-digits para el countdown
#   - El HTML debe tener form.elementor-form con campos nombre, asistencia, mensaje
#

param(
    [Parameter(Mandatory=$true, Position=0)] [string]$SourceFolder,
    [Parameter(Mandatory=$true, Position=1)] [string]$PlantillaName
)

$ProjectRoot = "c:\Users\user23\festejia"
$DestFolder = Join-Path $ProjectRoot "public\$PlantillaName"

# ═══════════════════════════════════════
# PASO 1: Copiar carpeta
# ═══════════════════════════════════════
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚀 PREPARAR PLANTILLA FESTEJIA" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📁 Origen: $SourceFolder" -ForegroundColor Yellow
Write-Host "📁 Destino: $DestFolder" -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path $SourceFolder)) {
    Write-Host "❌ La carpeta origen no existe" -ForegroundColor Red
    exit 1
}

if (Test-Path $DestFolder) {
    Remove-Item $DestFolder -Recurse -Force
}
Copy-Item -Path $SourceFolder -Destination $DestFolder -Recurse
Write-Host "✅ Carpeta copiada" -ForegroundColor Green

# ═══════════════════════════════════════
# PASO 2: Limpiar HTML
# ═══════════════════════════════════════
$htmlPath = Join-Path $DestFolder "index.html"
if (-not (Test-Path $htmlPath)) {
    Write-Host "❌ No se encontró index.html en la carpeta" -ForegroundColor Red
    exit 1
}

$content = Get-Content -LiteralPath $htmlPath -Raw -Encoding UTF8

Write-Host "🧹 Limpiando referencias externas..." -ForegroundColor Yellow

# Cambiar title
$content = $content -replace '<title>[^<]*</title>', '<title>Invitación - Festejia</title>'

# Cambiar og:site_name
$content = $content -replace '(?i)og:site_name"\s*content="[^"]*"', 'og:site_name" content="Festejia"'

# Eliminar og:url de VOGA
$content = $content -replace '<meta property="og:url"[^>]*>', ''

# Eliminar RSS feeds
$content = $content -replace '<link rel="alternate" type="application/rss\+xml"[^>]*>', ''

# Eliminar oEmbed
$content = $content -replace '<link rel="alternate" title="oEmbed[^>]*>', ''

# Eliminar google-site-verification
$content = $content -replace '<meta name="google-site-verification"[^>]*>', ''

# Eliminar shortlink
$content = $content -replace '<link rel="shortlink"[^>]*>', ''

# Eliminar wp-json links
$content = $content -replace '<link rel="https://api\.w\.org/"[^>]*>', ''
$content = $content -replace '<link rel="alternate"[^>]*type="application/json"[^>]*wp-json[^>]*>', ''

# Limpiar VOGA de textos visibles
$content = $content -replace '(?i)VOGA Studios', 'Festejia'
$content = $content -replace '(?i)vogastudios\.com', 'festejia.com'

Write-Host "✅ Referencias limpiadas" -ForegroundColor Green

# ═══════════════════════════════════════
# PASO 3: Verificar IDs dinámicos
# ═══════════════════════════════════════
Write-Host "🔍 Verificando IDs dinámicos..." -ForegroundColor Yellow

$idsNeeded = @('nombre-novio1', 'nombre-novio2', 'fecha-mes', 'nombre-invitado-dinamico')
$missingIds = @()

foreach ($id in $idsNeeded) {
    if ($content -notmatch "id=""$id""") {
        $missingIds += $id
    }
}

if ($missingIds.Count -gt 0) {
    Write-Host "⚠️  IDs faltantes que debes agregar MANUALMENTE:" -ForegroundColor Red
    foreach ($id in $missingIds) {
        Write-Host "   - id=""$id""" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "   GUÍA:" -ForegroundColor Yellow
    Write-Host "   - nombre-novio1: en el h2 del primer nombre (novio/novia 1)" -ForegroundColor Gray
    Write-Host "   - nombre-novio2: en el h2 del segundo nombre" -ForegroundColor Gray
    Write-Host "   - fecha-mes: en el párrafo que muestra el mes/año" -ForegroundColor Gray
    Write-Host "   - nombre-invitado-dinamico: span antes del texto de confirmación" -ForegroundColor Gray
} else {
    Write-Host "✅ Todos los IDs dinámicos presentes" -ForegroundColor Green
}

# ═══════════════════════════════════════
# PASO 4: Verificar elementos del sistema
# ═══════════════════════════════════════
Write-Host "🔍 Verificando elementos del sistema..." -ForegroundColor Yellow

$checks = @(
    @('v2-capa-bloqueo', 'Portada (capa bloqueo)'),
    @('v2-boton-entrar', 'Botón entrar'),
    @('elementor-countdown-digits', 'Countdown'),
    @('elementor-form', 'Formulario confirmación'),
    @('form_fields\[nombre\]', 'Campo nombre en form'),
    @('form_fields\[asistencia\]', 'Campo asistencia en form')
)

foreach ($check in $checks) {
    if ($content -match $check[0]) {
        Write-Host "   ✅ $($check[1])" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $($check[1]) - NO ENCONTRADO" -ForegroundColor Red
    }
}

# ═══════════════════════════════════════
# PASO 5: Inyectar script Festejia si no existe
# ═══════════════════════════════════════
if ($content -notmatch 'FESTEJIA: Invitacion dinamica') {
    Write-Host "📝 Inyectando script de Festejia..." -ForegroundColor Yellow
    
    $festejiaScript = @'

<!-- FESTEJIA: Invitacion dinamica -->
<script>
(function(){
  var params=new URLSearchParams(window.location.search);
  var invitadoId=params.get('id')||'';
  var eventoId=params.get('evento')||'';
  var nombre=params.get('m')?decodeURIComponent(params.get('m')):'';
  var pases=params.get('n')?decodeURIComponent(params.get('n')):'';
  var numPases=(pases.match(/\d+/)||['1'])[0];
  var SU='https://xzkxutllxkdrugjvflco.supabase.co';
  var SK='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6a3h1dGxseGtkcnVnanZmbGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTE0MTgsImV4cCI6MjEwMDUyNzQxOH0.s3icP7S33TEWVL77edSFe8svSgC2AqTQe3lB0WYDrXk';
  var H={'apikey':SK,'Authorization':'Bearer '+SK};

  if(invitadoId){
    fetch(SU+'/rest/v1/invitados?id=eq.'+invitadoId+'&select=*',{headers:H})
    .then(function(r){return r.json();}).then(function(d){
      if(d&&d[0]){nombre=d[0].nombre_completo||nombre;numPases=String(d[0].num_pases||numPases);if(!eventoId)eventoId=d[0].evento_id;}
      cargarEvento();renderUI();
    }).catch(function(){renderUI();});
  } else if(eventoId){cargarEvento();renderUI();}
  else{renderUI();}

  function cargarEvento(){
    if(!eventoId)return;
    fetch(SU+'/rest/v1/eventos?id=eq.'+eventoId+'&select=*',{headers:H})
    .then(function(r){return r.json();}).then(function(ev){
      if(!ev||!ev[0])return;var e=ev[0];
      var ms=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      if(e.nombre_novio1){var x=document.getElementById('nombre-novio1');if(x)x.textContent=e.nombre_novio1;}
      if(e.nombre_novio2){var x=document.getElementById('nombre-novio2');if(x)x.textContent=e.nombre_novio2;}
      if(e.fecha_evento){var f=new Date(e.fecha_evento);var x=document.getElementById('fecha-mes');if(x)x.textContent=ms[f.getMonth()];var c=document.querySelector('[data-date]');if(c){c.setAttribute('data-date',Math.floor(f.getTime()/1000));
              function actualizarCountdown(){
                var now=new Date().getTime();var dist=f.getTime()-now;
                var days=Math.floor(dist/(1000*60*60*24));var hrs=Math.floor((dist%(1000*60*60*24))/(1000*60*60));var mins=Math.floor((dist%(1000*60*60))/(1000*60));var secs=Math.floor((dist%(1000*60))/1000);
                var spans=c.querySelectorAll('.elementor-countdown-digits');if(spans.length>=4){spans[0].textContent=String(days).padStart(2,'0');spans[1].textContent=String(hrs).padStart(2,'0');spans[2].textContent=String(mins).padStart(2,'0');spans[3].textContent=String(secs).padStart(2,'0');}
              }
              actualizarCountdown();
              setInterval(actualizarCountdown, 1000);
            }}
      if(e.lugar_ceremonia){var x=document.getElementById('lugar-ceremonia');if(x)x.innerHTML=e.lugar_ceremonia;}
      if(e.lugar_recepcion){var x=document.getElementById('lugar-recepcion');if(x)x.innerHTML=e.lugar_recepcion;}
      if(e.hora_ceremonia){var x=document.getElementById('hora-ceremonia');if(x)x.textContent=e.hora_ceremonia;}
      if(e.hora_recepcion){var x=document.getElementById('hora-recepcion');if(x)x.textContent=e.hora_recepcion;}
    });
  }

  function renderUI(){
    var bar=document.createElement('div');
    bar.style.cssText='position:fixed;top:0;left:0;right:0;background:rgba(26,26,26,0.95);color:white;text-align:center;padding:0.5rem;font-size:0.75rem;z-index:99999;font-family:Raleway,sans-serif;';
    bar.innerHTML='<span style="color:#c9a96e">Festejia</span>';
    document.body.insertBefore(bar,document.body.firstChild);
    document.body.style.paddingTop='32px';
    var ne=document.getElementById('nombre-invitado-dinamico');if(ne&&nombre)ne.textContent=nombre;
    var allH=document.querySelectorAll('.elementor-heading-title');
    for(var i=0;i<allH.length;i++){var el=allH[i];if((el.textContent.trim()==='2'||el.textContent.trim()==='1')&&el.closest('.elementor-element')&&el.closest('.elementor-element').nextElementSibling&&el.closest('.elementor-element').nextElementSibling.textContent.toUpperCase().indexOf('PASE')>=0)el.textContent=numPases;}
    setTimeout(function(){var inp=document.getElementById('input-nombre-invitado');if(!inp)inp=document.querySelector('input[name="form_fields[nombre]"]');if(inp&&nombre)inp.value=nombre;},1500);
    setTimeout(function(){
      var form=document.querySelector('form.elementor-form');if(!form)return;
      form.addEventListener('submit',function(ev){
        ev.preventDefault();ev.stopPropagation();
        var sel=document.querySelector('[name="form_fields[asistencia]"]');
        var msg=document.querySelector('[name="form_fields[mensaje]"]');
        var estado=(sel&&sel.value.toLowerCase().indexOf('no')>=0)?'rechazado':'confirmado';
        var mensaje=msg?msg.value:'';
        if(invitadoId){
          fetch(SU+'/rest/v1/invitados?id=eq.'+invitadoId,{method:'PATCH',headers:Object.assign({'Content-Type':'application/json','Prefer':'return=minimal'},H),body:JSON.stringify({estado:estado,mensaje_invitado:mensaje,fecha_confirmacion:new Date().toISOString()})})
          .then(function(){mostrarExito(estado);}).catch(function(){mostrarExito(estado);});
        }else{mostrarExito(estado);}
      });
    },2000);
  }

  function mostrarExito(estado){
    var form=document.querySelector('form.elementor-form');if(!form)return;
    var qr='';
    if(estado==='confirmado'&&invitadoId){var u='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=festejia:'+invitadoId;qr='<div style="margin-top:1.5rem"><p style="font-size:0.8rem;color:#666;margin-bottom:0.5rem">Tu pase de acceso:</p><img src="'+u+'" style="width:200px;height:200px;margin:0 auto;display:block;border-radius:8px"/><p style="font-size:0.7rem;color:#999;margin-top:0.5rem">Guarda esta imagen</p></div>';}
    form.innerHTML='<div style="text-align:center;padding:2rem"><h3 style="font-family:Cormorant Garamond,serif;font-size:1.5rem;color:#2c3e6b">\u00a1Gracias!</h3><p style="color:#666;font-size:0.9rem">'+(estado==='confirmado'?'Tu asistencia ha sido confirmada.':'Lamentamos que no puedas asistir.')+'</p>'+qr+'</div>';
  }
})();
</script>
'@
    
    $content = $content -replace '</body>', "$festejiaScript`n</body>"
    Write-Host "✅ Script de Festejia inyectado" -ForegroundColor Green
} else {
    Write-Host "✅ Script de Festejia ya existe" -ForegroundColor Green
}

# ═══════════════════════════════════════
# PASO 6: Eliminar footer de VOGA si existe
# ═══════════════════════════════════════
if ($content -match 'vogastudios-logowhite|wa\.me/59177241359') {
    Write-Host "🧹 Eliminando footer de VOGA..." -ForegroundColor Yellow
    # Eliminar el bloque del footer con logo VOGA y botón WA
    $content = $content -replace '<footer class="site-footer[^"]*".*?</footer></footer>', ''
    Write-Host "✅ Footer eliminado" -ForegroundColor Green
}

# Guardar
Set-Content -LiteralPath $htmlPath -Value $content -NoNewline -Encoding UTF8
Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ ¡PLANTILLA LISTA!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "   1. Revisar $htmlPath (verificar IDs en elementos correctos)" -ForegroundColor Gray
Write-Host "   2. git add public/$PlantillaName" -ForegroundColor Gray
Write-Host "   3. git commit -m 'feat: agregar $PlantillaName'" -ForegroundColor Gray
Write-Host "   4. git push" -ForegroundColor Gray
Write-Host "   5. En panel admin: asignar '$PlantillaName' al evento del cliente" -ForegroundColor Gray
Write-Host ""
Write-Host "⚡ Para vincular al cliente:" -ForegroundColor Yellow
Write-Host "   Panel Admin → Eventos → Selector 'Plantilla' → Elegir '$PlantillaName'" -ForegroundColor Gray
