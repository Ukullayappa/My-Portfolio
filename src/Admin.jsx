import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Admin() {
const [messages, setMessages] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
fetchMessages()
}, [])

const fetchMessages = async () => {
try {
const res = await axios.get('https://portfolio-backend-p9b8.onrender.com/api/messages')
setMessages(res.data)
} catch (err) {
console.error(err)
} finally {
setLoading(false)
}
}

return (
<div style={{ padding: '40px' }}> <h2>Admin Dashboard</h2>


  {loading ? (
    <p>Loading...</p>
  ) : messages.length === 0 ? (
    <p>No messages yet</p>
  ) : (
    messages.map(msg => (
      <div
        key={msg.id}
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          marginBottom: '10px',
          borderRadius: '10px'
        }}
      >
        <h4>{msg.name}</h4>
        <p><b>Email:</b> {msg.email}</p>
        <p><b>Subject:</b> {msg.subject}</p>
        <p>{msg.message}</p>
      </div>
    ))
  )}
</div>


)
}

export default Admin