import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaDatabase
} from 'react-icons/fa'
import { SiExpress, SiPostgresql, SiVite, SiBootstrap } from 'react-icons/si'

const skillGroups = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'HTML5', icon: <FaHtml5 size={22} color="#e34f26" />, level: 85 },
      { name: 'CSS3', icon: <FaCss3Alt size={22} color="#1572b6" />, level: 80 },
      { name: 'JavaScript', icon: <FaJs size={22} color="#f7df1e" />, level: 75 },
      { name: 'React', icon: <FaReact size={22} color="#61dafb" />, level: 70 },
      { name: 'Bootstrap', icon: <SiBootstrap size={22} color="#7952b3" />, level: 80 },
      { name: 'Vite', icon: <SiVite size={22} color="#646cff" />, level: 65 },
    ]
  },
  {
    title: 'Backend & Database',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs size={22} color="#339933" />, level: 70 },
      { name: 'Express.js', icon: <SiExpress size={22} color="#000" />, level: 68 },
      { name: 'PostgreSQL', icon: <SiPostgresql size={22} color="#336791" />, level: 65 },
      { name: 'REST APIs', icon: <FaDatabase size={22} color="#2563a8" />, level: 70 },
    ]
  },
  {
    title: 'Tools & Others',
    icon: '🛠️',
    skills: [
      { name: 'Git', icon: <FaGitAlt size={22} color="#f05032" />, level: 72 },
    ]
  }
]

function SkillBar({ name, icon, level, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ marginBottom: 18 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          {icon}
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.92rem', color: 'var(--navy)' }}>{name}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>{level}%</span>
      </div>
      <div style={{ height: 6, background: 'var(--light-gray)', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--navy-accent), var(--gold))', borderRadius: 3 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section-padding" style={{ background: 'var(--white)' }}>
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <p className="section-subtitle">What I Know</p>
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-divider mx-auto" />
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', fontSize: '1rem' }}>
            A self-driven fresher who has built a solid tech stack through consistent practice and project work.
          </p>
        </motion.div>

        <div className="row g-4">
          {skillGroups.map((group, gi) => (
            <div className="col-lg-4 col-md-6" key={group.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: gi * 0.15 }}
                style={{
                  background: 'var(--off-white)', border: '1.5px solid var(--light-gray)',
                  borderRadius: 8, padding: '28px 24px', height: '100%',
                  boxShadow: '0 4px 16px rgba(10,22,40,0.06)'
                }}
              >
                <div style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.4rem' }}>{group.icon}</span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--navy)', margin: 0 }}>{group.title}</h4>
                </div>
                {group.skills.map((s, si) => (
                  <SkillBar key={s.name} {...s} delay={gi * 0.1 + si * 0.08} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Badge cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: 48, textAlign: 'center' }}
        >
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>Also familiar with</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {['Problem Solving', 'Responsive Design', 'RESTful APIs', 'Database Design', 'Version Control', 'Agile Basics'].map(t => (
              <span key={t} className="skill-badge">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
