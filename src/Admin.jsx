import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { FaCheckCircle, FaEnvelopeOpenText, FaFilter, FaInbox, FaPowerOff, FaSearch, FaSyncAlt, FaTrashAlt } from 'react-icons/fa'

const API = 'https://portfolio-backend-p9b8.onrender.com/api/messages'

function Toast({ msg, visible, isError }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        background: isError ? '#fff1f2' : '#f0fdf4',
        border: `1px solid ${isError ? '#fca5a5' : '#86efac'}`,
        borderRadius: 14,
        padding: '12px 18px',
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 0.25s ease',
        zIndex: 999,
        pointerEvents: 'none',
        color: isError ? '#dc2626' : '#166534',
        boxShadow: '0 16px 36px rgba(10,22,40,0.12)',
      }}
    >
      <span>{isError ? 'Error' : 'Done'}</span>
      <span>{msg}</span>
    </div>
  )
}

function formatDate(value) {
  if (!value) return 'Recently received'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Recently received'
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export default function Admin({ onLogout }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState({ msg: '', visible: false, isError: false })

  useEffect(() => {
    fetchMessages()
  }, [])

  const showToast = (msg, isError = false) => {
    setToast({ msg, visible: true, isError })
    setTimeout(() => setToast((current) => ({ ...current, visible: false })), 2800)
  }

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch(API)
      const data = await res.json()
      setMessages(Array.isArray(data) ? data : [])
    } catch {
      showToast('Failed to load messages', true)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await fetch(`${API}/${id}/read`, { method: 'PUT' })
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)))
      showToast('Message marked as read')
    } catch {
      showToast('Failed to update message', true)
    }
  }

  const deleteMessage = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' })
      setMessages((prev) => prev.filter((m) => m.id !== id))
      showToast('Message deleted')
    } catch {
      showToast('Failed to delete message', true)
    }
  }

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesFilter =
        filter === 'all' ? true : filter === 'unread' ? !message.is_read : !!message.is_read

      const haystack = `${message.name || ''} ${message.email || ''} ${message.subject || ''} ${message.message || ''}`.toLowerCase()
      const matchesQuery = haystack.includes(query.trim().toLowerCase())

      return matchesFilter && matchesQuery
    })
  }, [messages, filter, query])

  const unreadCount = messages.filter((m) => !m.is_read).length
  const readCount = messages.length - unreadCount

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fb', color: '#0f172a' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Container style={{ paddingTop: 18, paddingBottom: 18 }}>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: 6 }}>
                Portfolio Dashboard
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', margin: 0, color: 'var(--navy)' }}>
                Admin Panel
              </h1>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <Button variant="light" onClick={fetchMessages} style={{ borderRadius: 12, border: '1px solid #dbe3ef' }}>
                <FaSyncAlt size={13} style={{ marginRight: 8 }} />
                Refresh
              </Button>
              <Button variant="dark" onClick={onLogout} style={{ borderRadius: 12, background: 'var(--navy)', borderColor: 'var(--navy)' }}>
                <FaPowerOff size={13} style={{ marginRight: 8 }} />
                Logout
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container style={{ paddingTop: 28, paddingBottom: 40 }}>
        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card className="border-0 h-100" style={{ borderRadius: 22, boxShadow: '0 16px 36px rgba(10,22,40,0.08)' }}>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Total Messages</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)' }}>{messages.length}</div>
                  </div>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(37,99,235,0.1)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaInbox size={20} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 h-100" style={{ borderRadius: 22, boxShadow: '0 16px 36px rgba(10,22,40,0.08)' }}>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Unread</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#b45309' }}>{unreadCount}</div>
                  </div>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(245,158,11,0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaEnvelopeOpenText size={20} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 h-100" style={{ borderRadius: 22, boxShadow: '0 16px 36px rgba(10,22,40,0.08)' }}>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Reviewed</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#15803d' }}>{readCount}</div>
                  </div>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(21,128,61,0.12)', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaCheckCircle size={20} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="border-0 mb-4" style={{ borderRadius: 24, boxShadow: '0 18px 40px rgba(10,22,40,0.08)' }}>
          <Card.Body style={{ padding: 22 }}>
            <Row className="g-3 align-items-center">
              <Col lg={6}>
                <div style={{ position: 'relative' }}>
                  <FaSearch size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <Form.Control
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, email, subject, or message"
                    style={{ height: 48, borderRadius: 14, paddingLeft: 40, borderColor: '#d9e2ec' }}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div style={{ position: 'relative' }}>
                  <FaFilter size={13} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b', zIndex: 1 }} />
                  <Form.Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ height: 48, borderRadius: 14, paddingLeft: 40, borderColor: '#d9e2ec' }}
                  >
                    <option value="all">All messages</option>
                    <option value="unread">Unread only</option>
                    <option value="read">Read only</option>
                  </Form.Select>
                </div>
              </Col>
              <Col lg={3}>
                <div className="d-flex justify-content-lg-end">
                  <Badge bg="" style={{ background: 'rgba(37,99,235,0.08)', color: '#2563eb', padding: '12px 14px', borderRadius: 14, fontSize: 13, fontWeight: 700 }}>
                    Showing {filteredMessages.length} result{filteredMessages.length === 1 ? '' : 's'}
                  </Badge>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {loading ? (
          <div style={{ display: 'grid', gap: 14 }}>
            {[1, 2, 3].map((item) => (
              <Card key={item} className="border-0" style={{ borderRadius: 22, overflow: 'hidden' }}>
                <div
                  style={{
                    height: 130,
                    background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.4s infinite',
                  }}
                />
              </Card>
            ))}
          </div>
        ) : filteredMessages.length === 0 ? (
          <Card className="border-0" style={{ borderRadius: 24, boxShadow: '0 18px 40px rgba(10,22,40,0.08)' }}>
            <Card.Body style={{ padding: 36, textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 10 }}>No messages found</h3>
              <p style={{ color: '#64748b', margin: 0 }}>Try changing the search text or filter to view more inquiries.</p>
            </Card.Body>
          </Card>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {filteredMessages.map((msg) => (
              <Card key={msg.id} className="border-0" style={{ borderRadius: 24, boxShadow: '0 18px 40px rgba(10,22,40,0.08)' }}>
                <Card.Body style={{ padding: 24 }}>
                  <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-3">
                    <div>
                      <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                        <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', margin: 0 }}>{msg.name || 'Unknown sender'}</h3>
                        <Badge bg="" style={{ background: msg.is_read ? 'rgba(21,128,61,0.1)' : 'rgba(245,158,11,0.12)', color: msg.is_read ? '#15803d' : '#b45309', borderRadius: 999, padding: '8px 12px', fontWeight: 700 }}>
                          {msg.is_read ? 'Read' : 'Unread'}
                        </Badge>
                      </div>
                      <div style={{ color: '#64748b', fontSize: 14 }}>
                        {msg.email || 'No email provided'} {msg.subject ? `• ${msg.subject}` : ''}
                      </div>
                    </div>

                    <div style={{ color: '#64748b', fontSize: 13, fontWeight: 600 }}>
                      {formatDate(msg.created_at || msg.createdAt)}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: 18,
                      borderRadius: 18,
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: '#1e293b',
                      lineHeight: 1.8,
                      marginBottom: 18,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {msg.message || 'No message content available.'}
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    {!msg.is_read && (
                      <Button variant="success" onClick={() => markAsRead(msg.id)} style={{ borderRadius: 12 }}>
                        <FaCheckCircle size={13} style={{ marginRight: 8 }} />
                        Mark as Read
                      </Button>
                    )}
                    <Button variant="outline-danger" onClick={() => deleteMessage(msg.id)} style={{ borderRadius: 12 }}>
                      <FaTrashAlt size={13} style={{ marginRight: 8 }} />
                      Delete
                    </Button>
                    {msg.email && (
                      <Button as="a" href={`mailto:${msg.email}?subject=${encodeURIComponent(msg.subject || 'Reply from portfolio')}`} variant="outline-primary" style={{ borderRadius: 12 }}>
                        Reply via Email
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>

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
