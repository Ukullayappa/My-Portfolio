import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaLayerGroup, FaServer, FaChevronDown } from 'react-icons/fa'

const projects = [
  {
    title: 'Hub Electro E-Commerce',
    description:
      'An electronics e-commerce platform with product browsing, cart flow, and a deployed split architecture using Vercel for the frontend and Render for the backend.',
    tags: ['React', 'Bootstrap', 'Node.js', 'PostgreSQL'],
    frontendRepo: 'https://github.com/Ukullayappa/electrohub-frontend',
    backendRepo: 'https://github.com/Ukullayappa/electrohub-backend',
    live: 'https://hubelectro.vercel.app/',
    status: 'Live Project',
    number: '01',
  },
  {
    title: 'Live Chat Application',
    description:
      'A real-time chat application with user authentication, instant messaging, online presence indicators, and responsive conversation screens.',
    tags: ['React', 'Node.js', 'Socket.IO', 'Express'],
    frontendRepo: 'https://github.com/Ukullayappa/chatapp-frontend',
    backendRepo: 'https://github.com/Ukullayappa/chatapp-backend',
    live: 'https://chatapp-frontend-seven-eta.vercel.app/',
    status: 'Live Project',
    number: '02',
  },
  {
    title: 'Analytics Dashboard',
    description:
      'A dashboard-style interface with data cards, reporting views, and modern responsive layout patterns built on REST API data.',
    tags: ['React', 'Bootstrap', 'REST API'],
    status: 'In Progress',
    number: '03',
  },
]

const styles = {
  section: {
    padding: '4.5rem 0 3.5rem',
    background: '#ffffff',
  },
  eyebrow: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#6366f1',
    marginBottom: '0.4rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    lineHeight: 1.65,
  },
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    background: '#ffffff',
    transition: 'border-color 0.22s, box-shadow 0.22s, transform 0.22s',
  },
  cardNumber: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#c7d2fe',
    letterSpacing: '0.08em',
    marginBottom: '0.2rem',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '0.4rem',
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: '0.82rem',
    color: '#6b7280',
    lineHeight: 1.65,
  },
  techTag: {
    fontSize: '11px',
    fontWeight: 500,
    padding: '2px 9px',
    borderRadius: '5px',
    background: '#f3f4f6',
    color: '#4b5563',
    border: '1px solid #e5e7eb',
    display: 'inline-block',
    marginRight: '5px',
    marginBottom: '5px',
  },
  divider: {
    borderTop: '1px solid #f3f4f6',
    paddingTop: '0.9rem',
    marginTop: 'auto',
  },
  btnOpen: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: 500,
    padding: '6px 13px',
    borderRadius: '7px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background 0.18s',
  },
  btnCode: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: 500,
    padding: '6px 13px',
    borderRadius: '7px',
    background: '#f9fafb',
    color: '#374151',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'background 0.18s, border-color 0.18s',
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 5px)',
    left: 0,
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    minWidth: '148px',
    zIndex: 100,
    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
    overflow: 'hidden',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '9px 14px',
    fontSize: '13px',
    color: '#374151',
    textDecoration: 'none',
    transition: 'background 0.15s',
    cursor: 'pointer',
  },
  dropdownSep: {
    height: '1px',
    background: '#f3f4f6',
  },
  extLink: {
    width: '27px',
    height: '27px',
    borderRadius: '7px',
    border: '1px solid #e5e7eb',
    background: 'transparent',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontSize: '10px',
    transition: 'border-color 0.18s, color 0.18s, background 0.18s',
  },
  footerCta: {
    marginTop: '2.5rem',
    paddingTop: '2rem',
    borderTop: '1px solid #f3f4f6',
    textAlign: 'center',
  },
  btnGithub: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13.5px',
    fontWeight: 500,
    padding: '10px 22px',
    borderRadius: '9px',
    background: '#111827',
    color: '#ffffff',
    border: 'none',
    textDecoration: 'none',
    transition: 'background 0.18s',
    cursor: 'pointer',
  },
}

function LiveDot() {
  return (
    <span style={{
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#10b981',
      display: 'inline-block',
      animation: 'pulseDot 1.8s ease-in-out infinite',
    }} />
  )
}

