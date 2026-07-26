'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'

export default function CheckinScanner() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const [eventoId, setEventoId] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    checkAccess()
    return () => stopScanner()
  }, [])

  async function checkAccess() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }
    const { data: eventos } = await supabase.from('eventos').select('id').eq('user_id', user.id).limit(1)
    if (eventos && eventos.length > 0) setEventoId(eventos[0].id)
  }

  async function startScanner() {
    setScanning(true)
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      // Cargar jsQR dinámicamente
      if (!window.jsQR) {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'
        document.head.appendChild(script)
        await new Promise(r => script.onload = r)
      }
      intervalRef.current = setInterval(scanFrame, 500)
    } catch (err) {
      setError('No se pudo acceder a la cámara: ' + err.message)
      setScanning(false)
    }
  }

  function scanFrame() {
    if (!videoRef.current || !canvasRef.current || !window.jsQR) return
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const code = window.jsQR(imageData.data, imageData.width, imageData.height)
    if (code && code.data) {
      processQR(code.data)
    }
  }

  async function processQR(data) {
    // El QR contiene: festejia:INVITADO_ID
    if (!data.startsWith('festejia:')) return
    const invitadoId = data.replace('festejia:', '')
    
    // Evitar escanear el mismo dos veces seguidas
    if (history.length > 0 && history[0].id === invitadoId) return

    // Buscar invitado
    const { data: invitados } = await supabase
      .from('invitados')
      .select('*')
      .eq('id', invitadoId)

    if (!invitados || invitados.length === 0) {
      setResult({ success: false, message: 'QR no válido. Invitado no encontrado.' })
      return
    }

    const inv = invitados[0]

    if (inv.ingreso) {
      setResult({ success: false, message: `⚠️ ${inv.nombre_completo} YA INGRESÓ anteriormente.`, invitado: inv })
      return
    }

    if (inv.estado !== 'confirmado') {
      setResult({ success: false, message: `⚠️ ${inv.nombre_completo} NO confirmó asistencia (estado: ${inv.estado}).`, invitado: inv })
      return
    }

    // Registrar ingreso
    await supabase.from('invitados').update({ 
      ingreso: true, 
      fecha_ingreso: new Date().toISOString() 
    }).eq('id', invitadoId)

    setResult({ 
      success: true, 
      message: `✓ ${inv.nombre_completo} — ${inv.num_pases} pase(s) — Mesa ${inv.mesa || '-'}`,
      invitado: inv 
    })
    setHistory([{ ...inv, fecha_ingreso: new Date().toISOString() }, ...history])

    // Vibrar si es posible
    if (navigator.vibrate) navigator.vibrate(200)
  }

  function stopScanner() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    setScanning(false)
  }

  // Entrada manual por nombre
  async function manualCheckin(nombre) {
    const { data: invitados } = await supabase
      .from('invitados')
      .select('*')
      .eq('evento_id', eventoId)
      .ilike('nombre_completo', '%' + nombre + '%')

    if (invitados && invitados.length > 0) {
      const inv = invitados[0]
      await supabase.from('invitados').update({ ingreso: true, fecha_ingreso: new Date().toISOString() }).eq('id', inv.id)
      setResult({ success: true, message: `✓ ${inv.nombre_completo} — ${inv.num_pases} pase(s)`, invitado: inv })
      setHistory([{ ...inv, fecha_ingreso: new Date().toISOString() }, ...history])
    } else {
      setResult({ success: false, message: 'No se encontró invitado con ese nombre.' })
    }
  }

  return (
    <div className="checkin-page">
      <header className="checkin-header">
        <a href="/panel" className="back-link">← Volver al Panel</a>
        <h1>Check-in</h1>
      </header>

      <div className="checkin-body">
        {!scanning ? (
          <div className="start-section">
            <div className="scanner-icon">📷</div>
            <h2>Escáner de QR</h2>
            <p>Escanea el código QR del invitado para registrar su ingreso</p>
            <button className="btn-start" onClick={startScanner}>Iniciar Escáner</button>
            
            <div className="manual-section">
              <p className="manual-label">O busca por nombre:</p>
              <form onSubmit={(e) => { e.preventDefault(); manualCheckin(e.target.nombre.value); e.target.reset() }}>
                <input name="nombre" placeholder="Nombre del invitado..." className="manual-input" />
                <button type="submit" className="btn-manual">Buscar</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="scanner-section">
            <video ref={videoRef} className="scanner-video" playsInline />
            <canvas ref={canvasRef} style={{display:'none'}} />
            <button className="btn-stop" onClick={stopScanner}>Detener Escáner</button>
          </div>
        )}

        {error && <div className="checkin-error">{error}</div>}

        {result && (
          <div className={`checkin-result ${result.success ? 'success' : 'warning'}`}>
            <p>{result.message}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h3>Últimos Ingresos ({history.length})</h3>
            {history.map((h, i) => (
              <div key={i} className="history-item">
                <span className="history-name">{h.nombre_completo}</span>
                <span className="history-pases">{h.num_pases} pases</span>
                <span className="history-time">{new Date(h.fecha_ingreso).toLocaleTimeString('es')}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .checkin-page { min-height: 100vh; background: #f5f5f5; }
        .checkin-header { background: #1a1a1a; padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1.5rem; }
        .checkin-header h1 { color: white; font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; margin: 0; }
        .back-link { color: #c9a96e; text-decoration: none; font-size: 0.8rem; }
        .checkin-body { max-width: 500px; margin: 0 auto; padding: 1.5rem; }
        .start-section { text-align: center; padding: 2rem 0; }
        .scanner-icon { font-size: 4rem; margin-bottom: 1rem; }
        .start-section h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.5rem; }
        .start-section p { color: #666; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .btn-start { background: #22c55e; color: white; border: none; padding: 1rem 2.5rem; border-radius: 50px; font-size: 1rem; cursor: pointer; font-weight: 500; }
        .btn-stop { background: #ef4444; color: white; border: none; padding: 0.8rem 2rem; border-radius: 50px; font-size: 0.85rem; cursor: pointer; margin-top: 1rem; display: block; margin-left: auto; margin-right: auto; }
        .scanner-video { width: 100%; border-radius: 12px; }
        .scanner-section { text-align: center; }
        .checkin-error { background: #fee2e2; color: #991b1b; padding: 0.8rem; border-radius: 8px; margin-top: 1rem; font-size: 0.85rem; text-align: center; }
        .checkin-result { padding: 1.2rem; border-radius: 12px; margin-top: 1.5rem; text-align: center; }
        .checkin-result.success { background: #dcfce7; border: 2px solid #22c55e; }
        .checkin-result.warning { background: #fef9c3; border: 2px solid #eab308; }
        .checkin-result p { margin: 0; font-size: 1rem; font-weight: 500; }
        .manual-section { margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid #e0e0e0; }
        .manual-label { color: #999; font-size: 0.8rem; margin-bottom: 0.8rem; }
        .manual-section form { display: flex; gap: 0.5rem; }
        .manual-input { flex: 1; padding: 0.7rem; border: 1.5px solid #e0e0e0; border-radius: 8px; font-size: 0.85rem; }
        .btn-manual { background: #1a1a1a; color: white; border: none; padding: 0.7rem 1.2rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; }
        .history-section { margin-top: 2rem; }
        .history-section h3 { font-size: 1rem; margin-bottom: 0.8rem; }
        .history-item { background: white; border-radius: 8px; padding: 0.8rem 1rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
        .history-name { font-weight: 500; font-size: 0.85rem; }
        .history-pases { color: #666; font-size: 0.75rem; }
        .history-time { color: #22c55e; font-size: 0.75rem; }
      `}</style>
    </div>
  )
}
