import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'
import profileImg from "../assets/Screenshot 2026-04-20 140041.png";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }
})

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(37, 99, 168, 0.08);
          border: 1.5px solid rgba(37, 99, 168, 0.2);
          color: var(--navy-accent);
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 1.4rem;
        }
        .hero-badge .pulse-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--navy-accent);
          animation: heroPulse 1.8s ease infinite;
          flex-shrink: 0;
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.65); }
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 5vw, 3.8rem);
          font-weight: 700;
          color: var(--navy);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-bottom: 0.2rem;
        }
        .hero-name .gold-accent { color: var(--gold); }

        .hero-role-row {
          display: flex; align-items: center; gap: 12px;
          margin: 1rem 0 1.4rem;
        }
        .hero-role-bar {
          width: 40px; height: 2.5px;
          background: linear-gradient(90deg, var(--gold), var(--navy-accent));
          border-radius: 2px; flex-shrink: 0;
        }
        .hero-role-text {
          font-family: var(--font-body);
          font-size: 1.05rem; font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        .hero-desc {
          font-family: var(--font-body);
          font-size: 1.02rem; color: var(--text-muted);
          line-height: 1.8; max-width: 480px; margin-bottom: 2rem;
        }

        .hero-buttons-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 2.2rem; }

        .hero-social-row { display: flex; align-items: center; gap: 10px; }
        .hero-social-label {
          font-family: var(--font-body); font-size: 0.78rem;
          font-weight: 600; color: var(--text-muted);
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .hero-social-divider { width: 22px; height: 1.5px; background: var(--light-gray); }

        /* ── PHOTO AREA ── */
        .hero-photo-area {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Bigger circle — equal width & height for perfect circle */
        .hero-photo-stack {
          position: relative;
          width: 420px;
          height: 420px;
          flex-shrink: 0;
        }
        @media (max-width: 1199px) {
          .hero-photo-stack { width: 360px; height: 360px; }
        }
        @media (max-width: 991px) {
          .hero-photo-stack { width: 300px; height: 300px; }
        }
        @media (max-width: 600px) {
          .hero-photo-stack { width: 240px; height: 240px; }
        }

        /* Circular photo — no border, no ring */
        .hero-photo-img {
          position: relative; z-index: 1;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          border-radius: 50%;
          display: block;
          box-shadow: 0 24px 64px rgba(10, 22, 40, 0.18);
        }

        /* ── FLOATING BADGES ── */
        .hero-badge-work {
          position: absolute;
          bottom: -16px; left: 20px;
          z-index: 10;
          background: var(--white);
          border: 1.5px solid var(--light-gray);
          border-radius: 100px;
          padding: 8px 16px;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 24px rgba(10, 22, 40, 0.1);
          white-space: nowrap;
        }
        .hero-badge-work .green-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #16a34a; flex-shrink: 0;
          animation: heroPulse 1.8s ease infinite;
        }
        .hero-badge-work span {
          font-family: var(--font-body); font-size: 0.8rem;
          font-weight: 700; color: #16a34a; letter-spacing: 0.04em;
        }

        .hero-badge-year {
          position: absolute;
          top: 50%; right: -20px;
          transform: translateY(-50%);
          z-index: 10;
          background: var(--white);
          border: 1.5px solid var(--light-gray);
          border-radius: 6px;
          padding: 12px 14px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(10, 22, 40, 0.08);
        }
        .hero-badge-year .yr-num {
          font-family: var(--font-display); font-size: 1.3rem;
          font-weight: 700; color: var(--navy); line-height: 1;
        }
        .hero-badge-year .yr-label {
          font-family: var(--font-body); font-size: 0.62rem;
          font-weight: 600; color: var(--text-muted);
          letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px;
        }

        @media (max-width: 600px) {
          .hero-badge-work  { left: 50%; transform: translateX(-50%); bottom: -24px; }
          .hero-badge-year  { display: none; }
          .hero-role-row,
          .hero-buttons-row,
          .hero-social-row  { justify-content: center; }
          .hero-desc        { margin-left: auto; margin-right: auto; }
        }
      `}</style>

      <section id="home" className="hero-bg d-flex align-items-center" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="row align-items-center min-vh-100 py-5">

            {/* ── LEFT ── */}
            <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">

              <motion.div {...fadeUp(0.1)}>
                <div className="hero-badge">
                  <div className="pulse-dot" />
                  👋 Hello, I'm
                </div>
              </motion.div>

              <motion.h1 {...fadeUp(0.2)} className="hero-name">
                Uravakonda <br />
                <span className="gold-accent">Kullayappa</span>
              </motion.h1>

              <motion.div {...fadeUp(0.3)} className="hero-role-row">
                <div className="hero-role-bar" />
                <span className="hero-role-text">Full Stack Developer</span>
              </motion.div>

              <motion.p {...fadeUp(0.4)} className="hero-desc">
                A passionate B.Tech ECE fresher (2026) with a strong foundation
                in modern web technologies. I build end-to-end web applications
                using React, Node.js, and PostgreSQL.
              </motion.p>

              <motion.div {...fadeUp(0.5)} className="hero-buttons-row">
                <a href="mailto:ukullayappa1@gmail.com" className="btn-primary-custom">
                  <FaEnvelope size={14} /> Get In Touch
                </a>
                <a href="#" className="btn-outline-custom" onClick={e => e.preventDefault()}>
                  <FaDownload size={14} /> Download CV
                </a>
              </motion.div>

              <motion.div {...fadeUp(0.6)} className="hero-social-row">
                <span className="hero-social-label">Find me on</span>
                <div className="hero-social-divider" />
                <a href="https://linkedin.com/in/u-kullayappa-57a326368" target="_blank" rel="noreferrer" className="btn-icon-google">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/Ukullayappa" target="_blank" rel="noreferrer" className="btn-icon-google">
                  <FaGithub />
                </a>
                <a href="mailto:ukullayappa1@gmail.com" className="btn-icon-google">
                  <FaEnvelope />
                </a>
              </motion.div>

            </div>

            {/* ── RIGHT ── */}
            <div className="col-lg-6">
              <div className="hero-photo-area">
                <motion.div {...fadeUp(0.5)} className="hero-photo-stack">

                  {/* Circular photo — no gold ring, no tech stack badge */}
                  <img
                    src={profileImg}
                    alt="Uravakonda Kullayappa"
                    className="hero-photo-img"
                  />

                  {/* Open to Work badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.45 }}
                    className="hero-badge-work"
                  >
                    <div className="green-dot" />
                    <span>Open to Work</span>
                  </motion.div>

                  {/* Year badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.45 }}
                    className="hero-badge-year"
                  >
                    <div className="yr-num">2026</div>
                    <div className="yr-label">Fresher</div>
                  </motion.div>

                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}