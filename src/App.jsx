import { useState, useEffect, useRef } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import BusinessOnboarding from './components/BusinessOnboarding'
import BusinessType from './components/BusinessType'
import ClinicDashboard from './components/ClinicDashboard'
import PharmacyDashboard from './components/PharmacyDashboard'
import LaboratoryDashboard from './components/LaboratoryDashboard'
import PharmacyDashboard from './components/PharmacyDashboard'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [appState, setAppState] = useState({ loading: true })
  const fetchingRef = useRef(false)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (fetchingRef.current) return
        fetchingRef.current = true
        setAppState({ loading: true })
        try {
          const docSnap = await getDoc(doc(db, "businesses", currentUser.uid))
          const data = docSnap.exists() ? docSnap.data() : {}
          setAppState({
            loading: false,
            user: currentUser,
            onboardingDone: !!data.onboardingCompleted,
            businessTypeDone: !!data.businessTypeSelected,
            businessType: data.businessType || null,
          })
        } catch {
          setAppState({
            loading: false,
            user: currentUser,
            onboardingDone: false,
            businessTypeDone: false,
            businessType: null,
          })
        }
        fetchingRef.current = false
      } else {
        setAppState({
          loading: false,
          user: null,
          onboardingDone: false,
          businessTypeDone: false,
          businessType: null,
        })
      }
    })
    return () => unsubscribe()
  }, [])

  const { loading, user, onboardingDone, businessTypeDone, businessType } = appState

  if (loading) return null

  if (user && !onboardingDone) {
    return (
      <BusinessOnboarding
        user={user}
        onComplete={() => setAppState(prev => ({ ...prev, onboardingDone: true }))}
      />
    )
  }

  if (user && onboardingDone && !businessTypeDone) {
    return (
      <BusinessType
        user={user}
        onComplete={(type) => setAppState(prev => ({ ...prev, businessTypeDone: true, businessType: type }))}
      />
    )
  }

  if (user && onboardingDone && businessTypeDone) {
    if (businessType === "clinic") return <ClinicDashboard user={user} />
    if (businessType === "pharmacy") return <PharmacyDashboard user={user} />
    if (businessType === "laboratory") return <LaboratoryDashboard user={user} />
    return <Dashboard user={user} />
  }

  const toggle = () => setIsLogin(!isLogin)

  return (
    <>
      {isLogin ? <Login onToggle={toggle} /> : <Signup onToggle={toggle} />}
    </>
  )
}

export default App
