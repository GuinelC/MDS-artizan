import { Spinner } from '@nextui-org/react'
import ProductsList from '../components/products/ProductsList'
import { useFetch } from '../hooks/Api'
import { CartProvider } from '../context/cartContext' // Importez le CartProvider

function Home () {
  // Récup List product
  const { response, isLoading, error } = useFetch('http://localhost:1337/api/products?populate=*')

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (error) {
    return <h2>Une erreur s'est produite</h2>
  }

  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-semibold my-8'>Home</h1>
      <div>
        <CartProvider>
          <ProductsList products={response} />
        </CartProvider>
      </div>
    </div>
  )
}

export default Home