function StatusBadge({ status }) {
  const isLive = status === 'Live Project'
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '10.5px',
      fontWeight: 600,
      padding: '3px 9px',
      borderRadius: '20px',
      background: isLive ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
      color: isLive ? '#059669' : '#d97706',
      border: `1px solid ${isLive ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`,
    }}>
      {isLive ? <LiveDot /> : <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706', display: 'inline-block' }} />}
      {status}
    </span>
  )
}

function CodeDropdown({ frontendRepo, backendRepo }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button
        style={styles.btnCode}
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
      >
        <FaGithub size={12} /> Code <FaChevronDown size={8} style={{ opacity: 0.5 }} />
      </button>
      {open && (
        <div style={styles.dropdown} onClick={(e) => e.stopPropagation()}>
          <a
            href={frontendRepo}
            target="_blank"
            rel="noreferrer"
            style={styles.dropdownItem}
            onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <FaLayerGroup size={11} style={{ color: '#6366f1' }} /> Frontend
          </a>
          <div style={styles.dropdownSep} />
          <a
            href={backendRepo}
            target="_blank"
            rel="noreferrer"
            style={styles.dropdownItem}
            onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <FaServer size={11} style={{ color: '#6366f1' }} /> Backend
          </a>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ item, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Col lg={4} md={6} className="d-flex">
      <motion.div
        className="w-100"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: index * 0.1 }}
        style={{ height: '100%' }}
        onClick={() => {}}
      >
        <div
          style={{
            ...styles.card,
            height: '100%',
            boxShadow: hovered ? '0 8px 28px rgba(99,102,241,0.10)' : 'none',
            borderColor: hovered ? '#c7d2fe' : '#e5e7eb',
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={{ padding: '1.35rem 1.4rem', display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <StatusBadge status={item.status} />
              {item.live && (
                <a
                  href={item.live}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.extLink}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#a5b4fc'; e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.background = '#eef2ff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'transparent' }}
                >
                  <FaExternalLinkAlt size={10} />
                </a>
              )}
            </div>

            {/* Number */}
            <p style={styles.cardNumber}>{item.number}</p>

            {/* Title */}
            <h5 style={styles.cardTitle}>{item.title}</h5>

            {/* Description */}
            <p style={styles.cardDesc}>{item.description}</p>

            {/* Tags */}
            <div style={{ margin: '0.75rem 0' }}>
              {item.tags.map(tag => (
                <span key={tag} style={styles.techTag}>{tag}</span>
              ))}
            </div>

            {/* Actions */}
            <div style={styles.divider}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {item.live ? (
                  <>
                    <a
                      href={item.live}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.btnOpen}
                      onMouseEnter={e => e.currentTarget.style.background = '#4f46e5'}
                      onMouseLeave={e => e.currentTarget.style.background = '#6366f1'}
                    >
                      <FaArrowRight size={10} /> Open
                    </a>
                    <CodeDropdown frontendRepo={item.frontendRepo} backendRepo={item.backendRepo} />
                  </>
                ) : (
                  <span style={{ fontSize: '12px', color: '#9ca3af', fontStyle: 'italic' }}>Coming soon</span>
                )}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </Col>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <>
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <section id="projects" style={styles.section}>
        <Container ref={ref}>

          {/* Header */}
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <p style={styles.eyebrow}>Portfolio</p>
            <h2 style={styles.title}>Projects</h2>
            <p style={{ ...styles.subtitle, maxWidth: '440px', margin: '0 auto' }}>
              A showcase of my full-stack development work and learning journey.
            </p>
          </motion.div>

          {/* Cards */}
          <Row className="g-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                item={project}
                index={index}
                inView={inView}
              />
            ))}
          </Row>

          {/* Footer */}
          <div style={styles.footerCta}>
            <a
              href="https://github.com/Ukullayappa"
              target="_blank"
              rel="noreferrer"
              style={styles.btnGithub}
              onMouseEnter={e => e.currentTarget.style.background = '#1f2937'}
              onMouseLeave={e => e.currentTarget.style.background = '#111827'}
            >
              <FaGithub size={15} /> View More on GitHub
            </a>
          </div>

        </Container>
      </section>
    </>
  )
}
