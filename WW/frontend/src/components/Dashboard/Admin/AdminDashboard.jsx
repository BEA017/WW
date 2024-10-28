import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, CircularProgress, Button, Typography, TextField, Pagination, Grid, Modal, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { fetchUsers, fetchStatistics, fetchCategoriesA, fetchLocationsA, addCategory, addLocation, deleteCategory, deleteLocation } from '../../../api';
import UserModal from './UserModal';

const AdminPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Количество элементов на странице

  useEffect(() => {   
    loadData();
  }, [tabIndex, currentPage, search]);

 const loadData = () => {
   
      setLoading(true);
      const params = { page: currentPage, search };

      switch (tabIndex) {
        case 0:
          fetchUsers(params).then((response) => {
            setData(response.users.data);
            setTotalPages(response.users.last_page);
            setLoading(false);
          });
          break;
  
        case 1:
          fetchCategoriesA(params).then((response) => {
            setData(response.categories.data);
            setTotalPages(response.categories.last_page);
            setLoading(false);
          });
          break;
        case 2:
          fetchLocationsA(params).then((response) => {
            setData(response.locations.data);
            setTotalPages(response.locations.last_page);            
            setLoading(false);
          });
          break;          
        case 3:
          fetchStatistics(params).then((response) => {
             setData(response);
            setTotalPages(1);
            setLoading(false);
          });
          break;
        default:
          break;
      }
    };

  const reloadData = () => {}
  
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

  const handleAddCategory = () => {
    addCategory({ name: newCategory }).then(() => {
      setNewCategory('');
      loadData()
    });
  };

  const handleAddLocation = () => {
    addLocation({ name: newLocation }).then(() => {
      setNewLocation('');
      loadData()
    });
  };

  const handleOpenConfirmModal = (item, type) => {
    if (type === 'category') {
      setSelectedCategory(item);
    } else {
      setSelectedLocation(item);
    }
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setSelectedCategory(null);
    setSelectedLocation(null);
    setOpenConfirmModal(false);
    loadData()
  };

  const confirmDelete = async () => {
    setLoadingDelete(true);
    if (selectedCategory) {
      await deleteCategory(selectedCategory.id);
    } else if (selectedLocation) {
      await deleteLocation(selectedLocation.id);
    } 
    setLoadingDelete(false);
    handleCloseConfirmModal();
  };

  return (
    <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 5, p: { xs: 2, sm: 3, md: 4 }, borderRadius: '8px', boxShadow: 3 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Пользователи" />         
        <Tab label="Категории" />
        <Tab label="Локации" />
        <Tab label="Статистика" />
      </Tabs>

      <TextField fullWidth label="Поиск" value={search} onChange={(e) => handleSearch(e.target.value)} sx={{ mt: 3 }} />

      {!loading && Array.isArray(data) && (
  <>
    {tabIndex === 0 && (
      <Box>
        <Typography variant="h5">Пользователи</Typography>
        <Grid container spacing={2}>
          {data.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                <Typography>{user.name}</Typography>
                <Typography>Роль: {user.role}</Typography>
                <Button onClick={() => setSelectedUser(user.id)} sx={{ mt: 1 }}>Управлять</Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
      </Box>
    )}

    {tabIndex === 1 && (
      <Box>
        <Typography variant="h5">Категории</Typography>
        {/* Рендеринг категорий */}
        <Grid container spacing={2}>
          {data.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                <Typography>{category.name}</Typography>
                <Button
                  color="error"
                  onClick={() => handleOpenConfirmModal(category, 'category')}
                  sx={{ mt: 1 }}
                >
                  Удалить
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
      </Box>
    )}

    {tabIndex === 2 && (
      <Box>
        <Typography variant="h5">Локации</Typography>
        {/* Рендеринг локаций */}
        <Grid container spacing={2}>
          {data.map((location) => (
            <Grid item xs={12} sm={6} md={4} key={location.id}>
              <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                <Typography>{location.name}</Typography>
                <Button
                  color="error"
                  onClick={() => handleOpenConfirmModal(location, 'location')}
                  sx={{ mt: 1 }}
                >
                  Удалить
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
      </Box>
    )}
  </>
)}

{tabIndex === 3 && !loading && (
  <Box>
    <Typography variant="h5">Статистика</Typography>
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Typography variant="h6">Соискателей: {data.userCount}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Работодателей: {data.companyCount}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Вакансии активные: {data.ajobCount}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Вакансии в обработке: {data.tcjobCount}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Резюме активные: {data.aresumeCount}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Резюме в обработке: {data.tcresumeCount}</Typography>
      </Grid>
    </Grid>
  </Box>
)}
       {selectedUser && <UserModal userId={selectedUser} open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} onDataChange={loadData}/>}

       {/* Модальное окно для подтверждения удаления */}
        <Modal open={openConfirmModal} onClose={handleCloseConfirmModal}>
            <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: '8px', textAlign: 'center', width: '300px', margin: 'auto', mt: '15%' }}>
              <Typography variant="h6">Вы уверены, что хотите удалить?</Typography>
              {loadingDelete ? (
                <CircularProgress sx={{ mt: 2 }} />
              ) : (
                <>
                  <Button onClick={confirmDelete} color="error" sx={{ mt: 2 }}>
                    Удалить
                  </Button>
                  <Button onClick={handleCloseConfirmModal} sx={{ mt: 2 }}>
                    Отмена
                  </Button>
                </>
              )}
            </Box>
        </Modal>
    </Box>
  );
};

export default AdminPage;


// import React, { useEffect, useState } from 'react';
// import { Tabs, Tab, Box, CircularProgress, Button, Typography, Pagination, Grid } from '@mui/material';
// import Search from '../../Common/Search';
// import { fetchUsers, fetchJobsA, fetchResumesA, fetchCategoriesA, fetchLocationsA, fetchStatistics } from '../../../api';

// const AdminPage = () => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [data, setData] = useState([]);
//   const [statistics, setStatistics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   // Load data based on selected tab
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       const params = { page: currentPage, search };

//       try {
//         switch (tabIndex) {
//           case 0:
//             const userResponse = await fetchUsers(params);
//             setData(userResponse.users.data);
//             setTotalPages(userResponse.users.last_page);
//             break;
//           case 1:
//             const jobResponse = await fetchJobsA(params);
//             setData(jobResponse.jobs.data);
//             setTotalPages(jobResponse.jobs.last_page);
//             break;
//           case 2:
//             const resumeResponse = await fetchResumesA(params);
//             setData(resumeResponse.resumes.data);
//             setTotalPages(resumeResponse.resumes.last_page);
//             break;
//           case 3:
//             const categoryResponse = await fetchCategoriesA();
//             setData(categoryResponse.categories);
//             break;
//           case 4:
//             const locationResponse = await fetchLocationsA();
//             setData(locationResponse.locations);
//             break;
//           case 5:
//             const statisticsResponse = await fetchStatistics();
//             setStatistics(statisticsResponse);
//             break;
//           default:
//             break;
//         }
//       } catch (error) {
//         console.error('Error loading data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [tabIndex, currentPage, search]);

//   const handleTabChange = (event, newIndex) => {
//     setTabIndex(newIndex);
//     setSearch('');
//     setCurrentPage(1);
//   };

//   const handleSearch = (query) => {
//     setSearch(query);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };

//   const filteredData = (data) => {
//     return data.filter((item) =>
//       item.name?.toLowerCase().includes(search.toLowerCase())
//     );
//   };

//   return (
//     <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 5, p: { xs: 2, sm: 3, md: 4 }, borderRadius: '8px', boxShadow: 3 }}>
//       <Tabs
//         value={tabIndex}
//         onChange={handleTabChange}
//         variant="scrollable"
//         scrollButtons="auto"
//         sx={{ borderBottom: 1, borderColor: 'divider' }}
//       >
//         <Tab label="Пользователи" />
//         <Tab label="Вакансии" />
//         <Tab label="Резюме" />
//         <Tab label="Категории" />
//         <Tab label="Локации" />
//         <Tab label="Статистика" />
//       </Tabs>
//       <Search onSearch={handleSearch} />

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <>
//           {tabIndex < 5 && (
//             <Box>
//               <Grid container spacing={2}>
//                 {filteredData(data).map((item) => (
//                   <Grid item xs={12} sm={6} md={4} key={item.id}>
//                     <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
//                       <Typography>{item.name || item.title}</Typography>
//                       <Typography>{item.role}</Typography>
//                       <Button sx={{ mt: 1 }}>Управлять</Button>
//                     </Box>
//                   </Grid>
//                 ))}
//               </Grid>
//               {totalPages > 1 && (
//                 <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
//               )}
//             </Box>
//           )}

//           {tabIndex === 5 && statistics && (
//             <Box>
//               <Typography variant="h5">Статистика</Typography>
//               <Typography>Пользователи: {statistics.total_users}</Typography>
//               <Typography>Вакансии: {statistics.total_jobs}</Typography>
//               <Typography>Резюме: {statistics.total_resumes}</Typography>
//             </Box>
//           )}
//         </>
//       )}
//     </Box>
//   );
// };

// export default AdminPage;


// // import React, { useEffect, useState } from 'react';
// // import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
// // import axios from 'axios';
// // import { fetchUsers } from '../../../api';

// // const AdminDashboard = () => {
// //     const [users, setUsers] = useState([]);
// //     const [stats, setStats] = useState({ userCount: 0, jobCount: 0, resumeCount: 0 });
// //     const [page, setPage] = useState(1);
// //     const [totalPages, setTotalPages] = useState(1);
// //     const [search, setSearch] = useState('');
// //     const [loading, setLoading] = useState(true);


// //     useEffect(() => {
      
// //         fetchUsers({ page, search })
// //         .then((response) => {
// //            //console.log('Fetched Users:', response.users.data );  
// //           setUsers(response.users.data);
// //           setTotalPages(response.users.last_page);
// //           setLoading(false);
// //         })
// //         .catch((error) => {
// //           // console.error('Error fetching resumes:', error);
// //           setLoading(false);
// //         });
// //     }, [page, search]);

// //     //     // Fetch statistics
// //     //     axios.get('/api/admin/stats').then(response => {
// //     //         setStats(response.data);
// //     //     });
// //     // }, []);

// //     return (
// //         <Container>
// //             <Typography variant="h4" gutterBottom>
// //                 Панель Администратора
// //             </Typography>

// //             <Grid container spacing={3}>
// //                 {/* Статистика */}
// //                 <Grid item xs={4}>
// //                     <Paper elevation={3} style={{ padding: '20px' }}>
// //                         <Typography variant="h6">Пользователей: {stats.userCount}</Typography>
// //                     </Paper>
// //                 </Grid>
// //                 <Grid item xs={4}>
// //                     <Paper elevation={3} style={{ padding: '20px' }}>
// //                         <Typography variant="h6">Вакансий: {stats.jobCount}</Typography>
// //                     </Paper>
// //                 </Grid>
// //                 <Grid item xs={4}>
// //                     <Paper elevation={3} style={{ padding: '20px' }}>
// //                         <Typography variant="h6">Резюме: {stats.resumeCount}</Typography>
// //                     </Paper>
// //                 </Grid>

// //                 {/* Список пользователей */}
// //                 <Grid item xs={12}>
// //                     <Paper elevation={3} style={{ padding: '20px' }}>
// //                         <Typography variant="h6" gutterBottom>Пользователи</Typography>
// //                         <TableContainer component={Paper}>
// //                             <Table>
// //                                 <TableHead>
// //                                     <TableRow>
// //                                         <TableCell>Имя</TableCell>
// //                                         <TableCell>Email</TableCell>
// //                                         <TableCell>Роль</TableCell>
// //                                     </TableRow>
// //                                 </TableHead>
// //                                 <TableBody>
// //                                     {users.map(user => (
// //                                         <TableRow key={user.id}>
// //                                             <TableCell>{user.name}</TableCell>
// //                                             <TableCell>{user.email}</TableCell>
// //                                             <TableCell>{user.role}</TableCell>
// //                                         </TableRow>
// //                                     ))}
// //                                 </TableBody>
// //                             </Table>
// //                         </TableContainer>
// //                     </Paper>
// //                 </Grid>
// //             </Grid>
// //         </Container>
// //     );
// // };

// // export default AdminDashboard;
