import { useState, useRef, useEffect } from 'react'
import { Bot, Send, X, MessageSquare } from 'lucide-react'

const initialMessages = [
  { role: 'bot', text: 'Bienvenido, operador. Soy Nahomy AI, su asistente autónomo de ciberseguridad. ¿Qué intención desea ejecutar?' },
]

const botResponses = {
  'reconocimiento': 'Entendido, iniciando intención automatizada de reconocimiento en el agente Linux-01. Escaneando puertos y servicios...',
  'explotación': 'Procediendo con fase de explotación. Seleccionando vector de ataque adecuado para el objetivo Windows-SRV-03.',
  'persistencia': 'Estableciendo mecanismo de persistencia en agente Linux-02. Mecanismo: cron job reverso.',
  'exfiltración': 'Iniciando exfiltración de datos desde DC-01. Cifrando paquete con AES-256 antes de transferencia.',
  'escalar': 'Ejecutando escalada de privilegios en Windows-10. Técnica: bypass UAC vía fodhelper.',
  'limpiar': 'Limpiando registros de eventos en el sistema objetivo. Eliminando huellas de la operación.',
  'default': 'Intención reconocida. Analizando entorno y preparando módulo de ejecución para: "%s". Tiempo estimado: 12 segundos.',
}

function getBotResponse(userText) {
  const lower = userText.toLowerCase()
  for (const [keyword, response] of Object.entries(botResponses)) {
    if (lower.includes(keyword)) {
      return response
    }
  }
  return botResponses.default.replace('%s', userText)
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getBotResponse(text)
      setMessages((prev) => [...prev, { role: 'bot', text: response }])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-c2-surface border border-c2-border rounded-xl shadow-2xl shadow-black/50 z-50 animate-slide-up flex flex-col" style={{ maxHeight: '480px' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-c2-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-c2-accent/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-c2-accent" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-c2-text-bright leading-tight">
                  Nahomy AI
                </h4>
                <p className="text-xs text-c2-text-dim leading-tight">
                  Asistente Autónomo
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-c2-text-dim hover:text-c2-text-bright transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-c2-accent text-black font-medium'
                      : 'bg-c2-dark border border-c2-border text-c2-text'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-c2-dark border border-c2-border rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-c2-text-dim animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-c2-text-dim animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-c2-text-dim animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-c2-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ej: Ejecutar reconocimiento..."
                className="flex-1 bg-c2-dark border border-c2-border rounded-lg px-3 py-2 text-xs text-c2-text-bright placeholder-c2-text-dim focus:outline-none focus:ring-2 focus:ring-c2-accent/40 focus:border-c2-accent transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-c2-accent hover:bg-c2-accent-dim text-black rounded-lg px-3 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-c2-accent hover:bg-c2-accent-dim text-black shadow-lg shadow-c2-accent/20 flex items-center justify-center transition-all hover:scale-105 z-40 animate-pulse-glow"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </>
  )
}
