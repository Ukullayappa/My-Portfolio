import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { FaCode, FaGraduationCap, FaLightbulb, FaMapMarkerAlt } from 'react-icons/fa'

const stats = [
  { value: '2026', label: 'Graduation Year', icon: <FaGraduationCap size={18} /> },
  { value: 'ECE', label: 'Academic Background', icon: <FaCode size={18} /> },
  { value: 'Full Stack', label: 'Career Path', icon: <FaLightbulb size={18} /> },
  { value: 'Andhra Pradesh', label: 'Location', icon: <FaMapMarkerAlt size={18} /> },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-padding section-soft">
      <Container ref={ref}>
        <Row className="align-items-center g-4 g-lg-5">
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle">Get To Know Me</p>
              <h2 className="section-title">A developer focused on learning fast and building well</h2>
              <div className="section-divider" />

              <p className="section-copy">
                I'm <strong>Uravakonda Kullayappa</strong>, a B.Tech Electronics and
                Communication Engineering student preparing to graduate in 2026 and
                actively building a strong career in software development.
              </p>
              <p className="section-copy">
                My academic background gave me discipline and analytical thinking,
                while my hands-on development journey helped me build practical
                skills in React, Bootstrap, Node.js, Express, and PostgreSQL.
              </p>
              <p className="section-copy mb-4">
                I enjoy turning ideas into clean, responsive products and I'm looking
                for opportunities where I can contribute, learn quickly, and grow into
                a high-impact engineering role.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Badge className="about-badge-pill">Quick Learner</Badge>
                <Badge className="about-badge-pill">Problem Solver</Badge>
                <Badge className="about-badge-pill">Team Player</Badge>
                <Badge className="about-badge-pill">Career Ready</Badge>
              </div>
            </motion.div>
          </Col>

          <Col lg={6}>
            <Row xs={1} md={2} className="g-3">
              {stats.map((item, index) => (
                <Col key={item.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.12 * index }}
                  >
                    <Card className="about-stat-card h-100 border-0">
                      <Card.Body>
                        <div className="about-stat-icon">{item.icon}</div>
                        <h3>{item.value}</h3>
                        <p>{item.label}</p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.55 }}
            >
              <Card className="about-summary-card border-0 mt-3">
                <Card.Body>
                  <div className="about-summary-top">
                    <span>Current Focus</span>
                    <strong>Internships - Entry-level roles - Freelance projects</strong>
                  </div>
                  <p>
                    Building portfolio-quality interfaces, backend APIs, and complete
                    CRUD applications with a strong focus on clean UI and practical development skills.
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
