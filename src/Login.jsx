import React, { useState } from 'react'

function Login({ onLogin }) {
const [password, setPassword] = useState('')
const [error, setError] = useState('')

const handleLogin = () => {
if (password === 'kullayappa123@') {
localStorage.setItem('admin_auth', 'true')
onLogin()
} else {
setError('Wrong password')
}
}

return (
<div style={{ padding: '40px', textAlign: 'center' }}> <h2>Admin Login</h2>


  <input
    type="password"
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ padding: '10px', margin: '10px' }}
  />

  <br />

  <button onClick={handleLogin}>Login</button>

  {error && <p style={{ color: 'red' }}>{error}</p>}
</div>

)
}

export default Login
