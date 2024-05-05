// import { useNavigate } from 'react-router-dom'
// import { Button } from '@nextui-org/react'
import { useAuth } from '../../context/authContext'
import React from 'react'

function Dashboard () {
  const { state: { user } } = useAuth()

  // STYLES
  const styles = {
    container: {
      backgroundColor: '#f0f0f0',
      padding: '20px',
      textAlign: 'center',
      marginTop: '50px'
    },
    title: {
      color: '#333',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      margin: '0',
      marginTop: '70'
    }
  }

  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>Dashboard</h1>
      </div>
      <div>
        <p className='text-2xl font-semibold text-gray-800 my-5'>Profil de {user.username}</p>
      </div>
    </>

  )
}

export default Dashboard
