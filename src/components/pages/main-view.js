import React, { useContext, useState } from 'react';
import Card from "../card";
import { Link } from "react-router-dom";
import { AppContext } from "../appContext";
import Pagination from "../pagination";

const MainView = () => {

  const {
    allProducts,
    loading,
    handleNameFilter,
    deleteProductFromDb,
    onAddProductToCart,
    filteredByTitle,
    filterTitle,
    clearFilter,
    cartProducts
  } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  if(loading) {
    return <h1>Loading...</h1>
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct  = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const onPaginate = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  }

  return (
    <div className='container'>
      <h1>Main View</h1>
      <Link to={'/cart-view'} className='btn-cart'><span>{cartProducts && cartProducts.length}</span><i className='icon-cart'></i></Link>
      <div className="cards-wrap">
        <div className="cards-wrap-header">
          <div className="form-wrap">
            <form onSubmit={filteredByTitle}>
              <button className='btn btn-primary' disabled={!filterTitle}>Filter by Title:</button>
              <input type="text" placeholder="Title..." onChange={handleNameFilter} value={filterTitle}/>
            </form>
            <button className='btn btn-link' disabled={!filterTitle} onClick={clearFilter}>Clear Filter</button>
          </div>
          <Link to={'/create-view'} className="btn-add-item">Add new product<i className='icon-plus-circle'></i></Link>
        </div>
          <div className="cards-wrap-body">
            <ul className="cards-list">
              {
                currentProducts.map(({id, title, description, price, img, inCart}) => {
                  return (
                    <li key={id}>
                      <Card
                        title={title}
                        description={description}
                        price={price}
                        img={img}
                        id={id}
                        deleteProductFromDb={deleteProductFromDb}
                        onAddProductToCart={onAddProductToCart}
                        inCart={inCart}/>
                    </li>
                  )
                })
              }
            </ul>
          </div>
      </div>
      <Pagination
        currentPage={currentPage}
        itemPerPage={productsPerPage}
        totalPosts={allProducts.length}
        paginate={onPaginate}/>
    </div>
  )
}

export default MainView;