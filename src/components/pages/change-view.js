import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../appContext";
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom'

const ChangeView = (props) => {

  const { allProducts, sendNewProductToDb, updateDbInfo, loading } = useContext(AppContext);
  const [viewTitle, setViewTitle] = useState('Create View')
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [validate, setValidate] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [productId, setProductId] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    if(!title || !description || !price) {
      setValidate(false);
    } else if (price <= 0) {
      setValidate(false);
    }
  }, [title, description, price])

  useEffect(() => {
    if(!allProducts) {
      return
    }
    if(props.match.params.id) {
      setProductId(props.match.params.id);
      const neededProduct = allProducts.find(el => el.id === props.match.params.id);
      setViewTitle('Edit View');
      if(!neededProduct) {
        setError(true);
      } else {
        setError(false);
        setCurrentProduct(neededProduct)
        const {title, price, description} = neededProduct;
        setTitle(title);
        setPrice(price);
        setDescription(description);
      }
    }
  }, [allProducts])

  const saveData = (event) => {
    event.preventDefault();
    if(!productId) {
      sendNewProductToDb('products',{
        title,
        price: +price,
        description,
        inCart: false
      }).then(() => {
        setRedirect(true);
      });
    } else {
      const {inCart} = currentProduct;
      updateDbInfo('products', productId, {
        title,
        description,
        price,
        inCart
      }).then(() => {
        setRedirect(true);
      });
    }
  }

  const handleTitleChange = (event) => {
    let target = event.target;
    if(target.value.length > 13) {
      setValidate(false);
    } else {
      setValidate(true);
    }
    setTitle(target.value);
  }

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    if(event.target.value <= 0) {
      setValidate(false);
      return;
    }
    if(event.target.value > 9999) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }

  const handleDescriptionChange = (event) => {
    if(event.target.value.length > 350) {
      setValidate(false);
    } else {
      setValidate(true);
    }
    setDescription(event.target.value);
  }

  if(redirect) {
    return <Redirect to='/'/>;
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

  return(
    <div className='container'>
      {
        error
        ?
        <h2>Sorry, we can't find this item</h2>
        :
        <>
          <h2>{viewTitle}</h2>
          <form onSubmit={saveData} className='change-form'>
            <div className="field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" value={title} onChange={handleTitleChange}/>
              <span>Max symbols: 13</span>
            </div>
            <div className="field">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" value={price} onChange={handlePriceChange} />
              <span>Max price: 9999</span>
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea type="text" id="description" value={description} onChange={handleDescriptionChange} />
              <span>Max symbols: 350</span>
            </div>
            <button type='submit' className='btn btn-primary' disabled={!validate}>Save</button>
          </form>
        </>
      }
    </div>
  )
}

export default withRouter(ChangeView);