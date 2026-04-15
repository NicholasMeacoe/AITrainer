import { useState, useEffect } from 'react'
import PersonaDashboard from './components/persona/PersonaDashboard'
import './styles/App.css'

function App() {
  const [backendStatus, setBackendStatus] = useState<string>('Loading...')

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setBackendStatus('OK')
        } else {
          setBackendStatus('Error')
        }
      })
      .catch(() => setBackendStatus('Error'))
  }, [])

  return (
    <div className="app-container">
      <header>
        <h1>AITrainer</h1>
        <div className="backend-status">
          Backend Status: <span className={backendStatus.toLowerCase()}>{backendStatus}</span>
        </div>
      </header>
      <main>
        <PersonaDashboard />
      </main>
    </div>
  )
}

export default App
