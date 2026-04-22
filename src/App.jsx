import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

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
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000
const IDLE_TIMEOUT_MS = 20 * 60 * 1000
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 10 * 60 * 1000
const AUTH_KEY = 'admin_auth_v3'
const ATTEMPT_KEY = 'admin_attempts_v2'

function getDeviceSignature() {
  return `${navigator.userAgent}|${navigator.language}|${window.screen.width}x${window.screen.height}`
}

function saveSession(username) {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({
      username,
      issuedAt: Date.now(),
      lastActiveAt: Date.now(),
      signature: getDeviceSignature(),
    })
  )
}

function clearSession() {
  localStorage.removeItem(AUTH_KEY)
}

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY))
  } catch {
    return null
  }
}

function touchSession() {
  const session = readSession()
  if (!session) return
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({
      ...session,
      lastActiveAt: Date.now(),
    })
  )
}

function isSessionValid() {
  const session = readSession()
  if (!session) return false

  const now = Date.now()
  const issuedFresh = now - session.issuedAt < SESSION_DURATION_MS
  const activeFresh = now - session.lastActiveAt < IDLE_TIMEOUT_MS
  const sameDevice = session.signature === getDeviceSignature()
  const sameUser = session.username === ADMIN_USERNAME

  return issuedFresh && activeFresh && sameDevice && sameUser
}

function getAttemptState() {
  try {
    return JSON.parse(localStorage.getItem(ATTEMPT_KEY)) || { count: 0, lockedAt: null }
  } catch {
    return { count: 0, lockedAt: null }
  }
}

function saveAttemptState(state) {
  localStorage.setItem(ATTEMPT_KEY, JSON.stringify(state))
}

