import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGraduationCap, FaCode, FaLightbulb, FaMapMarkerAlt } from 'react-icons/fa'

const stats = [
  { value: '2026', label: 'Graduating', icon: <FaGraduationCap size={20} /> },
  { value: 'ECE', label: 'B.Tech Branch', icon: <FaCode size={20} /> },
  { value: 'Full Stack', label: 'Specialization', icon: <FaLightbulb size={20} /> },
  { value: 'AP', label: 'Andhra Pradesh', icon: <FaMapMarkerAlt size={20} /> },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--off-white)' }}>
      <div className="container" ref={ref}>
        <div className="row align-items-center g-5">

          {/* Left — Info */}
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle">Get To Know Me</p>
              <h2 className="section-title">About Me</h2>
              <div className="section-divider" />

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 20 }}>
                I'm <strong style={{ color: 'var(--navy)' }}>Uravakonda Kullayappa</strong>, a B.Tech Electronics & Communication Engineering
                student at a reputed institute in Andhra Pradesh, graduating in 2026.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 20 }}>
                Though my core degree is ECE, I discovered my passion for software development early on —
                specifically in building modern web applications. I've self-learned and practised
                full-stack development with a focus on React, Node.js, Express, and PostgreSQL.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 36 }}>
                I'm a quick learner, problem-solver, and team player eager to contribute to
                real-world projects and grow as a developer. I'm actively looking for opportunities
                where I can make an impact from day one.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="mailto:ukullayappa1@gmail.com" className="btn-primary-custom">Let's Connect</a>
                <a href="https://linkedin.com/in/u-kullayappa-57a326368" target="_blank" rel="noreferrer" className="btn-outline-custom">LinkedIn Profile</a>
              </div>
            </motion.div>
          </div>

          {/* Right — Stats Cards */}
          <div className="col-lg-6">
            <div className="row g-3">
              {stats.map((s, i) => (
                <div className="col-6" key={s.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 * i }}
                    style={{
                      background: 'var(--white)', border: '1.5px solid var(--light-gray)',
                      borderRadius: 6, padding: '28px 22px', textAlign: 'center',
                      boxShadow: '0 4px 16px rgba(10,22,40,0.06)',
                      transition: 'all 0.3s',
                    }}
                    className="card-hover"
                  >
                    <div style={{ color: 'var(--navy-accent)', marginBottom: 10 }}>{s.icon}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--navy)', lineHeight: 1.1, marginBottom: 6 }}>
                      {s.value}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {s.label}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Education card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                background: 'var(--navy)', borderRadius: 6, padding: '24px 28px', marginTop: 14,
                boxShadow: '0 8px 32px rgba(10,22,40,0.18)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <FaGraduationCap size={20} color="var(--gold)" />
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Education</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--white)', fontSize: '1.15rem', marginBottom: 4 }}>
                B.Tech — Electronics & Communication
              </div>
              <div style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                Graduating 2026 · Andhra Pradesh, India
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
