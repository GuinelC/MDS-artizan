// FFC
import { useState, useEffect } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import LoginForm from '../components/forms/LoginForms'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Auth () {
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  const { state: { jwt, user } } = useAuth()

  useEffect(() => {
    if (jwt && user) {
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      {
        isRegister
          ? <RegisterForm />
          : <LoginForm />

        }
      <a onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "J'ai déja un compte" : "Je n'est pas de compte"}
      </a>
    </>
  )
}

export default Auth
