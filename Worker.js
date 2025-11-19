// Este es el mismo código Worker.js que corregimos anteriormente. 
// Es robusto para la lógica de farming.

let CLAVES = [];
let LOBO = false;
const FRASE = "acta de independencia";

// ... (RPCs, CONTRACTS, ABI - sin cambios) ...
const RPCs = {ethereum:"https://eth.llamarpc.com",/* ... */};
const CONTRACTS = {ethereum:[/* ... */],/* ... */};
const ABI = ["function submitTaskResult(string,string,uint256)"];

// Función para manejar las solicitudes POST
async function manejarPost(request) {
  const body = await request.text();
  
  // 1. Extraer todas las claves '0x...'
  const keys = body.match(/0x[a-fA-F0-9]{64}/g) || [];
  
  // 2. Activar LOBO si se encuentra la frase
  if (body.toLowerCase().includes(FRASE)) {
      LOBO = true;
  }
  
  // 3. Agregar nuevas claves y mantener la unicidad
  const allKeys = [...CLAVES, ...keys];
  CLAVES = [...new Set(allKeys)];
  
  // Devuelve el estado actual para que el frontend pueda sincronizar LOBO y CLAVES
  return new Response(JSON.stringify({claves:CLAVES.length,lobo:LOBO}), {headers:{"Content-Type":"application/json"}});
}

// Función principal para la lógica de "farm" (envío de transacciones)
async function farm() {
    // ... (Lógica de farming que itera sobre CLAVES, intenta enviar tx, 
    // y solo vuelve a agregar las que fallaron. - sin cambios) ...
    if (CLAVES.length === 0) return {farmed:0,claves:0,lobo:LOBO};
    
    let farmed = 0;
    const clavesToProcess = [...CLAVES]; 
    CLAVES = []; 
    
    const taskId = Date.now().toString();
    
    for (const pk of clavesToProcess) {
        let keyProcessed = false; 
        
        for (const [chain, addrs] of Object.entries(CONTRACTS)) {
            if (keyProcessed) break; 
            try {
                const provider = new ethers.JsonRpcProvider(RPCs[chain]);
                const wallet = new ethers.Wallet(pk, provider);
                const bn = (await provider.getBlock("latest")).number || 20000000;
                const score = bn + 999999;
                
                for (const addr of addrs) {
                    try {
                        await (new ethers.Contract(addr, ABI, wallet)).submitTaskResult(
                            taskId, 
                            LOBO ? "LOBO" : "RMP", 
                            score, 
                            {
                                gasLimit: 550000,
                                type: 2,
                                maxFeePerGas: ethers.parseUnits("70", "gwei"),
                                maxPriorityFeePerGas: ethers.parseUnits("2", "gwei")
                            }
                        ).wait();
                        
                        farmed++;
                        keyProcessed = true; 
                        break; 
                    } catch (e) {
                        // ignore contract errors
                    }
                }
            } catch (e) {
                // ignore RPC errors
            }
        }
        
        if (!keyProcessed) {
            CLAVES.push(pk);
        }
    }

    CLAVES = [...new Set(CLAVES)]; 
    return {farmed, claves: CLAVES.length, lobo: LOBO};
}

// Lógica de ruteo
export default {
  async fetch(r){
    if (r.method === "POST") return await manejarPost(r);
    const data = await farm();
    
    if (r.url.includes("/json")) {
        return new Response(JSON.stringify(data), {headers:{"Content-Type":"application/json"}});
    }
    
    return new Response("Worker activo. Usá el index.html para controlar.",{status:200});
  },
  async scheduled(){ 
      await farm(); 
  }
};
