import React, { useState, useEffect } from 'react';
import { Tabs, Tab, CircularProgress, Typography, Button, Container, Grid, Avatar, Box } from '@mui/material';
import ResumesListSD from './ResumesListSD';
import PagePagination from '../../Common/PagePagination';
import Search from '../../Common/Search';
import { fetchPersonalResumes } from '../../../api';
import { useNavigate } from 'react-router-dom';

const SeekerDashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState('1');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [avatar, setAvatar] = useState('');

  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1);
  };

  useEffect(() => {
    fetchPersonalResumes({ page, search, ad_status: tabValue })
      .then((response) => {
        setName(response.user_name);
        setUserId(response.user_id);
        setAvatar(response.avatar);
        setResumes(response.resumes.data);
        setTotalPages(response.resumes.last_page);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [page, search, tabValue]);

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
    navigate('/resumes/create_resume_page');
  };

  const handleSettingsClick = () => {
    navigate(`/user/${userId}/edit`);
  };

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{name}</Typography>
      <Grid container spacing={4}>
        
        {/* Правая колонка будет первой на узком экране */}
        <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center">       
              <Button variant="contained" size="small" color="primary" fullWidth onClick={handleSettingsClick}>
                Настройки аккаунта
              </Button>
            </Box>
          </Grid>
          <Box sx={{ p: 2 }} display="flex" flexDirection="row" alignItems="left">
            <Avatar
              alt={avatar}
              src={`/images/avatars/${avatar}`}
              sx={{ width: 230, height: 230}}
              variant="rounded"
            />
          </Box>
          <Grid item xs={12} md={8}>
            <Button variant="contained" size="small" color="success" fullWidth onClick={BtnCreateClick}>
              Создать резюме
            </Button>
          </Grid>
        </Grid>

        {/* Левая колонка, которая будет второй на узком экране */}
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
            <ResumesListSD resumes={resumes} />
          )}
          
          <PagePagination onPageChange={setPage} totalPages={totalPages} currentPage={page} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SeekerDashboard;
