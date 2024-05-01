import { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { Button, Input } from '@nextui-org/react'
import { toast } from 'react-toastify'

function UpdateProfileForm () {
  const { state: { isLoggedIn, user, jwt }, updateMe, deleteUser } = useAuth()
  const [changeInfos, setChangeInfos] = useState(false)

  // Utilisation des données de l'utilisateur du contexte pour initialiser les valeurs du formulaire
  const [formData, setFormData] = useState({
    username: user ? user.username : '',
    email: user ? user.email : ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateMe(formData, user.id, jwt) // Attend la résolution de la promesse

      setChangeInfos(false)
      toast.success('Vos informations ont été mises à jour avec succès !')
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la mise à jour des informations utilisateur.')
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      console.log(user.id)
      await deleteUser(user.id)
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la suppresion de l\'utilisateur')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    isLoggedIn && (
      <div className='flex flex-col gap-6 justify-center align-center m-44'>
        <h1>Profile</h1>
        {user && (
          changeInfos
            ? (
              <>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6 bg-primary-100 p-6 rounded-large '>
                  <Input
                    type='username'
                    label="nom d'utilisateur"
                    placeholder={formData.username}
                    className='max-w-lg self-center'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <Input
                    type='email'
                    label='Email'
                    placeholder={formData.email}
                    className='max-w-lg self-center'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Button color='danger' className='w-40 self-center' onClick={handleDelete}>Supprimer le compte</Button>
                  <Button color='primary' className='w-40 self-center' type='submit'>Enregistrer</Button>

                </form>
              </>
              )
            : (
              <>
                <p>Bonjour {user.username}</p>
                <p>Votre adresse email est {user.email}</p>
                <Button onClick={() => setChangeInfos(true)}>Modifier</Button>
              </>
              )
        )}
      </div>
    )
  )
}

export default UpdateProfileForm
