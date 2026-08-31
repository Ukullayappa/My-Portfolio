import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { FaBriefcase, FaCode, FaGraduationCap, FaLightbulb, FaMapMarkerAlt, FaRobot } from 'react-icons/fa'

const stats = [
  { value: '7.8', label: 'B.Tech CGPA (ECE)', icon: <FaGraduationCap size={18} /> },
  { value: '1 Mo', label: 'Internship Experience', icon: <FaBriefcase size={18} /> },
  { value: 'AI/GenAI', label: 'Career Path', icon: <FaRobot size={18} /> },
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
              <h2 className="section-title">An AI/GenAI engineer focused on building intelligent, production-ready software</h2>
              <div className="section-divider" />

              <p className="section-copy">
                I'm <strong>Uravakonda Kullayappa</strong>, an early-career Software Engineer
                with hands-on experience building AI-powered and agentic applications
                using Python, FastAPI, LangChain, and LangGraph, alongside a solid
                foundation in full-stack web development.
              </p>
              <p className="section-copy">
                I've built and shipped projects spanning <strong>LLM-driven agent workflows, RAG,
                prompt engineering, and REST API design</strong>, including a stateful trip-planning
                agent and an AI job-search automation platform. I also completed a
                <strong> Web Development Internship at SQROCK IT Solutions</strong>, where I independently
                built a web application using React.js, Node.js, and PostgreSQL.
              </p>
              <p className="section-copy mb-4">
                My B.Tech in Electronics & Communication Engineering (CGPA 7.8/10)
                gave me discipline and analytical thinking, and I enjoy turning ideas
                into working AI-powered products &mdash; from agent orchestration to
                the APIs and interfaces that support them.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Badge className="about-badge-pill">AI/GenAI Engineer</Badge>
                <Badge className="about-badge-pill">Quick Learner</Badge>
                <Badge className="about-badge-pill">Problem Solver</Badge>
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
                    <strong>AI/GenAI Roles &middot; Full-Stack Development &middot; Agentic AI Applications</strong>
                  </div>
                  <p>
                    Building AI-powered and agentic applications with Python, FastAPI,
                    LangChain, and LangGraph &mdash; alongside full-stack products using
                    React.js, Node.js, and PostgreSQL. Shipped projects include a
                    stateful trip-planning agent and an AI job-search automation platform.
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