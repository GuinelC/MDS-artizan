import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { useCart } from '../../context/cartContext' // Importez le hook useCart depuis le contexte du panier
import { toast } from 'react-toastify'
import './ProductsList.css'

function ProductsListItem ({ product }) {
  const { addToCart, updateCart } = useCart() // Utilisez le hook useCart pour obtenir la fonction addToCart

  const { name, description, images, price, artisan } = product.attributes

  const imgUrl = process.env.REACT_APP_IMAGES_URL + images?.data[0]?.attributes?.url
  const showArtisan = artisan && artisan.data && artisan.data.attributes && artisan?.data?.attributes?.name

  const handleAddToCart = () => {
    addToCart(product, 1) // Ajoutez l'article au panier
    updateCart() // Mettez à jour le panier
    toast.success('Produit ajouté au panier')
  }

  return (
    <Card isPressable className='card'>
      <CardHeader className='p-0'>
        <img src={imgUrl} className='product-picture' />
      </CardHeader>
      <CardBody className='card-body'>
        <h2>{name}</h2>
        <p>{description.length > 60 ? description.substring(0, 60) + '...' : description}</p>
        <p className='price mb-2 text-center'>{price}€</p>
        <div className='card-footer'>
          {showArtisan}
        </div>
      </CardBody>
      <CardFooter>
        <Button className='btn-product' onClick={handleAddToCart}>Acheter</Button>
      </CardFooter>
    </Card>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object
}

export default ProductsListItem
