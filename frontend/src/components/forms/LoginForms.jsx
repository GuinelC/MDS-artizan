import { useEffect, useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext.jsx'

function LoginForm () {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })

  const navigate = useNavigate()

  const { state: { user, jwt, error }, login } = useAuth()

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login(formData)
  }

  if (error) {
    console.log(error)
  }

  return (
    <>
      <form action='' onSubmit={handleSubmit}>
        <h2>Se Connnecter</h2>

        <Input
          className='mb-6'
          type='email'
          name='identifier'
          label='Email'
          placeholder=''
          value={formData.identifier}
          onChange={handleChange}
        />

        <Input
          className='mb-6'
          type='password'
          name='password'
          label='Mot de passe'
          placeholder=''
          value={formData.password}
          onChange={handleChange}
        />
        {
          error && <p style={{ color: 'red' }}>{error}</p>
        }

        <Button type='submit'>Se Connecter</Button>
      </form>
    </>
  )
}

export default LoginForm
