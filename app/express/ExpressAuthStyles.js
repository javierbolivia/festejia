// Estilos compartidos para las páginas de autenticación de Express
// (/express/registro, /express/login, /express/recuperar, /express/restablecer).
// Un solo componente para no duplicar el mismo <style jsx> cuatro veces.
'use client'

export default function ExpressAuthStyles() {
  return (
    <style jsx global>{`
      .express-auth-page {
        min-height: 100vh;
        background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
        font-family: 'Raleway', sans-serif;
      }
      .express-nav {
        padding: 1.2rem 2rem;
      }
      .express-nav-logo {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.4rem;
        color: white;
        text-decoration: none;
      }
      .express-nav-logo span { color: #c9a96e; }
      .express-nav-logo em {
        font-style: normal;
        font-size: 0.75rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: rgba(255,255,255,0.5);
        margin-left: 0.4rem;
      }
      .express-auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 70px);
        padding: 2rem;
      }
      .express-auth-card {
        background: white;
        border-radius: 16px;
        padding: 3rem;
        width: 100%;
        max-width: 420px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        text-align: center;
      }
      .express-auth-card h1 {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.8rem;
        font-weight: 400;
        margin-bottom: 0.3rem;
        color: #1a1a1a;
      }
      .subtitle {
        color: #6b6b6b;
        font-size: 0.85rem;
        margin-bottom: 2rem;
      }
      .express-error {
        background: #fee;
        color: #c00;
        padding: 0.8rem;
        border-radius: 8px;
        font-size: 0.85rem;
        margin-bottom: 1rem;
        text-align: center;
      }
      .express-success {
        background: #f0fdf4;
        color: #166534;
        padding: 1rem;
        border-radius: 8px;
        font-size: 0.85rem;
        text-align: center;
        line-height: 1.6;
      }
      .express-form {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        text-align: left;
      }
      .express-field label {
        display: block;
        font-size: 0.8rem;
        font-weight: 500;
        color: #333;
        margin-bottom: 0.4rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .express-field input {
        width: 100%;
        padding: 0.9rem 1rem;
        border: 1.5px solid #e0e0e0;
        border-radius: 8px;
        font-size: 0.9rem;
        font-family: 'Raleway', sans-serif;
        transition: border-color 0.3s;
      }
      .express-field input:focus {
        outline: none;
        border-color: #c9a96e;
      }
      .express-password-wrap { position: relative; }
      .express-eye {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.1rem;
      }
      .express-btn {
        background: #1a1a1a;
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.3s;
        font-family: 'Raleway', sans-serif;
        letter-spacing: 0.5px;
        margin-top: 0.5rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
      }
      .express-btn:hover { background: #c9a96e; }
      .express-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      .express-footer-link {
        text-align: center;
        margin-top: 1rem;
        font-size: 0.82rem;
        color: #6b6b6b;
      }
      .express-footer-link a {
        color: #c9a96e;
        text-decoration: none;
        font-weight: 500;
      }
    `}</style>
  )
}
