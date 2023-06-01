import './styles.css';
import cartIcon from '../../assets/cart.svg';
import { useContext, useState } from 'react';
import * as cartService from '../../services/cart-service.ts';
import { ContextCartCount } from '../../utils/context-cart.ts';


export default function CartIcon()
{
    const { contextCartCount } = useContext(ContextCartCount);

    return (
        <>
            <img src={cartIcon} alt="Carrinho de compras" />
            {
                contextCartCount > 0 &&
                <div className="dsc-cart-count">{contextCartCount}</div>
            }
        </>
    );
}