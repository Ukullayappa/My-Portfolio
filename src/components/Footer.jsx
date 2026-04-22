import { Col, Container, Row } from 'react-bootstrap'
import { FaEnvelope, FaGithub, FaHeart, FaLinkedin } from 'react-icons/fa'

const links = [
  { icon: <FaGithub size={16} />, href: 'https://github.com/Ukullayappa' },
  { icon: <FaLinkedin size={16} />, href: 'https://linkedin.com/in/u-kullayappa-57a326368' },
  { icon: <FaEnvelope size={16} />, href: 'mailto:ukullayappa1@gmail.com' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-upgraded">
      <Container>
        <Row className="align-items-center gy-4">
          <Col lg={5}>
            <div className="footer-brand">
              <div className="footer-brand-mark">UK</div>
              <div>
                <h3>Uravakonda Kullayappa</h3>
                <p>Full Stack Developer - B.Tech ECE 2026 - Andhra Pradesh, India</p>
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className="footer-socials">
              {links.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                  {item.icon}
                </a>
              ))}
            </div>
          </Col>

          <Col lg={3} className="text-lg-end">
            <a href="mailto:ukullayappa1@gmail.com" className="footer-mail-link">
              ukullayappa1@gmail.com
            </a>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p>
            Copyright {year} Uravakonda Kullayappa. Built with <FaHeart size={11} /> React, Bootstrap, Vite, and Framer Motion.
          </p>
        </div>
      </Container>
    </footer>
  )
}
