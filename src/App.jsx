import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './Admin'
import Login from './Login'

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function AdminProtected() {
  const isAuth = localStorage.getItem('admin_auth') === 'true'

  if (!isAuth) {
    return <Login onLogin={() => window.location.reload()} />
  }

  return <Admin />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminProtected />} />
    </Routes>
  )
}