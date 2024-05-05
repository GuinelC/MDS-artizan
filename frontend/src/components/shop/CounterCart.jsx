import React, { useState, useEffect } from 'react';
import { FaCartArrowDown } from 'react-icons/fa6';
import { useCart } from '../../context/cartContext';

function CounterCart() {
    const { state: { items } } = useCart();
    const [cartItemCount, setCartItemCount] = useState(0); // Initialiser le state avec 0

    useEffect(() => {
        // Calculer le nombre total d'articles dans le panier
        const totalCount = items.reduce((total, cartItem) => total + cartItem.qty, 0);
        setCartItemCount(totalCount);
    }, [items]); // Exécuter l'effet lorsque le contenu du panier change

    return (
        <span className='cart-counter' style={{ color: 'black' }}>
            {cartItemCount}
            <FaCartArrowDown size='30px' color='#ac6b4a' className='hover:-translate-y-[2px] transition-all' />
        </span>
    );
}

export default CounterCart;
