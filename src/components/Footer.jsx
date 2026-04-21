import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--navy)', padding: '48px 0 28px' }}>
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-4 mb-3 mb-md-0">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, background: 'var(--gold)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontWeight: 900, fontSize: '1rem' }}>UK</span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontWeight: 700, fontSize: '1.1rem' }}>Kullayappa</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: 10, maxWidth: 260 }}>
              Full Stack Developer · B.Tech ECE 2026 · Andhra Pradesh
            </p>
          </div>

          <div className="col-md-4 mb-3 mb-md-0 text-md-center">
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {[
                { icon: <FaGithub size={18} />, href: '#' },
                { icon: <FaLinkedin size={18} />, href: 'https://linkedin.com/in/u-kullayappa-57a326368' },
                { icon: <FaEnvelope size={18} />, href: 'mailto:ukullayappa1@gmail.com' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  style={{
                    width: 40, height: 40, border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a73e8'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1a73e8'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="col-md-4 text-md-end">
            <a href="mailto:ukullayappa1@gmail.com"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}
            >
              ukullayappa1@gmail.com
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', margin: 0 }}>
            © {year} Uravakonda Kullayappa. Built with <FaHeart size={11} color="var(--gold)" style={{ margin: '0 3px' }} /> React · Vite · Bootstrap · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
