import React, { useState } from 'react'

function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (password === 'kullayappa123@') {
      localStorage.setItem('admin_auth', 'true')
      onLogin()
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="card shadow-lg p-4 text-center" style={{ width: '360px', borderRadius: '15px' }}>
        
        <h2 className="mb-2 fw-bold">Admin Panel</h2>
        <p className="text-muted mb-4">Secure login</p>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
          />
          <label htmlFor="password">Password</label>
        </div>

        <button 
          onClick={handleLogin} 
          className="btn btn-primary w-100 fw-semibold"
        >
          Login
        </button>

        {error && (
          <div className="alert alert-danger mt-3 py-2">
            {error}
          </div>
        )}

      </div>
    </div>
  )
}

export default Login