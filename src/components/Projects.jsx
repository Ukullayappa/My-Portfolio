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
  {
    title: 'Live Chat Application',
    description:
      'A real-time chat application with user authentication, instant messaging, online presence, and responsive conversation screens.',
    tags: ['React', 'Node.js', 'Socket.IO', 'Express'],
    frontendRepo: 'https://github.com/Ukullayappa/chatapp-frontend',
    backendRepo: 'https://github.com/Ukullayappa/chatapp-backend',
    live: 'https://chatapp-frontend-seven-eta.vercel.app/',
    status: 'Live Project',
  },
  {
    title: 'Analytics Dashboard',
    description:
      'A dashboard-style interface with data cards, reporting views, and modern responsive layout patterns.',
    tags: ['React', 'Bootstrap', 'REST API'],
    status: 'In Progress',
  },
]

function ProjectCard({ item, index, inView }) {
  return (
    <Col lg={4} md={6} className="d-flex">
      <motion.div
        className="w-100 h-100"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="project-card h-100 border-0 shadow-sm">
          <Card.Body className="d-flex flex-column">

            {/* TOP */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Badge bg={item.status === 'Live Project' ? 'success' : 'warning'}>
                {item.status}
              </Badge>

              {item.live && (
                <a href={item.live} target="_blank" rel="noreferrer">
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
            </div>

            {/* TITLE */}
            <h5 className="fw-bold">{item.title}</h5>

            {/* DESCRIPTION */}
            <p className="text-muted small">{item.description}</p>

            {/* TAGS */}
            <div className="mb-3">
              {item.tags.map((tag) => (
                <Badge key={tag} bg="light" text="dark" className="me-1 mb-1">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="mt-auto d-flex gap-2">

              {item.live && (
                <Button
                  variant="primary"
                  size="sm"
                  href={item.live}
                  target="_blank"
                >
                  <FaArrowRight size={12} /> Open
                </Button>
              )}

              {item.frontendRepo && (
                <Dropdown>
                  <Dropdown.Toggle size="sm" variant="dark">
                    <FaGithub size={12} /> Code
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href={item.frontendRepo} target="_blank">
                      Frontend
                    </Dropdown.Item>
                    <Dropdown.Item href={item.backendRepo} target="_blank">
                      Backend
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
  const inView = useInView(ref, { once: true })

  return (
    <section id="projects" className="py-5">
      <Container ref={ref}>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-5"
        >
          <h2 className="fw-bold">Projects</h2>
          <p className="text-muted">
            A showcase of my full-stack development work and learning journey.
          </p>
        </motion.div>

        {/* PROJECT GRID */}
        <Row className="g-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              item={project}
              index={index}
              inView={inView}
            />
          ))}
        </Row>

        {/* FOOTER */}
        <div className="text-center mt-5">
          <Button
            variant="dark"
            href="https://github.com/Ukullayappa"
            target="_blank"
          >
            <FaGithub /> View More on GitHub
          </Button>
        </div>

      </Container>
    </section>
  )
}
