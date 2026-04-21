import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa'
import axios from 'axios'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await axios.post('https://portfolio-backend-p9b8.onrender.com/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const contactInfo = [
    { icon: <FaEnvelope size={18} />, label: 'Email', value: 'ukullayappa1@gmail.com', href: 'mailto:ukullayappa1@gmail.com' },
    { icon: <FaLinkedin size={18} />, label: 'LinkedIn', value: 'u-kullayappa-57a326368', href: 'https://linkedin.com/in/u-kullayappa-57a326368' },
    { icon: <FaMapMarkerAlt size={18} />, label: 'Location', value: 'Andhra Pradesh, India', href: null },
  ]

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '1.5px solid var(--light-gray)',
    borderRadius: 4, fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    color: 'var(--text-dark)', background: 'var(--white)', outline: 'none',
    transition: 'border-color 0.25s', marginBottom: 0
  }

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--white)' }}>
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <p className="section-subtitle">Reach Out</p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider mx-auto" />
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
            Whether you have a job opportunity, a project idea, or just want to say hello — I'd love to hear from you!
          </p>
        </motion.div>

        <div className="row g-5 align-items-start">
          {/* Left — Info */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div style={{ marginBottom: 32 }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 14 }}>Let's work together</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  I'm actively looking for full-stack developer roles and internship opportunities.
                  If you think I'd be a great fit, feel free to reach out directly!
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {contactInfo.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="contact-card"
                    style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                  >
                    <div style={{ width: 44, height: 44, background: 'var(--navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.label}</div>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', fontWeight: 600, color: 'var(--navy)', textDecoration: 'none' }}>{c.value}</a>
                      ) : (
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', fontWeight: 600, color: 'var(--navy)' }}>{c.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ background: 'var(--off-white)', border: '1.5px solid var(--light-gray)', borderRadius: 8, padding: '36px 32px', boxShadow: '0 4px 24px rgba(10,22,40,0.06)' }}
            >
              <h5 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 24 }}>Send Me a Message</h5>

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Your Name *</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder="write your name" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--navy-accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--light-gray)'}
                    />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Email Address *</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="write@yourdomain.com" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--navy-accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--light-gray)'}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Subject</label>
                  <input
                    type="text" name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Job Opportunity / Project Collaboration / Hello!" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--navy-accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--light-gray)'}
                  />
                </div>

                <div className="mb-4">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required
                    rows={5} placeholder="Tell me about the opportunity or project..." style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = 'var(--navy-accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--light-gray)'}
                  />
                </div>

                <button type="submit" className="btn-primary-custom" disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1, height: 48, fontSize: '0.95rem' }}
                >
                  <FaPaperPlane />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 16, padding: '12px 16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 4, color: '#166534', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600 }}
                  >
                    ✅ Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 16, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 4, color: '#991b1b', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600 }}
                  >
                    ❌ Something went wrong. Please email me directly at ukullayappa1@gmail.com
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
