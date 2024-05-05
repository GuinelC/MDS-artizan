import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { Input } from '@nextui-org/react'
import { toast } from 'react-toastify'
import './form.css'

const ProfileContainer = () => {
  const { state: { user, jwt }, updateUserInfo, deleteUserInfo } = useAuth()
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

  // Mettre à jour les données du formulaire lorsque l'utilisateur change
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        username: user.username
      })
    }
  }, [user])

  // Gérer les modifications des champs de formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // UPDATE
  const handleUpdate = async (e) => {
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

  // DELETE
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await deleteUserInfo(user.id, jwt)
      window.localStorage.removeItem('formData')
      window.localStorage.removeItem('jwt')

      // REDIRECTION
      window.location.href = '/'
    } catch (error) {
      toast.error('Une erreur s\'est produite lors de la suppression du compte.')
    }
  }

  return (
    <div className='update-form flex flex-col w-full items-center my-7'>
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

      {/* BTN - Update */}
      <button
        className='border border-black text-md bg-white text-black font-bold py-2 px-8 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out'
        onClick={handleUpdate}
      >
        Mettre à jour
      </button>
      {/* BTN - Delete */}
      <button
        className='font-bold my-7 px-5 py-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
        onClick={handleDelete}
      >
        Supprimer le compte
      </button>
    </div>
  )
}

export default ProfileContainer
