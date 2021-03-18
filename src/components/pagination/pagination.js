import React from 'react';

const Pagination = ({currentPage, itemPerPage, totalPosts, paginate}) => {

  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {
          pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={(event) => paginate(event, number)} href="#" className='page-link'>
                {number}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Pagination;