import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['home', 'about', 'skills', 'projects', 'contact']

  const scrollTo = (id) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid #e8ecf1' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(10,22,40,0.08)' : 'none',
        transition: 'all 0.35s ease',
        padding: '0 0',
      }}
    >
      <div className="container d-flex align-items-center justify-content-between" style={{ height: 68 }}>
        {/* Logo */}
        <div
          onClick={() => scrollTo('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div style={{
            width: 38, height: 38, background: 'var(--navy)',
            borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontWeight: 900, fontSize: '1.1rem' }}>UK</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)', letterSpacing: '-0.02em' }}>
            Kullayappa
          </span>
        </div>

        {/* Links */}
        <div className="d-none d-md-flex align-items-center" style={{ gap: 36 }}>
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`nav-link-custom ${active === link ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </button>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:ukullayappa1@gmail.com"
          className="btn-primary-custom d-none d-md-inline-flex"
          style={{ height: 38, lineHeight: '38px', fontSize: '0.85rem', padding: '0 20px' }}
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  )
}
