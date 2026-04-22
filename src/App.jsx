import React, { useState, useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './Admin'
const ADMIN_USERNAME = 'kullayappa'
const ADMIN_PASSWORD = 'kullayappa123@'
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000  // 2 hours
const MAX_ATTEMPTS      = 5
const LOCKOUT_MS        = 10 * 60 * 1000         // 10 minutes
const AUTH_KEY    = 'admin_auth_v2'
const ATTEMPT_KEY = 'admin_attempts'

function saveSession()   { localStorage.setItem(AUTH_KEY, JSON.stringify({ ts: Date.now() })) }
function clearSession()  { localStorage.removeItem(AUTH_KEY) }
function isSessionValid() {
  try {
    const s = JSON.parse(localStorage.getItem(AUTH_KEY))
    return s && Date.now() - s.ts < SESSION_DURATION_MS
  } catch { return false }
}

function getAttemptState() {
  try { return JSON.parse(localStorage.getItem(ATTEMPT_KEY)) || { count: 0, lockedAt: null } }
  catch { return { count: 0, lockedAt: null } }
}
function saveAttemptState(s) { localStorage.setItem(ATTEMPT_KEY, JSON.stringify(s)) }
function clearAttempts()     { localStorage.removeItem(ATTEMPT_KEY) }
function EyeIcon({ open }) {
  return open
    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
}
function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [attempts, setAttempts] = useState(getAttemptState)
  const [tick,     setTick]     = useState(0)   // forces re-render for countdown

  // Countdown ticker
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const lockedRemaining = () => {
    if (!attempts.lockedAt) return 0
    const remaining = LOCKOUT_MS - (Date.now() - attempts.lockedAt)
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0
  }

  const isLocked = lockedRemaining() > 0

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const handleLogin = async () => {
    if (isLocked) return
    setLoading(true)
    setError('')

    // Simulate a tiny network-like delay (prevents instant brute-force timing)
    await new Promise(r => setTimeout(r, 500 + Math.random() * 300))

    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      clearAttempts()
      saveSession()
      onLogin()
    } else {
      const current = getAttemptState()
      const newCount = current.count + 1
      const newState = {
        count: newCount,
        lockedAt: newCount >= MAX_ATTEMPTS ? Date.now() : current.lockedAt,
      }
      saveAttemptState(newState)
      setAttempts(newState)

      const left = MAX_ATTEMPTS - newCount
      if (newCount >= MAX_ATTEMPTS) {
        setError(`Too many failed attempts. Locked for ${formatTime(LOCKOUT_MS / 1000)}.`)
      } else if (left <= 2) {
        setError(`Incorrect credentials. ${left} attempt${left === 1 ? '' : 's'} remaining.`)
      } else {
        setError('Incorrect username or password.')
      }
    }
    setLoading(false)
  }

  // ── Styles ────────────────────────────────────────────────
  const s = {
    wrap: {
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20,
      background: 'linear-gradient(160deg, #060d1a 0%, #0f2040 55%, #0a1628 100%)',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    },
    glow: {
      position: 'absolute', width: 340, height: 340, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
      top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      pointerEvents: 'none',
    },
    card: {
      position: 'relative', zIndex: 1, width: '100%', maxWidth: 420,
      background: 'rgba(255,255,255,0.035)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 20,
      padding: '44px 40px 40px',
      boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
    },
    badge: {
      display: 'inline-flex', alignItems: 'center', gap: 7,
      background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(37,99,235,0.35)',
      borderRadius: 999, padding: '5px 14px',
      fontSize: 11, color: '#93c5fd', fontWeight: 600, letterSpacing: '0.08em',
      textTransform: 'uppercase', marginBottom: 24,
    },
    h1: { fontSize: 26, fontWeight: 800, color: '#f1f5f9', marginBottom: 6, letterSpacing: '-0.03em' },
    sub: { fontSize: 13, color: '#64748b', marginBottom: 32 },
    label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 7, letterSpacing: '0.05em', textTransform: 'uppercase' },
    inputWrap: { position: 'relative', marginBottom: 18 },
    input: {
      width: '100%', padding: '13px 16px', boxSizing: 'border-box',
      borderRadius: 10, fontSize: 14, color: '#f1f5f9',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    inputPwd: {
      width: '100%', padding: '13px 44px 13px 16px', boxSizing: 'border-box',
      borderRadius: 10, fontSize: 14, color: '#f1f5f9',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    eyeBtn: {
      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
      background: 'none', border: 'none', cursor: 'pointer',
      color: '#64748b', padding: 0, display: 'flex',
    },
    btn: {
      width: '100%', padding: '14px', borderRadius: 10, border: 'none',
      background: loading || isLocked ? '#1e3a5f' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      color: loading || isLocked ? '#64748b' : '#fff',
      fontSize: 15, fontWeight: 700, cursor: loading || isLocked ? 'not-allowed' : 'pointer',
      letterSpacing: '-0.01em', marginTop: 8,
      boxShadow: isLocked || loading ? 'none' : '0 4px 20px rgba(37,99,235,0.4)',
      transition: 'all 0.2s',
    },
    errorBox: {
      marginTop: 16, padding: '11px 14px',
      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: 10, color: '#fca5a5', fontSize: 13,
      display: 'flex', alignItems: 'flex-start', gap: 8,
    },
    lockBox: {
      marginTop: 16, padding: '11px 14px',
      background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)',
      borderRadius: 10, color: '#fcd34d', fontSize: 13,
      display: 'flex', alignItems: 'center', gap: 8,
    },
    divider: { borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 28, paddingTop: 16 },
    hint: { fontSize: 11, color: '#334155', textAlign: 'center' },
  }

  const remaining = lockedRemaining()

  return (
    <div style={s.wrap}>
      <div style={{ position: 'relative' }}>
        <div style={s.glow} />
        <div style={s.card}>
          <div style={s.badge}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Secure Admin Access
          </div>

          <h1 style={s.h1}>Admin Portal</h1>
          <p style={s.sub}>Portfolio message dashboard · restricted access</p>

          {/* Username */}
          <div style={s.inputWrap}>
            <label style={s.label}>Username</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => { setUsername(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              disabled={isLocked || loading}
              style={s.input}
              onFocus={e => { e.target.style.borderColor = 'rgba(37,99,235,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div style={s.inputWrap}>
            <label style={s.label}>Password</label>
            <input
              type={showPwd ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              disabled={isLocked || loading}
              style={s.inputPwd}
              onFocus={e => { e.target.style.borderColor = 'rgba(37,99,235,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
              placeholder="Enter password"
            />
            <button style={s.eyeBtn} onClick={() => setShowPwd(v => !v)} tabIndex={-1} type="button">
              <EyeIcon open={showPwd} />
            </button>
          </div>

          {/* Attempt warning bar */}
          {attempts.count > 0 && attempts.count < MAX_ATTEMPTS && !isLocked && (
            <div style={{ marginBottom: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 5 }}>
                <span>Attempts used</span>
                <span style={{ color: attempts.count >= 3 ? '#fca5a5' : '#64748b' }}>
                  {attempts.count} / {MAX_ATTEMPTS}
                </span>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 99 }}>
                <div style={{
                  height: '100%', borderRadius: 99,
                  width: `${(attempts.count / MAX_ATTEMPTS) * 100}%`,
                  background: attempts.count >= 4 ? '#ef4444' : attempts.count >= 3 ? '#f59e0b' : '#2563eb',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>
          )}

          {/* Login button */}
          <button onClick={handleLogin} disabled={isLocked || loading} style={s.btn}
            onMouseEnter={e => { if (!isLocked && !loading) e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {loading ? 'Verifying…' : isLocked ? `🔒 Locked · ${formatTime(remaining)}` : 'Sign In'}
          </button>

          {/* Lockout notice */}
          {isLocked && (
            <div style={s.lockBox}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>Account locked. Try again in <strong>{formatTime(remaining)}</strong></span>
            </div>
          )}

          {/* Error */}
          {error && !isLocked && (
            <div style={s.errorBox}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0,marginTop:1}}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              <span>{error}</span>
            </div>
          )}

          <div style={s.divider}>
            <p style={s.hint}>Session expires after 2 hours of inactivity</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminRoute() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    setAuthed(isSessionValid())
    setChecking(false)

    // Auto-expire: check every minute
    const t = setInterval(() => {
      if (!isSessionValid()) {
        clearSession()
        setAuthed(false)
      }
    }, 60_000)
    return () => clearInterval(t)
  }, [])

  if (checking) return null

  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />
  }

  return <Admin onLogout={() => { clearSession(); setAuthed(false) }} />
}

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminRoute />} />
    </Routes>
  )
}
