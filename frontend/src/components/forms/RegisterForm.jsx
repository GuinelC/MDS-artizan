import { useEffect, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

function RegisterForm () {
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')

  const navigate = useNavigate()
  const { state: { user, jwt, error, isLoading }, register } = useAuth()
  const [formData, setFormData] = useState({
    firstName: 'charly',
    lastName: 'guinel',
    username: 'charly',
    email: 'charly@gmail.com',
    password: 'charlytest'
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
    <form onSubmit={handleSubmit}>
      <Input name='lastName' label='Nom' placeholder='Entrer votre nom' value={formData.lastName} onChange={handleChange} />
      <Input name='firstName' label='Prénom' placeholder='Entrer votre prénom' value={formData.firstName} onChange={handleChange} />
      <Input name='username' label='nom utilisateur' placeholder="Entrer votre nom d'utilisateur" value={formData.username} onChange={handleChange} />
      <Input name='email' label='email' placeholder='Entrer votre email' value={formData.email} onChange={handleChange} />
      <Input name='password' label='password' placeholder='Entrer votre mot de passe' value={formData.password} onChange={handleChange} />
      {
          error && <p style={{ color: 'red' }}>{error}</p>
      }
      <Button type='submit' isLoading={isLoading}>S'enregistrer</Button>
    </form>
  )
}

export default RegisterForm
