import React, { useState, useEffect } from 'react';
import { Box, Grid, CircularProgress, Container } from '@mui/material';
import JobsFilter from './JobsFilter';
import JobsList from './JobsList';
import JobsSort from './JobsSort';
import Search from '../Common/Search';
import PagePagination from '../Common/PagePagination';
import { fetchJobs } from '../../api'; // Импорт API-запроса для получения списка вакансий

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
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
    fetchJobs({ filters, sort, page, search })
      .then((response) => {
        //console.log('Fetched Jobs:', response.data.data); // Проверяем структуру данных
        setJobs(response.data.data); // Если пагинация в Laravel, доступ к данным будет через `response.data.data`
        setTotalPages(response.data.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
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
          <JobsFilter onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box mb={2}>
            <Search onSearch={handleSearch} />
          </Box>
          <Box mb={2}>
            <JobsSort onSortChange={setSort} />
          </Box>
          <JobsList jobs={jobs} />
          <PagePagination onPageChange={setPage} totalPages={totalPages} currentPage={page} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobsPage;
