import { useState, useEffect } from 'react';

const useProductsService = () => {

  const _url = 'http://localhost:3000';

  const [allProducts, setAllProducts] = useState(null);
  const [cartProducts, setCartProduct] = useState(null);
  const [isDataUpdated, setDataUpdate] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${_url}/products`)
      .then(res => res.json())
      .then(data => {
        !cancelled && setAllProducts(data);
      });
    fetch(`${_url}/cart`)
      .then(res => res.json())
      .then(data => {
        !cancelled && setCartProduct(data);
      })
    return () => cancelled = true;
  }, [isDataUpdated]);

  const getProductByTitle = async (title) => {
    await fetch(`${_url}/products?title=${title}`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
      })
  }

  const syncData = () => {
    setDataUpdate(isDataUpdated => !isDataUpdated);
  }

  const sendNewProductToDb = async (filterName, data) => {
    try {
      setDataUpdate(false);
      const response = await fetch(`${_url}/${filterName}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('success:', JSON.stringify(json));
      setDataUpdate(true);
      return 'success';
    } catch (error) {
      console.error('error:', error);
      return 'error';
      setDataUpdate(false);
    }
  }

  const deleteProductFromDb = async(filterName, id) => {
    try {
        setDataUpdate(false);
        await fetch(`${_url}/${filterName}/${id}`, {
          method: 'DELETE'
        });
        setDataUpdate(true);
        return 'success';
      } catch (error) {
        console.error('error:', error);
        return 'error';
      }
  }


  const updateDbInfo = async (filterName, id, data) => {
    try {
      setDataUpdate(false);
      const response = await fetch(`${_url}/${filterName}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log('success:', JSON.stringify(json));
      setDataUpdate(true);
      return 'success';
    } catch (error) {
      console.error('error:', error);
      return 'error';
    }
  }

  return {
    allProducts,
    cartProducts,
    getProductByTitle,
    sendNewProductToDb,
    deleteProductFromDb,
    syncData,
    updateDbInfo
  };
}

export { useProductsService };