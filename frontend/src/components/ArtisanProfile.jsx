import React from 'react'
import PropTypes from 'prop-types'

function ArtisanProfile ({ attributes }) {
  const imgUrl = process.env.REACT_APP_IMAGES_URL + attributes.profilePicture?.url

  return (
    <div className='max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
      <div className='md:flex'>
        <div className='md:flex-shrink-0'>
          {/* Assurez-vous que imgUrl est défini correctement pour inclure le chemin complet de l'image */}
          <img className='h-48 w-full object-cover md:w-48' src={imgUrl} alt='Profile' />
        </div>
        <div className='p-8'>
          <div className='uppercase tracking-wide text-sm text-blue-500 font-semibold'>Artisan</div>
          <p className='block mt-1 text-lg leading-tight font-medium text-black'>{attributes.name}</p>
          <p className='mt-2 text-gray-600'>{attributes.email}</p>
          {/* Ajoutez d'autres données de l'artisan ici si nécessaire */}
        </div>
      </div>
    </div>
  )
}

ArtisanProfile.propTypes = {
  attributes: PropTypes.object // Assurez-vous que attributes est requis
}

export default ArtisanProfile
