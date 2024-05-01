import { Spinner } from '@nextui-org/react'
import ArtisansList from '../components/artisans/ArtisansList'
import { useFetch } from '../hooks/Api'

function Artisans () {
  const { response, error, isLoading } = useFetch('http://localhost:1337/api/artisans?populate=*')

  if (isLoading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return (
    <div className='container mx-auto flex flex-col items-center justify-start'>
      <h2 className='text-4xl py-6'>Nos Artisans</h2>
      <ArtisansList artisans={response} />
    </div>
  )
}
export default Artisans
