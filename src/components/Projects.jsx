import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Badge, Button, Card, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { FaArrowRight, FaCode, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

const projects = [
  {
    title: 'Hub Electro E-Commerce',
    description:
      'An electronics e-commerce platform with product browsing, cart flow, and a deployed split architecture using Vercel for the frontend and Render for the backend.',
    tags: ['React', 'Bootstrap', 'Node.js', 'PostgreSQL'],
    frontendRepo: 'https://github.com/Ukullayappa/electrohub-frontend',
    backendRepo: 'https://github.com/Ukullayappa/electrohub-backend',
    live: 'https://hubelectro.vercel.app/',
    status: 'Live Project',
  },
]
 {
    title: 'Live Chat Application',
    description:
      'A real-time chat application with user authentication, instant messaging, online presence, and responsive conversation screens.',
    tags: ['React', 'Node.js', 'Socket.IO', 'Express'],
    frontendRepo: 'https://github.com/Ukullayappa/chatapp-frontend.git',
    backendRepo: 'https://github.com/Ukullayappa/chatapp-backend.git',
    live: 'https://chatapp-frontend-seven-eta.vercel.app/',
    status: 'Live Project',
  },
  {
    title: 'Analytics Dashboard',
    desc: 'A dashboard-oriented interface with data cards, reporting views, and modern responsive layout patterns.',
    tags: ['React', 'Bootstrap', 'REST API'],
  },
]

function ProjectCard({ item, index, inView, isPlanned = false }) {
  return (
    <Col lg={4} md={6} className="d-flex">
      <motion.div
        className="w-100 h-100"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 }}
      >
        <Card className={`project-showcase-card h-100 border-0 ${isPlanned ? 'project-showcase-muted' : ''}`}>
          <Card.Body className="d-flex flex-column">
            <div className="project-card-top">
              <Badge className={`project-status-badge ${isPlanned ? 'planned' : ''}`}>
                {isPlanned ? 'In Progress' : item.status}
              </Badge>
              {!isPlanned && item.live && (
                <a href={item.live} target="_blank" rel="noreferrer" className="project-inline-link">
                  Live Demo <FaExternalLinkAlt size={11} />
                </a>
              )}
            </div>

            <h3>{item.title}</h3>
            <p className="project-card-description">{isPlanned ? item.desc : item.description}</p>

            <div className="project-tags-row mb-4">
              {item.tags.map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>

            <div className="mt-auto project-card-actions">
              {!isPlanned && item.live && (
                <Button
                  as="a"
                  href={item.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary-custom project-action-btn"
                >
                  <FaArrowRight size={12} />
                  Open Project
                </Button>
              )}

              {!isPlanned ? (
                <Dropdown drop="up" align="end">
                  <Dropdown.Toggle className="project-action-btn project-repo-toggle">
                    <FaGithub size={12} />
                    Select Repo
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="project-repo-menu">
                    <Dropdown.Item href={item.frontendRepo} target="_blank" rel="noreferrer">
                      Frontend Repo
                    </Dropdown.Item>
                    <Dropdown.Item href={item.backendRepo} target="_blank" rel="noreferrer">
                      Backend Repo
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  as="a"
                  href={item.github || 'https://github.com/Ukullayappa'}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-custom project-action-btn"
                >
                  <FaCode size={12} />
                  View Profile
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section-padding section-soft">
      <Container ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <p className="section-subtitle">Portfolio Highlights</p>
          <h2 className="section-title">Projects that reflect my growing full stack skillset</h2>
          <div className="section-divider mx-auto" />
          <p className="section-intro mx-auto">
            These projects show the direction of my work: responsive interfaces,
            practical backend integrations, and a focus on real-world usability.
          </p>
        </motion.div>

        <Row className="g-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} item={project} index={index} inView={inView} />
          ))}
          {comingSoon.map((item, index) => (
            <ProjectCard
              key={item.title}
              item={item}
              index={projects.length + index}
              inView={inView}
              isPlanned
            />
          ))}
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="projects-footer-panel"
        >
          <div>
            <span>Want to see more of my work?</span>
            <strong>I regularly update my GitHub with learning projects and improvements.</strong>
          </div>
          <Button
            as="a"
            href="https://github.com/Ukullayappa"
            target="_blank"
            rel="noreferrer"
            className="btn-primary-custom"
          >
            <FaGithub size={13} />
            Visit GitHub
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
