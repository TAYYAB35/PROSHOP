import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const navigate = useNavigate();

  const handleClick = (pageNumber) => {
    const path = !isAdmin ? keyword ? `/search/${keyword}/page/${pageNumber}` : `/page/${pageNumber}` : `/admin/productlist/${pageNumber}`;

    navigate(path);
  };

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === page}
            onClick={() => handleClick(x + 1)}
            style={{ cursor: 'pointer' }}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
