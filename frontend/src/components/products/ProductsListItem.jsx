import PropTypes from 'prop-types'

function ProductsListItem ({ product }) {
  const { name, description, images, price } = product.attributes
  const imgUrl = 'http://localhost:1337' + images?.data[0]?.attributes?.url
  // const imgArti = 'http://localhost:1337' + product.attributes?.artisan?.attributes?.name
  return (
    <div className='card'>
      <img src={imgUrl} className='product-picture' />

      <div className='card-body'>
        <h3>{name}</h3>
        <p>{description}</p>
        {/* <p>{imgArti}</p> */}
        <p>{price}€</p>
      </div>
    </div>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductsListItem
