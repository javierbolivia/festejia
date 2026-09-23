const fs = require('fs');
const path = 'c:/Users/user23/festejia/public/plantilla2/index.html';

let html = fs.readFileSync(path, 'utf8');

// 1. LIMPIAR VOGA
html = html.replace(/<title>[^<]*<\/title>/, '<title>Invitación - Festejia</title>');
html = html.replace(/og:site_name"\s*content="[^"]*"/, 'og:site_name" content="Festejia"');
html = html.replace(/<meta property="og:url"[^>]*>/g, '');
html = html.replace(/<link rel="alternate" type="application\/rss\+xml"[^>]*>/g, '');
html = html.replace(/<link rel="alternate" title="oEmbed[^>]*>/g, '');
html = html.replace(/<meta name="google-site-verification"[^>]*>/g, '');
html = html.replace(/<link rel="shortlink"[^>]*>/g, '');
html = html.replace(/VOGA Studios/g, 'Festejia');
html = html.replace(/Marmol - Festejia/g, 'Invitación - Festejia');

// 2. AGREGAR IDs DINÁMICOS

// Portada: primer nombre (data-id="1412a60") 
html = html.replace(
  /(data-id="1412a60"[\s\S]*?<h2 class="elementor-heading-title elementor-size-default")>/,
  '$1 id="nombre-novio1-portada">'
);
// Portada: segundo nombre (data-id="7dcb6e1")
html = html.replace(
  /(data-id="7dcb6e1"[\s\S]*?<h2 class="elementor-heading-title elementor-size-default")>/,
  '$1 id="nombre-novio2-portada">'
);

// Sección principal: nombres (data-id="ee13953" y "f9e04c8") - ya tienen id en el original? Verificar
if (!html.includes('id="nombre-novio1"')) {
  html = html.replace(
    /(data-id="ee13953"[\s\S]*?<h2 class="elementor-heading-title elementor-size-default")>/,
    '$1 id="nombre-novio1">'
  );
}
if (!html.includes('id="nombre-novio2"')) {
  html = html.replace(
    /(data-id="f9e04c8"[\s\S]*?<h2 class="elementor-heading-title elementor-size-default")>/,
    '$1 id="nombre-novio2">'
  );
}

// Nombre invitado en sección verde (data-id="44a6ebb" - "Julio Zambrana")
html = html.replace(
  /(data-id="44a6ebb"[\s\S]*?<h2 class="elementor-heading-title elementor-size-default")>/,
  '$1 id="nombre-invitado-seccion">'
);

// Fecha mes (data-id="8955916")
if (!html.includes('id="fecha-mes"')) {
  html = html.replace(
    /(data-id="8955916"[\s\S]*?<div class="elementor-widget-container">\s*<p)>/,
    '$1 id="fecha-mes">'
  );
}

// Nombre invitado dinámico en sección confirmación
if (!html.includes('id="nombre-invitado-dinamico"')) {
  // Insertar span antes del texto de confirmación en sección formulario
  html = html.replace(
    /(data-id="9829222"[\s\S]*?<div class="elementor-widget-container">\s*<p)>/,
    '$1><span id="nombre-invitado-dinamico" style="font-family:\'Great Vibes\',cursive;font-size:1.8em;color:#876E44;display:block;margin-bottom:0.5rem;"></span'
  );
}

// Nombres al final "Carlos y Carmen" (data-id="2d3d7ae")
html = html.replace(
  /(data-id="2d3d7ae"[\s\S]*?<div class="elementor-widget-container">\s*<p)>/,
  '$1 id="nombres-final">'
);

// 3. INYECTAR SCRIPT FESTEJIA (antes de </body>)
if (!html.includes('FESTEJIA: Invitacion dinamica')) {
  const festejiaScript = `
<!-- FESTEJIA: Invitacion dinamica -->
<script>
(function(){
  var params=new URLSearchParams(window.location.search);
  var invitadoId=params.get('id')||'';
  var eventoId=params.get('evento')||'';
  var nombre=params.get('m')?decodeURIComponent(params.get('m')):'';
  var pases=params.get('n')?decodeURIComponent(params.get('n')):'';
  var numPases=(pases.match(/\\d+/)||['1'])[0];
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
      // Nombres principales
      if(e.nombre_novio1){
        var x=document.getElementById('nombre-novio1');if(x)x.textContent=e.nombre_novio1;
        var xp=document.getElementById('nombre-novio1-portada');if(xp)xp.textContent=e.nombre_novio1;
      }
      if(e.nombre_novio2){
        var x=document.getElementById('nombre-novio2');if(x)x.textContent=e.nombre_novio2;
        var xp=document.getElementById('nombre-novio2-portada');if(xp)xp.textContent=e.nombre_novio2;
      }
      // Nombres al final
      if(e.nombre_novio1&&e.nombre_novio2){
        var nf=document.getElementById('nombres-final');if(nf)nf.textContent=e.nombre_novio1+' y '+e.nombre_novio2;
      }
      // Fecha
      if(e.fecha_evento){
        var f=new Date(e.fecha_evento);
        var x=document.getElementById('fecha-mes');if(x)x.textContent=ms[f.getMonth()]+' '+f.getFullYear();
        var c=document.querySelector('[data-date]');
        if(c){
          c.setAttribute('data-date',Math.floor(f.getTime()/1000));
          function actualizarCountdown(){
            var now=new Date().getTime();var dist=f.getTime()-now;
            if(dist<=0)return;
            var days=Math.floor(dist/(1000*60*60*24));
            var hrs=Math.floor((dist%(1000*60*60*24))/(1000*60*60));
            var mins=Math.floor((dist%(1000*60*60))/(1000*60));
            var secs=Math.floor((dist%(1000*60))/1000);
            var spans=c.querySelectorAll('.elementor-countdown-digits');
            if(spans.length>=4){
              spans[0].textContent=String(days).padStart(2,'0');
              spans[1].textContent=String(hrs).padStart(2,'0');
              spans[2].textContent=String(mins).padStart(2,'0');
              spans[3].textContent=String(secs).padStart(2,'0');
            }
          }
          actualizarCountdown();
          setInterval(actualizarCountdown, 1000);
        }
      }
      if(e.lugar_ceremonia){var x=document.getElementById('lugar-ceremonia');if(x)x.innerHTML=e.lugar_ceremonia;}
      if(e.lugar_recepcion){var x=document.getElementById('lugar-recepcion');if(x)x.innerHTML=e.lugar_recepcion;}
      if(e.hora_ceremonia){var x=document.getElementById('hora-ceremonia');if(x)x.textContent=e.hora_ceremonia;}
      if(e.hora_recepcion){var x=document.getElementById('hora-recepcion');if(x)x.textContent=e.hora_recepcion;}
    });
  }

  function renderUI(){
    // Barra Festejia
    var bar=document.createElement('div');
    bar.style.cssText='position:fixed;top:0;left:0;right:0;background:rgba(26,26,26,0.95);color:white;text-align:center;padding:0.5rem;font-size:0.75rem;z-index:99999;font-family:Raleway,sans-serif;';
    bar.innerHTML='<span style="color:#c9a96e">Festejia</span>';
    document.body.insertBefore(bar,document.body.firstChild);
    document.body.style.paddingTop='32px';
    // Nombre invitado
    var ne=document.getElementById('nombre-invitado-dinamico');if(ne&&nombre)ne.textContent=nombre;
    var nis=document.getElementById('nombre-invitado-seccion');if(nis&&nombre)nis.textContent=nombre;
    // Pases
    var allH=document.querySelectorAll('.elementor-heading-title');
    for(var i=0;i<allH.length;i++){
      var el=allH[i];
      if((el.textContent.trim()==='2'||el.textContent.trim()==='1')&&el.closest('.elementor-element')&&el.closest('.elementor-element').nextElementSibling&&el.closest('.elementor-element').nextElementSibling.textContent.toUpperCase().indexOf('PASE')>=0){
        el.textContent=numPases;
      }
    }
    // Nombre en input form
    setTimeout(function(){
      var inp=document.querySelector('input[name="form_fields[nombre]"]');
      if(inp&&nombre)inp.value=nombre;
    },1500);
    // Form submit
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
    form.innerHTML='<div style="text-align:center;padding:2rem"><h3 style="font-family:Cormorant Garamond,serif;font-size:1.5rem;color:#2c3e6b">\\u00a1Gracias!</h3><p style="color:#666;font-size:0.9rem">'+(estado==='confirmado'?'Tu asistencia ha sido confirmada.':'Lamentamos que no puedas asistir.')+'</p>'+qr+'</div>';
  }
})();
</script>
`;
  html = html.replace('</body>', festejiaScript + '\n</body>');
}

// 4. Eliminar scripts duplicados de portada/countdown que el scraper capturó
// Desactivar el countdown hardcodeado original
html = html.replace(
  /var targetDate = new Date\('[^']*'\);\s*function updateCD\(\)\{[^}]*\}/,
  'function updateCD(){} // desactivado - manejado por FESTEJIA'
);

fs.writeFileSync(path, html, 'utf8');
console.log('✅ Plantilla2 fixed successfully');
console.log('Has José:', html.includes('José'));
console.log('Has corazón:', html.includes('corazón'));
console.log('Has nombre-novio1:', html.includes('id="nombre-novio1"'));
console.log('Has nombre-novio1-portada:', html.includes('id="nombre-novio1-portada"'));
console.log('Has nombre-invitado-seccion:', html.includes('id="nombre-invitado-seccion"'));
console.log('Has nombres-final:', html.includes('id="nombres-final"'));
console.log('Has FESTEJIA script:', html.includes('FESTEJIA: Invitacion dinamica'));
