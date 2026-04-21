import React, { useEffect, useState } from 'react'

const API = 'https://portfolio-backend-p9b8.onrender.com/api/messages'

function escHtml(str) {
  return String(str ?? '')
}

function Toast({ msg, visible, isError }) {
  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28,
      background: isError ? '#fff1f2' : '#f0fdf4',
      border: `1px solid ${isError ? '#fca5a5' : '#86efac'}`,
      borderRadius: 10, padding: '11px 20px',
      fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'all 0.25s', zIndex: 999, pointerEvents: 'none',
      color: isError ? '#dc2626' : '#16a34a', fontFamily: 'inherit'
    }}>
      <span>{isError ? '✕' : '✓'}</span>
      <span>{msg}</span>
    </div>
  )
}

export default function Admin() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [toast, setToast] = useState({ msg: '', visible: false, isError: false })

  useEffect(() => { fetchMessages() }, [])

  const showToast = (msg, isError = false) => {
    setToast({ msg, visible: true, isError })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2800)
  }

  const fetchMessages = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()
      setMessages(data)
    } catch {
      showToast('Failed to load messages', true)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await fetch(`${API}/${id}/read`, { method: 'PUT' })
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m))
      showToast('Marked as read')
    } catch {
      showToast('Failed to update', true)
    }
  }

  const deleteMessage = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' })
      setMessages(prev => prev.filter(m => m.id !== id))
      showToast('Message deleted')
    } catch {
      showToast('Failed to delete', true)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_auth')
    window.location.reload()
  }

  const filtered = messages.filter(m =>
    filter === 'all' ? true : filter === 'unread' ? !m.is_read : m.is_read
  )
  const unreadCount = messages.filter(m => !m.is_read).length

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>

      {/* Header */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0',
        padding: '0 36px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 15, letterSpacing: '-0.03em' }}>
          <div style={{
            width: 28, height: 28, background: '#2563eb', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          Admin Panel
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {[
            { label: 'Total', val: messages.length },
            { label: 'Unread', val: unreadCount, highlight: true }
          ].map(s => (
            <div key={s.label} style={{
              background: s.highlight && unreadCount > 0 ? '#eff6ff' : '#f1f5f9',
              border: `1px solid ${s.highlight && unreadCount > 0 ? '#bfdbfe' : '#e2e8f0'}`,
              borderRadius: 999, padding: '4px 14px',
              fontSize: 12, fontFamily: 'monospace',
              color: s.highlight && unreadCount > 0 ? '#2563eb' : '#64748b',
              display: 'flex', gap: 6, alignItems: 'center'
            }}>
              {s.label}: <strong>{s.val}</strong>
            </div>
          ))}

          <button onClick={logout} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'transparent', border: '1px solid #e2e8f0',
            borderRadius: 8, color: '#64748b', padding: '6px 14px',
            fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.color = '#dc2626' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', margin: 0 }}>Messages</h1>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 3 }}>
              {messages.length} total · {unreadCount} unread
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['all', 'unread', 'read'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                background: filter === f ? '#2563eb' : '#fff',
                border: `1px solid ${filter === f ? '#2563eb' : '#e2e8f0'}`,
                borderRadius: 7, color: filter === f ? '#fff' : '#64748b',
                padding: '6px 16px', fontSize: 12, fontFamily: 'monospace',
                cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s'
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Loading skeletons */}
        {loading && [1, 2, 3].map(i => (
          <div key={i} style={{
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14,
            padding: '22px 24px', height: 120, marginBottom: 12,
            background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }} />
        ))}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <strong style={{ color: '#64748b', display: 'block', marginBottom: 6 }}>No messages</strong>
            <span style={{ fontSize: 13 }}>Nothing here for this filter.</span>
          </div>
        )}

        {/* Message cards */}
        {!loading && filtered.map((msg, i) => (
          <div key={msg.id} style={{
            background: '#fff',
            border: `1px solid ${msg.is_read ? '#e2e8f0' : '#bfdbfe'}`,
            borderLeft: `3px solid ${msg.is_read ? '#e2e8f0' : '#2563eb'}`,
            borderRadius: 12, padding: '20px 22px',
            marginBottom: 12,
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 16,
            alignItems: 'start',
            opacity: msg.is_read ? 0.75 : 1,
            transition: 'box-shadow 0.15s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.09)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Name + badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 999,
                  background: '#eff6ff', color: '#2563eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 13, flexShrink: 0
                }}>
                  {escHtml(msg.name)?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{escHtml(msg.name)}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{escHtml(msg.email)}</div>
                </div>
                <span style={{
                  marginLeft: 4,
                  background: msg.is_read ? '#f1f5f9' : '#eff6ff',
                  border: `1px solid ${msg.is_read ? '#e2e8f0' : '#bfdbfe'}`,
                  color: msg.is_read ? '#94a3b8' : '#2563eb',
                  borderRadius: 999, padding: '2px 10px', fontSize: 11,
                  fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                  {msg.is_read ? 'Read' : 'New'}
                </span>
              </div>

              {/* Subject */}
              <div style={{
                fontSize: 13, fontWeight: 600, color: '#334155',
                background: '#f8fafc', borderRadius: 6, padding: '5px 10px',
                display: 'inline-block'
              }}>
                {escHtml(msg.subject || '(no subject)')}
              </div>

              {/* Body */}
              <div style={{
                fontSize: 13, color: '#64748b', lineHeight: 1.65,
                borderTop: '1px solid #f1f5f9', paddingTop: 10
              }}>
                {escHtml(msg.message)}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 120 }}>
              {!msg.is_read && (
                <button onClick={() => markAsRead(msg.id)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8,
                  background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.15s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.color = '#2563eb' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Mark Read
                </button>
              )}
              <button onClick={() => deleteMessage(msg.id)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                background: '#fff1f2', border: '1px solid #fecaca', color: '#dc2626',
                fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.15s'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff1f2'; e.currentTarget.style.color = '#dc2626' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Toast msg={toast.msg} visible={toast.visible} isError={toast.isError} />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  )
}