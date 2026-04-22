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
}}> <span>{isError ? '✕' : '✓'}</span> <span>{msg}</span> </div>
)
}

export default function Admin({ onLogout }) {
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
if (onLogout) { onLogout(); return; }
localStorage.removeItem('admin_auth')
localStorage.removeItem('admin_auth_v2')
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 15 }}>
      Admin Panel
    </div>

    <button onClick={logout} style={{
      background: 'transparent', border: '1px solid #e2e8f0',
      borderRadius: 8, color: '#64748b', padding: '6px 14px',
      fontSize: 12, cursor: 'pointer'
    }}>
      Logout
    </button>
  </header>

  <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

    {/* Loading */}
    {loading && [1,2,3].map(i => (
      <div key={i} style={{
        border: '1px solid #e2e8f0',
        borderRadius: 14,
        padding: '22px 24px',
        height: 120,
        marginBottom: 12,
        background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }} />
    ))}

    {/* Messages */}
    {!loading && filtered.map(msg => (
      <div key={msg.id} style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: '20px',
        marginBottom: 10
      }}>
        <strong>{msg.name}</strong>
        <p>{msg.message}</p>
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
