import { motion } from 'framer-motion'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import profileImg from '../assets/Screenshot 2026-04-20 140041.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const highlights = [
  'React and Bootstrap UI',
  'Node.js and Express APIs',
  'PostgreSQL Database',
]

export default function Hero() {
  return (
    <section id="home" className="hero-bg hero-section d-flex align-items-center">
      <Container>
        <Row className="align-items-center min-vh-100 py-5 g-5">
          <Col lg={6} className="text-center text-lg-start">
            <motion.div {...fadeUp(0.05)}>
              <Badge className="hero-intro-badge">
                Open to internships and full-time opportunities
              </Badge>
            </motion.div>

            <motion.h1 {...fadeUp(0.15)} className="hero-title">
              Building modern web experiences with
              <span> clean code and real impact.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.25)} className="hero-lead">
              I'm <strong>Uravakonda Kullayappa</strong>, a 2026 B.Tech ECE graduate
              transitioning strongly into full stack development. I create responsive,
              practical applications using React, Node.js, Express, and PostgreSQL.
            </motion.p>

            <motion.div {...fadeUp(0.35)} className="hero-highlight-row">
              {highlights.map((item) => (
                <span key={item} className="hero-highlight-pill">
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.45)} className="hero-cta-row">
              <Button
                as="a"
                href="mailto:ukullayappa1@gmail.com"
                className="btn-primary-custom"
              >
                <FaEnvelope size={14} />
                Hire Me
              </Button>
              <Button
                as="a"
                href="https://github.com/Ukullayappa"
                target="_blank"
                rel="noreferrer"
                className="btn-outline-custom"
              >
                <FaGithub size={14} />
                View Projects
              </Button>
              <Button
                as="a"
                href="#"
                onClick={(e) => e.preventDefault()}
                className="btn-text-google hero-resume-link"
              >
                <FaDownload size={14} />
                Resume Coming Soon
              </Button>
            </motion.div>

            <motion.div {...fadeUp(0.55)} className="hero-social-strip">
              <span className="hero-social-label">Connect</span>
              <a
                href="https://linkedin.com/in/u-kullayappa-57a326368"
                target="_blank"
                rel="noreferrer"
                className="btn-icon-google"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Ukullayappa"
                target="_blank"
                rel="noreferrer"
                className="btn-icon-google"
              >
                <FaGithub />
              </a>
              <a href="mailto:ukullayappa1@gmail.com" className="btn-icon-google">
                <FaEnvelope />
              </a>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div {...fadeUp(0.35)} className="hero-profile-shell">
              <div className="hero-photo-frame hero-photo-frame-standalone">
                <img
                  src={profileImg}
                  alt="Uravakonda Kullayappa"
                  className="hero-photo-img"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.45 }}
                className="hero-graduate-badge"
              >
                <span>Professional Status</span>
                <strong>2026 Graduate in B.Tech Electronics and Communication Engineering</strong>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
