import React from 'react';
import notFoundIcon from '../../images/no-image.png'

const BasketCard = ({id, title, price, description, quantity, clickAction, sumPrice}) => {

  let btnDisabled = quantity === 1;

  return (
    <div className='card'>
      <div className="card-image">
        <img src={notFoundIcon} alt={title}/>
      </div>
      <div className="card-content">
        <div className="card-title">
          <span className='card-title-text'>{title}</span>
          <span className='card-title-price'>{sumPrice ? sumPrice : price}$</span>
        </div>
        <div className="card-description">
          <p>{description}</p>
        </div>
        <div className="card-footer">
          <div className='card-quantity'>
            <span>Quantity: {quantity}</span>
          </div>
          <div className="card-btns-wrap">
            <button className='btn btn-minus' onClick={() => clickAction('minus', id, price)} disabled={btnDisabled}>-1</button>
            <button className='btn btn-plus' onClick={() => clickAction('plus', id, price)}>+1</button>
            <button className='btn btn-delete-cart' onClick={() => clickAction('delete', id)}><i className='icon-bin'></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasketCard;