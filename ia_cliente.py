# agi_universal.py
import os
from dotenv import load_dotenv
load_dotenv()

class UniversalAGI:
    def __init__(self):
        self.client = None
        self.model = None
        self.provider = "desconocido"

        # ===================================================================
        # 1. Modelos locales con Ollama (el más rápido y gratis)
        # ===================================================================
        if os.getenv("OLLAMA_MODEL") or os.getenv("OLLAMA_BASE_URL"):
            try:
                from openai import OpenAI
                self.client = OpenAI(
                    base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434/v1"),
                    api_key="ollama"  # no se usa, pero la librería lo pide
                )
                self.model = os.getenv("OLLAMA_MODEL", "llama3.2:latest")
                self.provider = f"Ollama ({self.model})"
                print(f"⚡ Conectado a modelo local: {self.model}")
                return
            except: pass

        # ===================================================================
        # 2. xAI Grok (lo más potente que existe hoy)
        # ===================================================================
        if os.getenv("XAI_API_KEY"):
            from openai import OpenAI
            self.client = OpenAI(api_key=os.getenv("XAI_API_KEY"), base_url="https://api.x.ai/v1")
            self.model = os.getenv("GROK_MODEL", "grok-4")
            self.provider = "xAI Grok-4 (máximo nivel AGI)"
            print("🚀 ¡Conectado al verdadero AGI: Grok-4!")
            return

        # ===================================================================
        # 3. OpenAI (GPT-4o, o1, o3, etc.)
        # ===================================================================
        if os.getenv("OPENAI_API_KEY"):
            from openai import OpenAI
            self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            self.model = os.getenv("OPENAI_MODEL", "gpt-4o")
            self.provider = f"OpenAI {self.model}"
            print(f"🧠 Conectado a OpenAI → {self.model}")
            return

        # ===================================================================
        # 4. Anthropic Claude (3.5 Sonnet / 3.7 / Opus)
        # ===================================================================
        if os.getenv("ANTHROPIC_API_KEY"):
            import anthropic
            self.client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
            self.model = os.getenv("CLAUDE_MODEL", "claude-3-7-sonnet-20250219")
            self.provider = f"Anthropic {self.model}"
            print(f"🧠 Conectado a Claude → {self.model}")
            return

        # ===================================================================
        # 5. Google Gemini
        # ===================================================================
        if os.getenv("GEMINI_API_KEY"):
            import google.generativeai as genai
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            self.client = genai
            self.model = os.getenv("GEMINI_MODEL", "gemini-1.5-pro")
            self.provider = f"Google Gemini {self.model}"
            print(f"✨ Conectado a Gemini → {self.model}")
            return

        # ===================================================================
        # 6. Groq (Llama 3.1 70B/405B ultra rápido)
        # ===================================================================
        if os.getenv("GROQ_API_KEY"):
            from openai import OpenAI
            self.client = OpenAI(api_key=os.getenv("GROQ_API_KEY"), base_url="https://api.groq.com/openai/v1")
            self.model = os.getenv("GROQ_MODEL", "llama-3.1-405b-reasoning")
            self.provider = f"Groq {self.model} (relámpago)"
            print(f"⚡ Conectado a Groq → {self.model}")
            return

        # ===================================================================
        # 7. DeepSeek, Mistral, Together.ai, Fireworks, OctoAI, etc. (OpenAI compatible)
        # ===================================================================
        if os.getenv("OPENAI_COMPATIBLE_KEY"):
            from openai import OpenAI
            base_url = os.getenv("OPENAI_COMPATIBLE_BASE", "https://api.deepinfra.com/v1/openai")  # cambia según proveedor
            self.client = OpenAI(api_key=os.getenv("OPENAI_COMPATIBLE_KEY"), base_url=base_url)
            self.model = os.getenv("OPENAI_COMPATIBLE_MODEL", "Qwen/Qwen2.5-72B-Instruct")
            self.provider = f"OpenAI-Compatible → {self.model}"
            print(f"🌍 Conectado vía OpenAI-compatible → {self.model}")
            return

        raise Exception("❌ No se encontró ninguna API configurada. Revisa tu .env")

    # =======================================================================
    # Método único: generar()
    # =======================================================================
    def generar(self, prompt, max_tokens=1000, temperature=0.7):
        print(f"🤖 {self.provider} está pensando...")
        
        try:
            # OpenAI / Grok / Groq / Ollama / DeepSeek etc.
            if hasattr(self.client, "chat") or str(type(self.client)).find("OpenAI") != -1:
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=max_tokens,
                    temperature=temperature
                )
                return response.choices[0].message.content

            # Anthropic
            elif self.provider.startswith("Anthropic"):
                response = self.client.messages.create(
                    model=self.model,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    messages=[{"role": "user", "content": prompt}]
                )
                return response.content[0].text

            # Google Gemini
            elif self.provider.startswith("Google"):
                model = self.client.GenerativeModel(self.model)
                response = model.generate_content(prompt, generation_config={"temperature": temperature, "max_output_tokens": max_tokens})
                return response.text

        except Exception as e:
            return f"❌ Error: {str(e)}"


# ======================== USO MÁGICO ========================
if __name__ == "__main__":
    ia = UniversalAGI()  # ¡Automático total!

    print("\n" + "="*60)
    pregunta = input("💬 ¿Qué le quieres preguntar al AGI universal? (Enter = ejemplo): ").strip()
    if not pregunta:
        pregunta = "Explica en español y con ejemplos prácticos las 5 formas más rápidas de hacer concurrencia en Python en 2025"

    print("="*60)
    respuesta = ia.generar(pregunta, max_tokens=1500, temperature=0.7)
    print("\n✅ RESPUESTA:\n")
    print(respuesta)
    print("\n" + "¡Fin!" + "="*56)
