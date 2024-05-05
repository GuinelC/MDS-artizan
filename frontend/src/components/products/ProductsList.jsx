import PropTypes from 'prop-types'
import ProductsListItem from './ProductsListItem'
import './ProductsList.css'

/**
 *
 * @param {Array} products
 * @returns {React.Component} ProductList
 */

function ProductsList ({ products }) {
  if (!products || products.length < 1) return 'No data'
  return (
    <div className='flex flex-wrap gap-5'>
      {
        products.map(product => (
          <ProductsListItem key={product.id} product={product} />
        ))
      }
    </div>
  )
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductsList
