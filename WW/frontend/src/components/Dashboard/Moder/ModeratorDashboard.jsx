import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, CircularProgress, Button, Typography, TextField, Pagination, Grid } from '@mui/material';
import JobModal from './JobModal';
import ResumeModal from './ResumeModal';
import CompanyModal from './CompanyModal';
import Search from '../../Common/Search';

import { fetchUnverifiedJobs, fetchUnverifiedResumes, fetchActiveJobs, fetchActiveResumes, fetchCompanies } from '../../../api';

const ModeratorPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [activeResumes, setActiveResumes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [search, setSearch] = useState('');

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Количество элементов на странице

  // Загрузка данных с поддержкой пагинации
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      const params = { page: currentPage,  search };

      switch (tabIndex) {
        case 0:
           fetchUnverifiedJobs(params).then((response) => {
             setJobs(response.data.jobs.data);
            setTotalPages(response.data.jobs.last_page);
            setLoading(false);
          }).catch(() => setLoading(false)); // обработка ошибки
          break;
        case 1:fetchActiveJobs(params).then((response) => {
            setActiveJobs(response.data.jobs.data);
            setTotalPages(response.data.jobs.last_page);
            setLoading(false);
          }).catch(() => setLoading(false)); // обработка ошибки          
          break;
        case 2:
          fetchUnverifiedResumes(params).then((response) => {
            setResumes(response.data.resumes.data);
            setTotalPages(response.data.resumes.last_page);
            setLoading(false);
          }).catch(() => setLoading(false)); // обработка ошибки
          break;
        case 3:
          fetchActiveResumes(params).then((response) => {
            setActiveResumes(response.data.resumes.data);
            setTotalPages(response.data.resumes.last_page);
            setLoading(false);
          }).catch(() => setLoading(false)); // обработка ошибки
          break;
        case 4:
          fetchCompanies(params).then((response) => {
            setCompanies(response.data.companies.data);
            setTotalPages(response.data.companies.last_page);
            setLoading(false);
          }).catch(() => setLoading(false)); // обработка ошибки
          break;
        default:
          break;
      }
    };

    loadData();
  }, [tabIndex, currentPage, search]);
  
  const reloadData = () => {
    setLoading(true);
    const params = { page: currentPage, search };
  
    switch (tabIndex) {
      case 0:
        fetchUnverifiedJobs(params).then((response) => {
          setJobs(response.data.jobs.data);
          setTotalPages(response.data.jobs.last_page);
          setLoading(false);
        }).catch(() => setLoading(false));
        break;
      case 1:
        fetchActiveJobs(params).then((response) => {
          setActiveJobs(response.data.jobs.data);
          setTotalPages(response.data.jobs.last_page);
          setLoading(false);
        }).catch(() => setLoading(false));
        break;
      case 2:
        fetchUnverifiedResumes(params).then((response) => {
          setResumes(response.data.resumes.data);
          setTotalPages(response.data.resumes.last_page);
          setLoading(false);
        }).catch(() => setLoading(false));
        break;
      case 3:
        fetchActiveResumes(params).then((response) => {
          setActiveResumes(response.data.resumes.data);
          setTotalPages(response.data.resumes.last_page);
          setLoading(false);
        }).catch(() => setLoading(false));
        break;
      case 4:
        fetchCompanies(params).then((response) => {
          setCompanies(response.data.companies.data);
          setTotalPages(response.data.companies.last_page);
          setLoading(false);
        }).catch(() => setLoading(false));
        break;
      default:
        break;
    }
  };
  
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setSearch('');
    setCurrentPage(1); // Сбрасываем на первую страницу при смене вкладки
  };

  const handleSearch = (query) => {
    setSearch(query);
    setCurrentPage(1); // Сбрасываем страницу на первую при выполнении поиска
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Обновление текущей страницы
  };

  const filteredData = (data) => {
    return data.filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) || item.resume_name?.toLowerCase().includes(search.toLowerCase()) || item.name?.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 5, p: { xs: 2, sm: 3, md: 4 }, borderRadius: '8px', boxShadow: 3 }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Непроверенные вакансии" />     
        <Tab label="Активные вакансии" />
        <Tab label="Непроверенные резюме" />
        <Tab label="Активные резюме" />
        <Tab label="Компании" />
      </Tabs>
      <Search onSearch={handleSearch} />


      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {tabIndex === 0 && (
            <Box>
              <Typography variant="h5">Непроверенные вакансии</Typography>
              <Grid container spacing={2}>
                {filteredData(jobs).map((job) => (
                  <Grid item xs={12} sm={6} md={4} key={job.id}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                      <Typography>{job.title}</Typography>
                      <Button onClick={() => setSelectedJob(job.id)} sx={{ mt: 1 }}>Проверить</Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
            </Box>
          )}

          {tabIndex === 2 && (
            <Box>
              <Typography variant="h5">Непроверенные резюме</Typography>
              <Grid container spacing={2}>
                {filteredData(resumes).map((resume) => (
                  <Grid item xs={12} sm={6} md={4} key={resume.id}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                      <Typography>{resume.resume_name}</Typography>
                      <Button onClick={() => setSelectedResume(resume.id)} sx={{ mt: 1 }}>Проверить</Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
            </Box>
          )}

          {tabIndex === 1 && (
            <Box>
              <Typography variant="h5">Активные вакансии</Typography>
              <Grid container spacing={2}>
                {filteredData(activeJobs).map((job) => (
                  <Grid item xs={12} sm={6} md={4} key={job.id}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                      <Typography>{job.title}</Typography>
                      <Button onClick={() => setSelectedJob(job.id)} sx={{ mt: 1 }}>Просмотреть</Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
            </Box>
          )}

          {tabIndex === 3 && (
            <Box>
              <Typography variant="h5">Активные резюме</Typography>
              <Grid container spacing={2}>
                {filteredData(activeResumes).map((resume) => (
                  <Grid item xs={12} sm={6} md={4} key={resume.id}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                      <Typography>{resume.resume_name}</Typography>
                      <Button onClick={() => setSelectedResume(resume.id)} sx={{ mt: 1 }}>Просмотреть</Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
            </Box>
          )}

          {tabIndex === 4 && (
            <Box>
              <Typography variant="h5">Компании</Typography>
              <Grid container spacing={2}>
                {filteredData(companies).map((company) => (
                  <Grid item xs={12} sm={6} md={4} key={company.id}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                      <Typography>{company.name}</Typography>
                      <Button onClick={() => setSelectedCompany(company.id)} sx={{ mt: 1 }}>Просмотреть</Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
            </Box>
          )}
        </>
      )}

      {/* Модальные окна */}
      {selectedJob && <JobModal jobId={selectedJob} open={Boolean(selectedJob)} onClose={() => setSelectedJob(null)} onDataChange={reloadData}/>}
      {selectedResume && <ResumeModal resumeId={selectedResume} open={Boolean(selectedResume)} onClose={() => setSelectedResume(null)} onDataChange={reloadData}/>}
      {selectedCompany && <CompanyModal companyId={selectedCompany} open={Boolean(selectedCompany)} onClose={() => setSelectedCompany(null)} onDataChange={reloadData}/>}
    </Box>
  );
};

export default ModeratorPage;

 