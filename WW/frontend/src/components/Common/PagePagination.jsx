import React, { useEffect } from 'react';
import { Pagination } from '@mui/material';

const PagePagination = ({ onPageChange, totalPages, currentPage }) => {
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  useEffect(() => {
    // Прокрутка вверх при изменении страницы
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // плавная прокрутка, можно убрать для мгновенной прокрутки
    });
  }, [currentPage]); // срабатывает при изменении currentPage

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      sx={{ mt: 2 }}
    />
  );
};

export default PagePagination;