import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return null

  if (user) return <Dashboard user={user} />

  const toggle = () => setIsLogin(!isLogin)

  return (
    <>
      {isLogin ? <Login onToggle={toggle} /> : <Signup onToggle={toggle} />}
    </>
  )
}

export default App
