import React, { useState, useEffect } from 'react';
import { useProductsService } from "../../hooks/useProductsService";

const AppContext = React.createContext();

const AppProvider = (props) => {

  const {
    allProducts,
    cartProducts,
    sendNewProductToDb,
    updateDbInfo,
    deleteProductFromDb,
    getProductByTitle,
    syncData,
  } = useProductsService();

  const [loading, setLoading] = useState(true);
  const [loadingCartView, setLoadingCartView] = useState(true);
  const [filterTitle, setFilterTitle] = useState('');

  useEffect(() => {
    if(allProducts) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [allProducts]);
  useEffect(() => {
    if(cartProducts) {
      setLoadingCartView(false);
    } else {
      setLoadingCartView(true);
    }
  }, [cartProducts]);

  const handleNameFilter = (event) => {
    setFilterTitle(event.target.value);
    if(!event.target.value) {
      syncData()
    }
  }

  const filteredByTitle = (event) => {
    event.preventDefault();
    getProductByTitle(filterTitle);
  }

  const clearFilter = () => {
    setFilterTitle('');
    syncData();
  }

  const onAddProductToCart = (id) => {
    const product = allProducts.find(el => el.id === id);
    product.inCart = true;
    product.quantity = 1;
    const {title, description, price, quantity} = product;
    sendNewProductToDb('cart',{
      id,
      title,
      description,
      price,
      quantity
    });
    updateDbInfo('products', id, product);
  }

  const clickAction = (actionType, id ) => {
    const neededProduct = cartProducts.find(el => el.id === id);
    const constPrice = neededProduct.price;
    let sumPrice;
    switch (actionType) {
      case 'minus':
        neededProduct.quantity -= 1;
        sumPrice = constPrice * neededProduct.quantity;
        neededProduct.sumPrice = sumPrice;
        updateDbInfo('cart', id, neededProduct);
        break;
      case 'plus':
        neededProduct.quantity += 1;
        sumPrice = constPrice * neededProduct.quantity;
        neededProduct.sumPrice = sumPrice;
        updateDbInfo('cart', id, neededProduct);
        break;
      case 'delete':
        deleteProductFromDb('cart', id);
        neededProduct.inCart = false;
        updateDbInfo('products', id, neededProduct);
        break;
    }
  }

  return (
    <AppContext.Provider
      value={{
        allProducts,
        loading,
        loadingCartView,
        sendNewProductToDb,
        updateDbInfo,
        deleteProductFromDb,
        filterTitle,
        cartProducts,
        onAddProductToCart,
        filteredByTitle,
        handleNameFilter,
        clearFilter,
        clickAction
      }}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext };

export default AppProvider;