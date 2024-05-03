import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { Input } from '@nextui-org/react'
import { toast } from 'react-toastify'

const ProfileContainer = () => {
  const { state: { user, jwt }, updateUserInfo } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    username: ''
  })

  // Effet de chargement initial pour remplir le formulaire avec les données de l'utilisateur
  useEffect(() => {
    if (user) {
      // Si des données ont été enregistrées localement, utilisez-les
      const savedFormData = window.localStorage.getItem('formData')
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData))
      } else {
        // Sinon, utilisez les données de l'utilisateur actuel
        setFormData({
          email: user.email,
          username: user.username
        })
      }
    }
  }, [user])

  // Gérer les modifications des champs de formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Mettre à jour les informations utilisateur via l'API
      await updateUserInfo(formData, user.id, jwt)

      // Enregistrer les données mises à jour localement
      window.localStorage.setItem('formData', JSON.stringify(formData))
    } catch (error) {
      toast.error('Une erreur s\'est produite lors de l\'enregistrement des données.')
    }
  }

  return (
    <div className='flex flex-col w-full items-center my-7'>
      <Input
        className='my-7'
        name='username'
        label='Utilisateur'
        type='text'
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        className='my-7'
        name='email'
        label='Email'
        type='email'
        value={formData.email}
        onChange={handleChange}
      />
      {/* SUBMIT */}
      <button className='my-7' onClick={handleSubmit} style={{ backgroundColor: 'blue', color: 'white' }}>
        Mettre à jour
      </button>
    </div>
  )
}
export default ProfileContainer
