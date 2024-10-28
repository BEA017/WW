import React from 'react';
import { Pagination } from '@mui/material';

const JobsPagination = ({ onPageChange, totalPages }) => {
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Pagination count={totalPages} onChange={handlePageChange} sx={{ mt: 2 }} />
  );
};

export default JobsPagination;


// import React from 'react';
// import { Pagination } from '@mui/material';

// const JobsPagination = () => (
//   <Pagination count={10} variant="outlined" shape="rounded" />
// );

// export default JobsPagination;



// // import React from 'react';

// // const JobsPagination = ({ currentPage, totalPages, onPageChange }) => {
// //   const pages = [];

// //   for (let i = 1; i <= totalPages; i++) {
// //     pages.push(
// //       <button key={i} onClick={() => onPageChange(i)} disabled={currentPage === i}>
// //         {i}
// //       </button>
// //     );
// //   }

// //   return (
// //     <div>
// //       <h2>Pagination</h2>
// //       <div>
// //         {pages}
// //       </div>
// //     </div>
// //   );
// // };

// // export default JobsPagination;
