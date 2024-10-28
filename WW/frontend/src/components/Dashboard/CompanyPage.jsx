
import React, { useEffect, useState } from 'react';
import { Card, CardContent,  Typography, Grid, Box, Button, Collapse, Rating, Avatar, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompany } from '../../api';

const CompanyPage = () => {
  const { id } = useParams();  // Получаем id компании из параметров URL
  const [company, setCompany] = useState(null);
  const [jobsVisible, setJobsVisible] = useState(false);  // Состояние для отображения списка вакансий
  const navigate = useNavigate();  // Используем хук navigate для переходов

  useEffect(() => {
    const loadData = async (companyId) => {
      try {
        // Подставляем id компании в запрос
        const compData = await fetchCompany(companyId);
        setCompany(compData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData(id);
  }, [id]);

  if (!company) {
    return <Typography>Загрузка...</Typography>;
  }

  return (
    <Container>
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Левый верхний блок с логотипом, рейтингом и количеством вакансий */}
        <Grid item xs={12} md={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Avatar
               sx={{ width: 80, height: 80, borderRadius: '50%' }}  // Уменьшение размера логотипа
              src={`/images/logos/${company.logo}`}  // Ссылка на логотип
              alt={company.name}
            />
 
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="div">{company.name}</Typography>
              <Rating value={company.rating || 0} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                Вакансий: {company.jobs ? company.jobs.length : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Центральный блок с описанием и возможностью показать/скрыть список вакансий */}
        <Grid item xs={12} md={9}>
          <Typography variant="h4" component="div">{company.name}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{company.description}</Typography>
          
          {/* Кнопка для показа/скрытия списка вакансий */}
          <Button 
            variant="contained" 
            onClick={() => setJobsVisible(!jobsVisible)} 
            sx={{ mb: 2 }}
          >
            {jobsVisible ? 'Скрыть вакансии' : 'Показать вакансии'}
          </Button>

          {/* Скрывающийся список вакансий */}
          <Collapse in={jobsVisible}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>Вакансии:</Typography>
            {company.jobs && company.jobs.length > 0 ? (
              company.jobs.map(job => (
                <Card 
                  key={job.id} 
                  sx={{ mb: 2, cursor: 'pointer' }} 
                  onClick={() => navigate(`/jobs/${job.id}`)}  // Переход по клику на вакансию
                >
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>Нет открытых вакансий</Typography>
            )}
          </Collapse>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
};

export default CompanyPage;

// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardMedia, Typography, Grid, Box, Rating } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchCompany } from '../../api';

// const CompanyPage = () => {
//   const { id } = useParams();  // Получаем id компании из параметров URL
//   const [company, setCompany] = useState(null);
//   const navigate = useNavigate();  // Используем хук navigate для переходов

//   useEffect(() => {
//     const loadData = async (companyId) => {
//       try {
//         // Подставляем id компании в запрос
//         const compData = await fetchCompany(companyId);
//         setCompany(compData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     loadData(id);
//   }, [id]);

//   if (!company) {
//     return <Typography>Загрузка...</Typography>;
//   }

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Grid container spacing={4}>
//         {/* Левый верхний блок с логотипом, рейтингом и количеством вакансий */}
//         <Grid item xs={12} md={3}>
//           <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
//             <CardMedia
//               component="img"
//               sx={{ width: 80, height: 80, borderRadius: '50%' }}  // Уменьшение размера логотипа
//               image={company.logo || '/default-logo.png'} // Логотип компании или дефолтное изображение
//               alt={company.name}
//             />
//             <CardContent sx={{ textAlign: 'center' }}>
//               <Typography variant="h6" component="div">{company.name}</Typography>
//               <Rating value={company.rating || 0} readOnly precision={0.5} />
//               <Typography variant="body2" color="text.secondary">
//                 Вакансий: {company.jobs ? company.jobs.length : 0}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Центральный блок с описанием и вакансиями */}
//         <Grid item xs={12} md={9}>
//           <Typography variant="h4" component="div">{company.name}</Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{company.description}</Typography>
//           <Typography variant="h6" component="div" sx={{ mb: 2 }}>Вакансии:</Typography>
//           {company.jobs && company.jobs.length > 0 ? (
//             company.jobs.map(job => (
//               <Card 
//                 key={job.id} 
//                 sx={{ mb: 2, cursor: 'pointer' }} 
//                 onClick={() => navigate(`/jobs/${job.id}`)}  // Переход по клику на вакансию
//               >
//                 <CardContent>
//                   <Typography variant="h6">{job.title}</Typography>
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <Typography>Нет открытых вакансий</Typography>
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default CompanyPage;

// // import React, { useEffect, useState } from 'react';
// // import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';
// // import { useParams } from 'react-router-dom';
// // import { fetchCompany } from '../../api';

// // const CompanyPage = () => {
// //   const { id } = useParams();  // Получаем id компании из параметров URL
// //   const [company, setCompany] = useState(null);

// //   useEffect(() => {
// //     const loadData = async (companyId) => {
// //       try {
// //         // Подставляем id компании в запрос
// //         const compData = await fetchCompany(companyId);
// //         setCompany(compData);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };
// //     loadData(id);
// //   }, [id]);

// //   if (!company) {
// //     return <Typography>Загрузка...</Typography>;
// //   }

// //   return (
// //     <Box sx={{ mt: 4 }}>
// //       <Grid container spacing={4}>
// //         <Grid item xs={12} md={4}>
// //           <Card>
// //             <CardMedia
// //               component="img"
// //               height="200"
// //               image={company.logo || '/default-logo.png'} // Используем логотип компании или дефолтное изображение
// //               alt={company.name}
// //             />
// //             <CardContent>
// //               <Typography variant="h5" component="div">{company.name}</Typography>
// //               <Typography variant="body2" color="text.secondary">{company.description}</Typography>
// //               <Typography variant="body2" color="text.secondary">Website: {company.website}</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={12} md={8}>
// //           <Typography variant="h6" component="div">Вакансии:</Typography>
// //           {company.jobs && company.jobs.length > 0 ? (
// //             company.jobs.map(job => (
// //               <Card key={job.id} sx={{ mb: 2 }}>
// //                 <CardContent>
// //                   <Typography variant="h6">{job.title}</Typography>
// //                 </CardContent>
// //               </Card>
// //             ))
// //           ) : (
// //             <Typography>Нет открытых вакансий</Typography>
// //           )}
// //         </Grid>
// //       </Grid>
// //       {/* <Button variant="contained" sx={{ mt: 2 }} href={`/company/${id}/edit`}>Редактировать компанию</Button> */}
// //     </Box>
// //   );
// // };

// // export default CompanyPage;
