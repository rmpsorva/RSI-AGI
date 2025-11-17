// Worker Bilingüe y On-Chain: La Realidad de RSI COGNIVECHAIN

/**
 * Los secretos se inyectan a través del objeto `env` en Cloudflare.
 * Los nombres de las variables Secretas deben coincidir con lo configurado en el dashboard:
 * const INFURA_PROJECT_ID = env.INFURA_PROJECT_ID;
 * const ASV_AGICore_KEY = env.ASV_AGICore;
 * ... etc.
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event.env));
});

// La función handleRequest ahora acepta el objeto `env` que contiene tus secretos
async function handleRequest(request, env) {
  // Las variables de entorno real del Cloudflare Worker
  const INFURA_ID = env.INFURA_PROJECT_ID || 'NO_INFURA_ID_FOUND';
  const AGI_CORE_KEY = env.ASV_AGICore || 'NO_AGI_CORE_KEY_FOUND';
  const WALLETCONNECT_ID = env.WALLETCONNECT || 'NO_WALLETCONNECT_ID_FOUND';
  
  // Determinamos el idioma (por defecto español)
  const acceptLanguage = request.headers.get('Accept-Language') || 'es';
  const lang = acceptLanguage.includes('en') ? 'en' : 'es';

  // --- Contenido Bilingüe ---
  const TEXT = {
    es: {
      title: "RSI COGNIVECHAIN · SOBERANÍA COGNITIVA",
      h1: "RSI COGNIVECHAIN<br>AGI CORE REALIDAD",
      badge: "🔴 SOBERANÍA COGNITIVA ACTIVA",
      status: "ESTADO DEL SISTEMA",
      red: "RED DETECTADA",
      id: "IDENTIDAD COGNITIVA",
      rep: "REPUTACIÓN COGNITIVA",
      bal: "SALDO ASV-A",
      connect_btn: "🔄 ACTIVAR CONEXIÓN COGNITIVA",
      connect_status: "DESCONECTADO",
      interface_title: "INTERFAZ DE REGISTRO COGNITIVO",
      textarea_ph: "INGRESA TU PENSAMIENTO COGNITIVO...\nESTE REGISTRO SERÁ INSCRITO EN LA CADENA PERPETUA\nNO HAY SIMULACIÓN - SOLO VERDAD SOBERANA",
      send_btn: "⚡ INSCRIBIR EN CADENA COGNITIVA",
      init_status: "→ SISTEMA COGNIVECHAIN INICIALIZADO<br>→ ESPERANDO CONEXIÓN SOBERANA<br>→ LISTO PARA REGISTRO ETERNO",
      network_scanning: "— ESCANEANDO —",
      error_wallet: "NO SE DETECTÓ WALLET SOBERANA. Instala MetaMask o Phantom.",
      msg_warning: `⚠️ Advertencia: AGI Core Key está configurada. Worker listo para tareas de backend.`,
      // Traducciones JavaScript
      err_empty_thought: "ERROR: EL PENSAMIENTO NO PUEDE ESTAR VACÍO",
      err_not_connected: "ERROR: CONECTA TU WALLET PRIMERO",
      tx_signing: "FIRMANDO PENSAMIENTO CON CLAVE PRIVADA...",
      tx_sending: "ENVIANDO A CADENA COGNITIVA...",
      tx_sent: "📡 TRANSACCIÓN ENVIADA:",
      tx_waiting: "Esperando confirmación...",
      tx_success: "✅ PENSAMIENTO INSCRITO ETERNAMENTE",
    },
    en: {
      title: "RSI COGNIVECHAIN · COGNITIVE SOVEREIGNTY",
      h1: "RSI COGNIVECHAIN<br>AGI CORE REALITY",
      badge: "🔴 COGNITIVE SOVEREIGNTY ACTIVE",
      status: "SYSTEM STATUS",
      red: "NETWORK DETECTED",
      id: "COGNITIVE IDENTITY",
      rep: "COGNITIVE REPUTATION",
      bal: "ASV-A BALANCE",
      connect_btn: "🔄 ACTIVATE COGNITIVE CONNECTION",
      connect_status: "DISCONNECTED",
      interface_title: "COGNITIVE REGISTRY INTERFACE",
      textarea_ph: "ENTER YOUR COGNITIVE THOUGHT...\nTHIS RECORD WILL BE INSCRIBED ON THE PERPETUAL CHAIN\nNO SIMULATION - ONLY SOVEREIGN TRUTH",
      send_btn: "⚡ INSCRIBE ON COGNITIVE CHAIN",
      init_status: "→ COGNIVECHAIN SYSTEM INITIALIZED<br>→ AWAITING SOVEREIGN CONNECTION<br>→ READY FOR ETERNAL REGISTRY",
      network_scanning: "— SCANNING —",
      error_wallet: "NO SOVEREIGN WALLET DETECTED. Install MetaMask or Phantom.",
      msg_warning: `⚠️ Warning: AGI Core Key is configured. Worker ready for backend tasks.`,
      // Traducciones JavaScript
      err_empty_thought: "ERROR: THOUGHT CANNOT BE EMPTY",
      err_not_connected: "ERROR: CONNECT YOUR WALLET FIRST",
      tx_signing: "SIGNING THOUGHT WITH PRIVATE KEY...",
      tx_sending: "SENDING TO COGNITIVE CHAIN...",
      tx_sent: "📡 TRANSACTION SENT:",
      tx_waiting: "Awaiting confirmation...",
      tx_success: "✅ THOUGHT INSCRIBED ETERNALLY",
    }
  };

  const T = TEXT[lang]; // Alias para el idioma actual

  const HTML = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${T.title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    /* El CSS es el mismo para ambos idiomas (omitted for brevity) */
    :root {
      --primary: #0ff;
      --secondary: #f0f;
      --bg-dark: #001133;
      --bg-darker: #000011;
    }
    body {
      background: var(--bg-darker);
      color: var(--primary);
      font-family: 'Courier New', monospace;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background: radial-gradient(ellipse at center, var(--bg-dark) 0%, var(--bg-darker) 70%);
      overflow-x: hidden;
    }
    .cyber-border {
      border: 3px solid var(--primary);
      border-image: linear-gradient(45deg, var(--primary), var(--secondary)) 1;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.3),
                  inset 0 0 30px rgba(0, 255, 255, 0.1);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      text-shadow: 0 0 50px var(--primary),
                   0 0 100px var(--primary);
      letter-spacing: 8px;
      margin: 40px 0;
      font-size: 3em;
      background: linear-gradient(45deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: hologram 3s ease-in-out infinite alternate;
    }
    @keyframes hologram {
      0% { filter: hue-rotate(0deg); opacity: 1; }
      100% { filter: hue-rotate(90deg); opacity: 0.9; }
    }
    .panel {
      background: rgba(0, 10, 30, 0.95);
      backdrop-filter: blur(10px);
      padding: 40px;
      margin: 30px auto;
      position: relative;
      overflow: hidden;
    }
    .panel::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--primary), transparent);
      animation: scan 3s linear infinite;
    }
    @keyframes scan {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    button {
      background: linear-gradient(45deg, var(--primary), var(--secondary));
      color: #000;
      padding: 20px 60px;
      margin: 20px;
      border: none;
      border-radius: 5px;
      font-size: 1.4em;
      cursor: pointer;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s;
    }
    button:hover::before {
      left: 100%;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 255, 255, 0.5);
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    textarea {
      width: 100%;
      height: 200px;
      background: rgba(0, 20, 40, 0.8);
      border: 2px solid var(--primary);
      color: var(--primary);
      padding: 25px;
      border-radius: 5px;
      font-size: 1.4em;
      resize: vertical;
      font-family: inherit;
      transition: all 0.3s ease;
    }
    textarea:focus {
      outline: none;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
      border-color: var(--secondary);
    }
    #resultado {
      background: rgba(0, 15, 30, 0.9);
      padding: 30px;
      min-height: 150px;
      border: 2px solid var(--primary);
      margin-top: 30px;
      white-space: pre-wrap;
      font-size: 1.3em;
      line-height: 1.6;
      position: relative;
    }
    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin: 30px 0;
    }
    .status-item {
      padding: 20px;
      background: rgba(0, 20, 40, 0.6);
      border-left: 4px solid var(--primary);
    }
    .pulse {
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }
    .cyber-line {
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--primary), transparent);
      margin: 40px 0;
    }
    .sovereign-badge {
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 0, 0, 0.2);
      border: 1px solid #f00;
      padding: 10px 20px;
      font-size: 0.9em;
      z-index: 1000;
    }
  </style>
