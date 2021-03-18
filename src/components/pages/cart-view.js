import React, { useContext } from 'react';
import { AppContext } from "../appContext";
import BasketCard from "../basketCard";
import {Link} from "react-router-dom";

const CartView = () => {
  const { cartProducts , loadingCartView, clickAction} = useContext(AppContext);

  if(loadingCartView) {
    return <h1>Loading...</h1>
  }

  if(cartProducts.length === 0) {
    return (
      <div className='container'>
        <h2>Sorry, no items here :(</h2>
        <Link to={'/'}>Go back</Link>
      </div>
    )
  }

  const result = cartProducts.map((el) => {
    return el.sumPrice ? el.sumPrice : el.price;
  }).reduce((sum, current) => sum + current);


  return(
    <div className='container'>
      <div className="title">
        <h2>Cart View</h2>
        <h4>Total: {result}$</h4>
      </div>
      <ul className="cards-list">
        {
          cartProducts.map(({id, title, description, price, img, quantity, sumPrice}) => {
            return (
              <li key={id}>
                <BasketCard
                  id={id}
                  title={title}
                  description={description}
                  price={price}
                  img={img}
                  quantity={quantity}
                  clickAction={clickAction}
                  sumPrice={sumPrice}
                />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default CartView;