import React from 'react';
import notFoundIcon from '../../images/no-image.png';
import { Link } from "react-router-dom";

const Card = ({title, price, description, img, id, deleteProductFromDb, onAddProductToCart, inCart}) => {
  return(
    <div className='card'>
      <div className='card-image'>
        <img src={img ? img : notFoundIcon} alt=""/>
        <button onClick={() => deleteProductFromDb('products', id)} className='btn-delete icon-cancel-circle'></button>
      </div>
      <div className="card-content">
        <div className='card-title'>
          <span className='card-title-text'>{title}:</span>
          <span className='card-title-price'>{price}$</span>
          <Link to={`/edit-view/${id}`} className='btn-edit icon-edit'></Link>
        </div>
        <div className="card-description">
          <p>{description}</p>
        </div>
        <button onClick={() => onAddProductToCart(id)} disabled={inCart} className='btn btn-primary btn-add-cart'><i className='icon-cart'></i>Add to cart</button>
      </div>
    </div>
  )
}

export default Card;