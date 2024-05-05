import { useEffect, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import './form.css'

function RegisterForm () {
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')

  const navigate = useNavigate()
  const { state: { user, jwt, error, isLoading }, register } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(formData)
  }

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user])

  console.log(formData)

  return (
    <>
      <h1 className='register-title'>Inscription</h1>
      <form className='registerForm' onSubmit={handleSubmit}>
        <Input className='mb-5 register-btn' name='lastName'  placeholder='Entrer votre nom' value={formData.lastName} onChange={handleChange} />
        <Input className='mb-5 register-btn' name='firstName' placeholder='Entrer votre prénom' value={formData.firstName} onChange={handleChange} />
        <Input className='mb-5 register-btn' name='username' placeholder="Entrer votre nom d'utilisateur" value={formData.username} onChange={handleChange} />
        <Input className='mb-5 register-btn' name='email' placeholder='Entrer votre email' value={formData.email} onChange={handleChange} />
        <Input className='mb-5 register-btn' name='password' placeholder='Entrer votre mot de passe' value={formData.password} onChange={handleChange} />
        {
            error && <p style={{ color: 'red' }}>{error}</p>
        }
        <Button className='mb-6 border border-black text-md bg-white text-black font-bold py-5 px-8 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out' type='submit' isLoading={isLoading}>S'enregistrer</Button>
      </form>
    </>
  )
}

export default RegisterForm