function clearAttempts() {
  localStorage.removeItem(ATTEMPT_KEY)
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(getAttemptState)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTick((value) => value + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const lockedRemaining = () => {
    if (!attempts.lockedAt) return 0
    const remaining = LOCKOUT_MS - (Date.now() - attempts.lockedAt)
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0
  }

  const isLocked = lockedRemaining() > 0

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${String(secs).padStart(2, '0')}`
  }

  const handleLogin = async (event) => {
    event?.preventDefault()
    if (isLocked) return

    setLoading(true)
    setError('')

    await new Promise((resolve) => setTimeout(resolve, 550 + Math.random() * 350))

    const validUser = username.trim().toLowerCase() === ADMIN_USERNAME
    const validPassword = password === ADMIN_PASSWORD

    if (validUser && validPassword) {
      clearAttempts()
      saveSession(ADMIN_USERNAME)
      onLogin()
      return
    }

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
      setError(`Too many failed attempts. Access locked for ${formatTime(LOCKOUT_MS / 1000)}.`)
    } else if (left <= 2) {
      setError(`Invalid admin credentials. ${left} attempt${left === 1 ? '' : 's'} remaining.`)
    } else {
      setError('Invalid admin credentials.')
    }

    setLoading(false)
  }

  const remaining = lockedRemaining()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #06101d 0%, #0b1e38 48%, #10284a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(201,168,76,0.16), transparent 24%)',
          pointerEvents: 'none',
        }}
      />

      <Container style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Row className="w-100 align-items-center g-4">
          <Col lg={6}>
            <div style={{ color: '#f8fafc', maxWidth: 540 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 22,
                }}
              >
                Protected Admin Access
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                  lineHeight: 1.08,
                  marginBottom: 16,
                }}
              >
                Professional admin access for your portfolio dashboard
              </h1>

              <p
                style={{
                  color: 'rgba(241,245,249,0.76)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  marginBottom: 28,
                  maxWidth: 500,
                }}
              >
                Review contact submissions, manage unread messages, and keep your portfolio inbox organized through a cleaner secured panel.
              </p>

              <div style={{ display: 'grid', gap: 12 }}>
                {[
                  'Session expires automatically after 2 hours',
                  'Idle timeout protects access after 20 minutes',
                  'Failed login attempts trigger lockout protection',
                  'Session is tied to the current browser/device signature',
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      color: '#dbeafe',
                      fontSize: '0.96rem',
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #60a5fa, #e8c96a)',
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <Card
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 28,
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
                color: '#f8fafc',
              }}
            >
              <Card.Body style={{ padding: '36px 34px' }}>
                <div style={{ marginBottom: 26 }}>
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(37,99,235,0.28), rgba(201,168,76,0.22))',
                      border: '1px solid rgba(255,255,255,0.16)',
                      marginBottom: 16,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="10" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>

                  <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Admin Login</h2>
                  <p style={{ margin: 0, color: 'rgba(226,232,240,0.7)', lineHeight: 1.7 }}>
                    Enter your admin credentials to access message management and portfolio inquiries.
                  </p>
                </div>

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#cbd5e1' }}>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      autoComplete="username"
                      disabled={isLocked || loading}
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value)
                        setError('')
                      }}
                      placeholder="Enter admin username"
                      style={{
                        height: 50,
                        borderRadius: 14,
                        border: '1px solid rgba(255,255,255,0.14)',
                        background: 'rgba(255,255,255,0.08)',
                        color: '#f8fafc',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#cbd5e1' }}>
                      Password
                    </Form.Label>
                    <div style={{ position: 'relative' }}>
                      <Form.Control
                        type={showPwd ? 'text' : 'password'}
                        autoComplete="current-password"
                        disabled={isLocked || loading}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          setError('')
                        }}
                        placeholder="Enter admin password"
                        style={{
                          height: 50,
                          borderRadius: 14,
                          border: '1px solid rgba(255,255,255,0.14)',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#f8fafc',
                          paddingRight: 48,
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((value) => !value)}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: 14,
                          transform: 'translateY(-50%)',
                          border: 'none',
                          background: 'transparent',
                          color: '#94a3b8',
                          cursor: 'pointer',
                        }}
                      >
                        <EyeIcon open={showPwd} />
                      </button>
                    </div>
                  </Form.Group>

                  {attempts.count > 0 && attempts.count < MAX_ATTEMPTS && !isLocked && (
                    <div style={{ marginBottom: 18 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>
                        <span>Failed attempts</span>
                        <span>{attempts.count} / {MAX_ATTEMPTS}</span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999 }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${(attempts.count / MAX_ATTEMPTS) * 100}%`,
                            borderRadius: 999,
                            background: attempts.count >= 4 ? '#ef4444' : attempts.count >= 3 ? '#f59e0b' : '#60a5fa',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLocked || loading}
                    style={{
                      width: '100%',
                      height: 52,
                      borderRadius: 14,
                      border: 'none',
                      background: loading || isLocked ? '#274472' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                      fontWeight: 700,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {loading ? 'Verifying access...' : isLocked ? `Locked - ${formatTime(remaining)}` : 'Sign In to Admin Panel'}
                  </Button>
                </Form>

                {isLocked && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: '12px 14px',
                      borderRadius: 14,
                      background: 'rgba(251,191,36,0.12)',
                      border: '1px solid rgba(251,191,36,0.24)',
                      color: '#fde68a',
                      fontSize: 14,
                    }}
                  >
                    Account temporarily locked. Try again in <strong>{formatTime(remaining)}</strong>.
                  </div>
                )}

                {error && !isLocked && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: '12px 14px',
                      borderRadius: 14,
                      background: 'rgba(239,68,68,0.12)',
                      border: '1px solid rgba(239,68,68,0.24)',
                      color: '#fecaca',
                      fontSize: 14,
                    }}
                  >
                    {error}
                  </div>
                )}

                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    color: '#94a3b8',
                    fontSize: 12,
                    lineHeight: 1.7,
                  }}
                >
                  Security note: this is still a client-side admin gate. For true production-grade security, move credential verification to a protected backend.
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

function AdminRoute() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    setAuthed(isSessionValid())
    setChecking(false)

    const validate = () => {
      if (!isSessionValid()) {
        clearSession()
        setAuthed(false)
      }
    }

    const touch = () => {
      if (isSessionValid()) {
        touchSession()
      }
    }

    const interval = setInterval(validate, 60_000)
    window.addEventListener('mousemove', touch)
    window.addEventListener('keydown', touch)
    window.addEventListener('click', touch)

    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', touch)
      window.removeEventListener('keydown', touch)
      window.removeEventListener('click', touch)
    }
  }, [])

  if (checking) return null

  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />
  }

  return <Admin onLogout={() => {
    clearSession()
    setAuthed(false)
  }} />
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
