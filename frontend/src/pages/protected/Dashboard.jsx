import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { Button } from '@nextui-org/react'

function Dashboard () {
  const navigate = useNavigate()

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }
  return (
    <>
      <h2>Dashboard  Page</h2>
      <Button onClick={handleLogout}>
        Deconnexion
      </Button>
    </>

  )
}

export default Dashboard
