import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaExternalLinkAlt, FaPlus, FaCode } from 'react-icons/fa'

// ────────────────────────────────────────────────────────────
// 👇 ADD YOUR PROJECTS HERE when ready
// Just copy the template object and fill in your details
// ────────────────────────────────────────────────────────────
const projects = [
  // TEMPLATE — Uncomment and fill in when you have a project:
  // {
  //   title: 'Your Project Name',
  //   description: 'Short description of what the project does and what problem it solves.',
  //   tags: ['React', 'Node.js', 'PostgreSQL'],
  //   github: 'https://github.com/yourusername/project',
  //   live: 'https://your-live-demo.com',       // clicking the card opens this
  //   emoji: '🚀',                              // choose an emoji icon
  //   color: '#2563a8',                          // accent color for the card header
  // },
]

const comingSoon = [
  { emoji: '🌐', title: 'Full Stack Web App', desc: 'A complete CRUD application with React frontend and Node.js + PostgreSQL backend.', tags: ['React', 'Node.js', 'PostgreSQL', 'Express'], github: 'https://github.com/Ukullayappa' },
  { emoji: '📊', title: 'Dashboard Project', desc: 'An analytics dashboard with data visualization and user authentication.', tags: ['React', 'Bootstrap', 'REST API'], github: 'https://github.com/Ukullayappa' },
  { emoji: '🛒', title: 'E-Commerce App', desc: 'A full-featured online store with cart, auth, and payment integration.', tags: ['React', 'Node.js', 'PostgreSQL'], github: 'https://github.com/Ukullayappa' },
]

/* ── Styles shared across both card types ── */
const cardStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--white)',
  border: '1px solid var(--light-gray)',
  boxShadow: '0 4px 20px rgba(10,22,40,0.07)',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  cursor: 'pointer',
}

function ProjectCard({ project, index, inView }) {
  const openLive = () => {
    if (project.live) window.open(project.live, '_blank', 'noreferrer')
  }
  const openGithub = (e) => {
    e.stopPropagation()           // don't trigger card click
    if (project.github) window.open(project.github, '_blank', 'noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="col-lg-4 col-md-6"
    >
      <div
        style={cardStyle}
        onClick={openLive}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px)'
          e.currentTarget.style.boxShadow = '0 12px 36px rgba(10,22,40,0.14)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(10,22,40,0.07)'
        }}
        title={project.live ? 'Click to open live demo' : ''}
      >
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, var(--navy) 0%, ${project.color || 'var(--navy-light)'} 100%)`,
          padding: '28px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 110,
        }}>
          <span style={{ fontSize: '3rem' }}>{project.emoji}</span>
          {project.live && (
            <div style={{
              position: 'absolute', top: 12, right: 12,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 100, padding: '4px 10px',
              display: 'flex', alignItems: 'center', gap: 5,
              color: '#fff', fontSize: '0.7rem', fontWeight: 600,
              backdropFilter: 'blur(4px)',
            }}>
              <FaExternalLinkAlt size={9} /> Live
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '20px 20px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>
            {project.title}
          </h5>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7, flex: 1, marginBottom: 14 }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
          </div>
        </div>

        {/* Footer — GitHub button */}
        <div style={{
          borderTop: '1px solid var(--light-gray)',
          padding: '12px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {project.live ? 'Click card to open site' : 'No live demo yet'}
          </span>
          <button
            onClick={openGithub}
            title="Open GitHub repository"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--navy)',
              color: '#fff',
              border: 'none', borderRadius: 8,
              padding: '7px 14px',
              fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--navy-accent)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
          >
            <FaGithub size={14} /> GitHub
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function ComingSoonCard({ item, index, inView }) {
  const openGithub = (e) => {
    e.stopPropagation()
    if (item.github) window.open(item.github, '_blank', 'noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="col-lg-4 col-md-6"
    >
      <div style={{ ...cardStyle, cursor: 'default', opacity: 0.88 }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2a4a6e 100%)',
          padding: '28px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 110, position: 'relative',
        }}>
          <span style={{ fontSize: '2.8rem' }}>{item.emoji}</span>
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <span className="coming-soon-badge">Coming Soon</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 20px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>
            {item.title}
          </h5>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7, flex: 1, marginBottom: 14 }}>
            {item.desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {item.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
          </div>
        </div>

        {/* Footer — GitHub button + In Development label */}
        <div style={{
          borderTop: '1px solid var(--light-gray)',
          padding: '12px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-body)', fontSize: '0.78rem',
            color: 'var(--text-muted)', fontWeight: 600,
          }}>
            <FaCode size={12} /> In Development
          </span>
          <button
            onClick={openGithub}
            title="Open GitHub profile"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--navy)',
              color: '#fff',
              border: 'none', borderRadius: 8,
              padding: '7px 14px',
              fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--navy-accent)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
          >
            <FaGithub size={14} /> GitHub
          </button>
        </div>

      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--off-white)' }}>
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <p className="section-subtitle">My Work</p>
          <h2 className="section-title">Projects</h2>
          <div className="section-divider mx-auto" />
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', fontSize: '1rem' }}>
            Projects are currently in development. Click any card to open the live site,
            or click the <strong>GitHub</strong> button to view the repository.
          </p>
        </motion.div>

        <div className="row g-4">
          {/* Real projects (will show when added) */}
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} inView={inView} />
          ))}

          {/* Coming soon placeholders */}
          {comingSoon.map((item, i) => (
            <ComingSoonCard key={item.title} item={item} index={projects.length + i} inView={inView} />
          ))}
        </div>

        {/* Add project CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'var(--white)', border: '2px dashed var(--light-gray)',
            borderRadius: 8, padding: '20px 32px',
            color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.92rem'
          }}>
            <FaPlus color="var(--navy-accent)" />
            <span>More projects coming soon — check my <a href="https://github.com/Ukullayappa" target="_blank" rel="noreferrer" style={{ color: 'var(--navy-accent)', fontWeight: 700 }}>GitHub</a></span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}