import JobListED from './JobListED';
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, CircularProgress, Typography, Button, Container, Grid, Avatar, Box, IconButton  } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PagePagination from '../../Common/PagePagination';
import Search from '../../Common/Search';
import { fetchPersonalJobs } from '../../../api';
import { useNavigate } from 'react-router-dom';
 

const EmployeerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState('1');
  const [companyId, setCompanyId] = useState('');
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');

  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1); // Сбрасываем страницу на первую при выполнении поиска
  };

  useEffect(() => {
   loadData();
  }, [page, search, tabValue]);

  const loadData = () => {
   

    fetchPersonalJobs({ page, search, ad_status: tabValue })
      .then((response) => {
        // //console.log('Fetched :', response.jobs.data);  
        setName(response.company_name);
        setLogo(response.company_logo);
        setCompanyId(response.company_id);
        setJobs(response.jobs.data);
        setTotalPages(response.jobs.last_page);
        setLoading(false);
      })
      .catch((error) => {
        // console.error('Error fetching jobsRRRRR:', error);
        setLoading(false);
      });

  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const BtnCreateClick = () => {
    navigate('/jobs/create_job_page');
  };
  
  const handleSettingsClick = () => {
    navigate(`/company/${companyId}/edit`);
    
    // Переход на страницу настроек
  };
  if (loading) return <CircularProgress />;

  return (
    <Container>
     <Grid container spacing={4}>
  {/* Правая колонка будет первой на малом экране */}
  <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
    <Box display="flex" alignItems="center">
      <Grid item xs={12} md={8}>
        <Box display="flex" alignItems="center">       
          <Button variant="contained" size="small" color="primary" fullWidth onClick={handleSettingsClick} sx={{ mt: 1 }}>
            Настройки аккаунта
          </Button>
        </Box>
      </Grid>
    </Box>

    <Box sx={{ p: 2 }} display="flex" flexDirection="row" alignItems="left">
      <Avatar
        alt={logo}
        src={`/images/logos/${logo}`}
        sx={{ width: 230, height: 230 }}
        variant="rounded"
      />
    </Box>

    <Box sx={{ p: 2 }} display="flex" alignItems="center">
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
    </Box>

    <Grid item xs={12} md={8}>
      <Box display="flex" alignItems="center">
        <Button variant="contained" size="small" color="success" fullWidth onClick={BtnCreateClick}>
          Создать вакансию
        </Button>
      </Box>
    </Grid>
  </Grid>

  {/* Левая колонка, которая будет второй на малом экране */}
  <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
    <Tabs value={tabValue} onChange={handleTabChange}>
      <Tab label="Активные" value="1" />
      <Tab label="На проверке" value="2" />
      <Tab label="Черновики" value="3" />
      <Tab label="Архив" value="4" />
    </Tabs>
    <Search onSearch={handleSearch} />
    
    {loading ? (
      <CircularProgress />
    ) : (
      <JobListED jobs={jobs} />
    )}
    
    <PagePagination onPageChange={setPage} totalPages={totalPages} currentPage={page} />
  </Grid>
</Grid>

    </Container>
  );
};

export default EmployeerDashboard;