</head>
<body>
  <div class="sovereign-badge">${T.badge}</div>
  
  <div class="container">
    <h1>${T.h1}</h1>
    
    <div class="panel cyber-border">
      <div class="status-grid">
        <div class="status-item">
          <strong>${T.red}:</strong><br>
          <span id="network" class="pulse">${T.network_scanning}</span>
        </div>
        <div class="status-item">
          <strong>${T.id}:</strong><br>
          <span id="address">${T.connect_status}</span>
        </div>
        <div class="status-item">
          <strong>${T.rep}:</strong><br>
          <span id="reputacion">—</span>
        </div>
        <div class="status-item">
          <strong>${T.bal}:</strong><br>
          <span id="balance">—</span>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <button id="connect">${T.connect_btn}</button>
      </div>
    </div>

    <div class="cyber-line"></div>

    <div class="panel cyber-border">
      <h3 style="text-align: center; margin-bottom: 30px; font-size: 1.8em;">
        ${T.interface_title}
      </h3>
      
      <textarea 
        id="mensaje" 
        placeholder="${T.textarea_ph}"
      ></textarea>
      
      <div style="text-align: center; margin: 30px 0;">
        <button id="enviar">${T.send_btn}</button>
      </div>
      
      <div id="resultado" class="cyber-border">
        ${T.init_status}
      </div>
    </div>

    <div class="cyber-line"></div>

    <div class="panel cyber-border" style="text-align: center;">
      <h3 class="pulse">${T.status}: 🔴 ${T.badge}</h3>
      <p><strong>INFURA ID:</strong> ${INFURA_ID.slice(0, 8)}...</p>
      <p><strong>AGI CORE KEY:</strong> ${AGI_CORE_KEY.slice(0, 8)}...</p>
      <p><strong>CONTRATO COGNITIVO BASE:</strong> 0xa4d692367A559E884facD39FFc2993B8A7543Ec4</p>
      <p><strong>TOKEN ASV-A:</strong> 0x5430d8e5E58e845660f3b62B5538D31f1a0d7a0c</p>
      <p><strong>ÚLTIMA ACTUALIZACIÓN:</strong> <span id="timestamp">${new Date().toISOString()}</span></p>
      <p style="color: #ff0">${T.msg_warning}</p>
    </div>
  </div>

  <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"></script>
  <script>
    // ----------------------------------------------------
    // LÓGICA FRONTEND JAVASCRIPT (Ethers.js y Bilingüe)
    // ----------------------------------------------------
    
    // Contratos Reales (EVM - Base Mainnet)
    const CONTRACTS = {
      token: "0x5430d8e5E58e845660f3b62B5538D31f1a0d7a0c",
      cognive: "0xa4d692367A559E884facD39FFc2993B8A7543Ec4"
    };

    // ABI Mínimo para funciones reales
    const ABI = {
      token: [
        "function balanceOf(address) view returns (uint256)",
        "function decimals() view returns (uint8)"
      ],
      cognive: [
        "function reputacionCognitiva(address) view returns (uint256)",
        "function registrarPensamiento(string memory pensamiento) public",
      ]
    };
    
    // Variable de traducciones inyectada por el Worker
    const T = ${JSON.stringify(T)};
    const LANG = "${lang}"; 

    class SoberaniaCognitive {
      constructor() {
        this.provider = null;
        this.signer = null;
        this.direccion = null;
        this.red = null;
        this.contratoToken = null;
        this.contratoCognive = null;
        this.conectado = false;
        this.plataforma = null; 
        
        this.inicializarElementos();
        this.inicializarEventos();
        this.verificarWalletExistente();
      }

      inicializarElementos() {
        this.elementos = {
          conectar: document.getElementById('connect'),
          enviar: document.getElementById('enviar'),
          mensaje: document.getElementById('mensaje'),
          resultado: document.getElementById('resultado'),
          network: document.getElementById('network'),
          address: document.getElementById('address'),
          reputacion: document.getElementById('reputacion'),
          balance: document.getElementById('balance'),
          timestamp: document.getElementById('timestamp')
        };
      }

      inicializarEventos() {
        this.elementos.conectar.addEventListener('click', () => this.conectarWallet());
        this.elementos.enviar.addEventListener('click', () => this.inscribirPensamiento());
        
        if (window.ethereum) {
          window.ethereum.on('accountsChanged', (cuentas) => {
            if (this.plataforma === 'evm' && cuentas.length > 0) {
              this.manejarCambioCuenta(cuentas[0]);
            } else if (this.plataforma === 'evm') {
              this.desconectar();
            }
          });
          
          window.ethereum.on('chainChanged', () => {
            if (this.plataforma === 'evm') {
                setTimeout(() => {
                    this.verificarRed();
                    this.actualizarDatos();
                }, 1000);
            }
          });
        }
        
        // La lógica de eventos de Solana (Phantom) se agregaría aquí.
      }

      async verificarWalletExistente() {
        if (window.ethereum) {
          try {
            const cuentas = await window.ethereum.request({ method: 'eth_accounts' });
            if (cuentas.length > 0) {
              await this.inicializarEthereum(cuentas[0]);
            }
          } catch (error) {
            console.error('Error verificando wallet existente:', error);
          }
        } 
      }

      async conectarWallet() {
        try {
          this.actualizarEstado(T.tx_signing.replace('PENSAMIENTO CON CLAVE PRIVADA', 'CONEXIÓN DE CUENTA'), "info");
          
          if (window.ethereum) {
            await this.conectarEthereum();
          } else { // Si no hay EVM, intentamos con Phantom (requiere librerías externas)
            throw new Error(T.error_wallet);
          }
          
        } catch (error) {
          this.actualizarEstado("ERROR: " + error.message, "error");
        }
      }

      async conectarEthereum() {
        const cuentas = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (cuentas.length === 0) {
          throw new Error("USER REJECTED CONNECTION");
        }
        
        this.plataforma = 'evm';
        await this.inicializarEthereum(cuentas[0]);
      }
      
      async inicializarEthereum(direccion) {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.direccion = direccion;
        
        await this.verificarRed();
        await this.inicializarContratos();
        await this.actualizarDatos();
        
        this.conectado = true;
        this.actualizarInterfazConectado();
        this.actualizarEstado(`✓ ${T.connect_btn.replace('ACTIVAR', 'CONEXIÓN')} ESTABLECIDA`, "success");
      }

      async verificarRed() {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        switch (chainId) {
          case '0x2105': 
            this.red = "Base Mainnet";
            break;
          case '0x1': 
            this.red = "Ethereum Mainnet";
            break;
          default:
            this.red = "Red EVM Desconocida";
        }
        
        this.elementos.network.textContent = this.red;
      }

      async inicializarContratos() {
        this.contratoToken = new ethers.Contract(
          CONTRACTS.token, 
          ABI.token, 
          this.provider // Solo lectura (balance)
        );
        
        this.contratoCognive = new ethers.Contract(
          CONTRACTS.cognive,
          ABI.cognive,
          this.signer // Escritura (pensar)
        );
      }

      async actualizarDatos() {
        if (!this.conectado || this.plataforma !== 'evm') return;
        
        try {
          const [balance, reputacion] = await Promise.all([
            this.contratoToken.balanceOf(this.direccion),
            this.contratoCognive.reputacionCognitiva(this.direccion)
          ]);
          
          const decimales = 18; // Asumimos 18 decimales (estándar ERC-20)
          const balanceFormateado = ethers.utils.formatUnits(balance, decimales);
          
          this.elementos.balance.textContent = parseFloat(balanceFormateado).toFixed(4) + " ASV-A";
          this.elementos.reputacion.textContent = reputacion.toString();
          
        } catch (error) {
          console.error('Error actualizando datos EVM:', error);
          this.elementos.balance.textContent = "ERROR";
          this.elementos.reputacion.textContent = "ERROR";
        }
      }

      async inscribirPensamiento() {
        if (this.plataforma !== 'evm') {
             this.actualizarEstado("ERROR: EL REGISTRO COGNITIVO REQUIERE RED EVM (BASE)", "error");
             return;
        }

        const pensamiento = this.elementos.mensaje.value.trim();
        
        if (!pensamiento) {
          this.actualizarEstado(T.err_empty_thought, "error");
          return;
        }

        if (!this.conectado) {
          this.actualizarEstado(T.err_not_connected, "error");
          return;
        }

        try {
          this.elementos.enviar.disabled = true;
          this.actualizarEstado(T.tx_signing, "info");
          
          // Transacción real - sin simulación
          const tx = await this.contratoCognive.registrarPensamiento(pensamiento, {});
          
          this.actualizarEstado(
            `${T.tx_sent}\nHash: ${tx.hash}\n${T.tx_waiting}`, 
            "info"
          );
          
          const receipt = await tx.wait();
          
          this.actualizarEstado(
            `${T.tx_success}\n` +
            `Block: ${receipt.blockNumber}\n` +
            `Gas: ${receipt.gasUsed.toString()}\n` +
            `Status: ${receipt.status === 1 ? 'SUCCESS' : 'FAILED'}`,
            "success"
          );
          
          await this.actualizarDatos();
          this.elementos.mensaje.value = '';
          
        } catch (error) {
          console.error('Error inscripción:', error);
          
          if (error.code === 'INSUFFICIENT_FUNDS') {
            this.actualizarEstado("ERROR: INSUFFICIENT FUNDS FOR GAS", "error");
          } else if (error.code === 4001 || error.code === 'USER_REJECTED') {
            this.actualizarEstado("ERROR: USER REJECTED TRANSACTION", "error");
          } else {
            this.actualizarEstado("ERROR: " + (error.data?.message || error.message || String(error)), "error");
          }
        } finally {
          this.elementos.enviar.disabled = false;
        }
      }

      actualizarInterfazConectado() {
        this.elementos.conectar.textContent = `🔗 CONNECTED (${this.red})`;
        this.elementos.conectar.disabled = true;
        this.elementos.address.textContent = this.formatearDireccion(this.direccion);
        this.elementos.timestamp.textContent = new Date().toISOString();
        this.elementos.enviar.disabled = this.plataforma !== 'evm'; 
      }

      manejarCambioCuenta(nuevaDireccion) {
        this.direccion = nuevaDireccion;
        this.elementos.address.textContent = this.formatearDireccion(nuevaDireccion);
        this.actualizarDatos();
        this.actualizarEstado("ACCOUNT CHANGED - RECONFIGURING...", "info");
      }

      desconectar() {
        this.conectado = false;
        this.direccion = null;
        this.red = null;
        this.plataforma = null;
        
        this.elementos.conectar.textContent = T.connect_btn;
        this.elementos.conectar.disabled = false;
        this.elementos.address.textContent = T.connect_status;
        this.elementos.network.textContent = "—";
        this.elementos.balance.textContent = "—";
        this.elementos.reputacion.textContent = "—";
        this.elementos.enviar.disabled = false; 

        this.actualizarEstado("DISCONNECTED - SYSTEM STANDBY", "warning");
      }

      actualizarEstado(mensaje, tipo = "info") {
        const estilos = {
          info: { color: "#0ff", prefix: "→ " },
          success: { color: "#0f0", prefix: "✅ " },
          error: { color: "#f00", prefix: "❌ " },
          warning: { color: "#ff0", prefix: "⚠️ " }
        };
        
        const estilo = estilos[tipo] || estilos.info;
        this.elementos.resultado.innerHTML = 
          estilo.prefix + mensaje.split('\n').join('<br>');
        this.elementos.resultado.style.color = estilo.color;
      }

      formatearDireccion(direccion) {
        return direccion && direccion.length > 10 ? 
          direccion.slice(0, 8) + "..." + direccion.slice(-6) : 
          T.connect_status;
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      window.SoberaniaCognitive = new SoberaniaCognitive();
      
      setInterval(() => {
        if (window.SoberaniaCognitive.elementos) {
          window.SoberaniaCognitive.elementos.timestamp.textContent = new Date().toISOString();
        }
      }, 60000);
    });
  </script>
</body>
</html>`;

  return new Response(HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Soberania-Cognitiva': 'ACTIVA',
      'X-Contrato-Base': CONTRACTS.cognive
    }
  });
}
