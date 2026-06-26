import { useState } from 'react'
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      if (username === 'admin' && password === 'Nahomy2024') {
        onLogin()
      } else {
        setError('Credenciales inválidas. Intente de nuevo.')
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-c2-darker px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-c2-surface border border-c2-border mb-4">
            <Shield className="w-8 h-8 text-c2-accent" />
          </div>
          <h1 className="text-2xl font-bold text-c2-text-bright tracking-tight">
            Nahomy AI
          </h1>
          <p className="text-c2-text-dim text-sm mt-1">
            Plataforma de Auditoría y Control
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-c2-surface border border-c2-border rounded-xl p-6 space-y-5 shadow-2xl shadow-black/40"
        >
          <div className="space-y-1">
            <label className="block text-sm font-medium text-c2-text-bright">
              Usuario o Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-c2-text-dim" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingrese su usuario"
                className="w-full bg-c2-dark border border-c2-border rounded-lg py-2.5 pl-10 pr-3 text-sm text-c2-text-bright placeholder-c2-text-dim focus:outline-none focus:ring-2 focus:ring-c2-accent/40 focus:border-c2-accent transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-c2-text-bright">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-c2-text-dim" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                className="w-full bg-c2-dark border border-c2-border rounded-lg py-2.5 pl-10 pr-10 text-sm text-c2-text-bright placeholder-c2-text-dim focus:outline-none focus:ring-2 focus:ring-c2-accent/40 focus:border-c2-accent transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-c2-text-dim hover:text-c2-text-bright transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-c2-red/10 border border-c2-red/30 rounded-lg px-4 py-2.5 text-sm text-c2-red">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-c2-accent hover:bg-c2-accent-dim text-black font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Validando...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Ingresar al Panel de Control
              </>
            )}
          </button>
        </form>

        <p className="text-center text-c2-text-dim text-xs mt-6">
          Nahomy AI - Sistema de Auditoría Protegido
        </p>
      </div>
    </div>
  )
}
