import React, { useState, useEffect } from 'react';
import { Box, Grid, CircularProgress, Container } from '@mui/material';
import ResumesFilter from './ResumesFilter';
import ResumesList from './ResumesList';
import Sort from '../Common/Sort';
import PagePagination from '../Common/PagePagination';
import Search from '../Common/Search';
import { fetchResumes } from '../../api'; // Импорт API-запроса для получения списка резюме

const ResumesPage = () => {
  const [resumes, setResumes] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1); // Сбрасываем страницу на первую при выполнении поиска
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Сбрасываем страницу на первую при изменении фильтров
  };

  useEffect(() => {
    // Получение списка резюме с учетом фильтров, сортировки и пагинации
    fetchResumes({ filters, sort, page, search })
      .then((response) => {
        //console.log('Fetched Resumes:', response.data.data);
        setResumes(response.data.data);
        setTotalPages(response.data.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching resumes:', error);
        setLoading(false);
      });
  }, [filters, sort, page, search]);

  // Прокрутка страницы вверх при смене страницы
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Плавная прокрутка
    });
  }, [page]); // Срабатывает при изменении страницы

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg" sx={{ padding: { xs: 2, md: 3 }, marginBottom: { xs: 3, md: 5 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ResumesFilter onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box mb={2}>
            <Search onSearch={handleSearch} />
          </Box>
          {/* <Box mb={2}>
            <Sort onSortChange={setSort} />
          </Box> */}
          {loading ? (
            <CircularProgress />
          ) : (
            <ResumesList resumes={resumes} />
          )}
          <PagePagination onPageChange={setPage} totalPages={totalPages} currentPage={page} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResumesPage;



// import React, { useState, useEffect } from 'react';
// import { Box, Grid, CircularProgress, Typography  } from '@mui/material';
// import ResumesFilter from './ResumesFilter';
// import ResumesList from './ResumesList';
// import Sort from '../Common/Sort';
// import PagePagination from '../Common/PagePagination';
// import Search from '../Common/Search';
// import { fetchResumes } from '../../api'; // Импорт API-запроса для получения списка резюме

// const ResumesPage = () => {
//   const [resumes, setResumes] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState('');
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const handleSearch = (query) => {
//     setSearch(query);
//     setPage(1); // Сбрасываем страницу на первую при выполнении поиска
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setPage(1); // Сбрасываем страницу на первую при изменении фильтров
//   };

//   useEffect(() => {
//     // Получение списка резюме с учетом фильтров, сортировки и пагинации
//     fetchResumes({ filters, sort, page, search })
//     .then((response) => {
//       //console.log('Fetched Resumes:', response.data.data);  
//       setResumes(response.data.data);  
//       setTotalPages(response.data.last_page);  
//       setLoading(false);
//     })
//     .catch((error) => {
//       console.error('Error fetching resumes:', error);
//       setLoading(false);
//     });
// }, [filters, sort, page, search]);

//    // Прокрутка страницы вверх при смене страницы
//    useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth', // Плавная прокрутка
//     });
//   }, [page]); // Срабатывает при изменении страницы

//   if (loading) return( <CircularProgress  />);

//   return (
//     <Box>
    
//       <Grid container spacing={2}> 
        
//         <Grid item xs={12} md={3}>
        
//           <ResumesFilter onFilterChange={handleFilterChange} />
//         </Grid>
//         <Grid item xs={12} md={9}>
          
//           <Search onSearch={handleSearch} />
//           <Sort onSortChange={setSort} />
//           {loading ? ( <CircularProgress />  ) : (  <ResumesList resumes={resumes} />  )}
//           <PagePagination
//             onPageChange={setPage}
//             totalPages={totalPages}
//             currentPage={page}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
 
// export default ResumesPage;
 