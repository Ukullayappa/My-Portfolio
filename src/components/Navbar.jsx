import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Container, Nav, Navbar as BootstrapNavbar, Offcanvas } from 'react-bootstrap'
import { FaDownload, FaEnvelope, FaLinkedinIn } from 'react-icons/fa'

const links = ['home', 'about', 'skills', 'projects', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateNavbar = () => {
      setScrolled(window.scrollY > 36)

      const currentSection = [...links].reverse().find((id) => {
        const section = document.getElementById(id)
        if (!section) return false

        const top = section.offsetTop - 140
        const bottom = top + section.offsetHeight
        return window.scrollY >= top && window.scrollY < bottom
      })

      if (currentSection) {
        setActive(currentSection)
      }
    }

    updateNavbar()
    window.addEventListener('scroll', updateNavbar)
    return () => window.removeEventListener('scroll', updateNavbar)
  }, [])

  const scrollTo = (id) => {
    setActive(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <BootstrapNavbar
        expand="lg"
        expanded={menuOpen}
        className="py-0"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(18px)',
          borderBottom: scrolled ? '1px solid rgba(10,22,40,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 14px 40px rgba(10,22,40,0.08)' : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        <Container style={{ minHeight: 82 }}>
          <BootstrapNavbar.Brand
            as="button"
            type="button"
            onClick={() => scrollTo('home')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              textAlign: 'left',
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 24px rgba(10,22,40,0.16)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--gold)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  letterSpacing: '0.06em',
                }}
              >
                UK
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  color: 'var(--navy)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Uravakonda Kullayappa
              </span>
              <span
                className="d-none d-sm-inline"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginTop: 3,
                }}
              >
                Full Stack Developer
              </span>
            </div>
          </BootstrapNavbar.Brand>

          <Nav
            className="d-none d-lg-flex align-items-center mx-auto"
            style={{
              gap: 30,
              padding: '10px 22px',
              borderRadius: 999,
              background: 'rgba(247,248,250,0.9)',
              border: '1px solid rgba(10,22,40,0.06)',
            }}
          >
            {links.map((link) => (
              <Nav.Link
                as="button"
                key={link}
                onClick={() => scrollTo(link)}
                className={`nav-link-custom ${active === link ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  textTransform: 'capitalize',
                }}
              >
                {link}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-none d-md-flex align-items-center ms-auto" style={{ gap: 12 }}>
            <a
              href="https://linkedin.com/in/u-kullayappa-57a326368"
              target="_blank"
              rel="noreferrer"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'var(--navy)',
                border: '1px solid rgba(10,22,40,0.12)',
                background: 'rgba(255,255,255,0.8)',
                transition: 'all 0.25s ease',
              }}
              aria-label="LinkedIn profile"
            >
              <FaLinkedinIn size={15} />
            </a>

            <a
              href="mailto:ukullayappa1@gmail.com"
              className="btn-primary-custom"
              style={{
                height: 42,
                padding: '0 18px',
                fontSize: '0.84rem',
                borderRadius: 999,
              }}
            >
              <FaEnvelope size={13} />
              Contact Me
            </a>
          </div>

          <BootstrapNavbar.Toggle
            aria-controls="portfolio-navbar-drawer"
            onClick={() => setMenuOpen((open) => !open)}
            className="d-lg-none"
            style={{
              border: '1px solid rgba(10,22,40,0.12)',
              borderRadius: 14,
              padding: '10px 12px',
              boxShadow: 'none',
            }}
          />
        </Container>
      </BootstrapNavbar>

      <Offcanvas
        id="portfolio-navbar-drawer"
        show={menuOpen}
        onHide={() => setMenuOpen(false)}
        placement="end"
        style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Offcanvas.Header closeButton style={{ padding: '20px 20px 8px' }}>
          <Offcanvas.Title
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--navy)',
              fontWeight: 700,
            }}
          >
            Navigation
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body style={{ padding: '8px 20px 24px' }}>
          <Nav className="flex-column" style={{ gap: 8 }}>
            {links.map((link) => (
              <Nav.Link
                as="button"
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  background: active === link ? 'rgba(37,99,168,0.08)' : 'transparent',
                  border: 'none',
                  borderRadius: 14,
                  padding: '12px 14px',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: active === link ? 'var(--navy-accent)' : 'var(--navy)',
                  textTransform: 'capitalize',
                }}
              >
                {link}
              </Nav.Link>
            ))}
          </Nav>

          <div
            style={{
              marginTop: 18,
              paddingTop: 18,
              borderTop: '1px solid var(--light-gray)',
              display: 'grid',
              gap: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}
              >
                Available for
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: 'var(--navy)',
                }}
              >
                Full-stack roles, internships, and freelance projects
              </div>
            </div>

            <Button
              as="a"
              href="mailto:ukullayappa1@gmail.com"
              className="btn-primary-custom"
              style={{ width: '100%', justifyContent: 'center', borderRadius: 999 }}
            >
              <FaEnvelope size={13} />
              ukullayappa1@gmail.com
            </Button>

            <Button
              as="a"
              href="/Uravakonda-Kullayappa-Resume.docx"
              download="Uravakonda-Kullayappa-Resume.docx"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-custom"
              style={{ width: '100%', justifyContent: 'center', borderRadius: 999 }}
            >
              <FaDownload size={13} />
              Download Resume
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </motion.div>
  )
}
