import React, { useEffect, useState } from 'react';
import { Typography, Box, Chip, CircularProgress, Grid, Card, CardContent, CardHeader, Avatar, ThemeProvider, createTheme } from '@mui/material';
import { fetchResumeDetails } from '../../api'; 
import { useParams } from 'react-router-dom';

// Создание темы MUI
const theme = createTheme();

const ResumeDetails = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumeDetails(id)
      .then((response) => {
        setResume(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching resume details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  if (!resume) return <Typography>Error loading resume details.</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
        {/* Заголовок резюме */}
        <Card variant="outlined" sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
          <CardHeader
            avatar={
              <Avatar alt={resume.resume_name} sx={{ bgcolor: '#0288d1', width: 56, height: 56 }}>
                {resume.resume_name ? resume.resume_name[0] : "?"}
              </Avatar>
            }
            title={resume.resume_name || "Информация не указана"}
            subheader={`Регион: ${resume.location?.name || "Информация не указана"}`}
            sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Категория:</strong> {resume.category?.name || "Информация не указана"}
                </Typography>
                <Typography variant="body1">
                  <strong>Оплата:</strong> {resume.desired_salary || "Информация не указана"}
                </Typography>
                <Typography variant="body1">
                  <strong>Образование:</strong> {resume.education || "Информация не указана"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Опыт работы:</strong> {resume.experience || "Информация не указана"}
                </Typography>
                <Typography variant="body1">
                  <strong>Контактный телефон:</strong> {resume.phone || "Информация не указана"}
                </Typography>
                <Typography variant="body1">
                  <strong>Почта для связи:</strong> {resume.email || "Информация не указана"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Блок "Обо мне" */}
        <Card variant="outlined" sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Обо мне:</Typography>
            <Typography variant="body1">{resume.about_me || "Информация не указана"}</Typography>
          </CardContent>
        </Card>

        {/* Навыки */}
        <Card variant="outlined" sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Навыки:</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
              {resume.skills && resume.skills.length > 0 ? (
                resume.skills.map((skill) => (
                  <Chip key={skill.id} label={skill.name} sx={{ backgroundColor: '#e0f7fa', fontWeight: 500 }} />
                ))
              ) : (
                <Typography>Не указаны</Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default ResumeDetails;


// import React, { useEffect, useState } from 'react';
// import { Typography, Box, Chip, CircularProgress } from '@mui/material';
// import { fetchResumeDetails } from '../../api'; // Импорт функции для получения данных резюме
// import { useParams } from 'react-router-dom';

 
 
// const ResumeDetails = () => {
//   const { id } = useParams();
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(true);
 
//   useEffect(() => {
//     fetchResumeDetails(id)
//       .then((response) => {
//         setResume(response.data);
//         // //console.log("!!DATA!!", response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching job details:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <CircularProgress />;
//   if (!resume) return <Typography>Error loading job details.</Typography>;
//   return (
//     <Box sx={{ p: 4 }}>
//       {/* Заголовок и основная информация */}
//       <Typography variant="h4" gutterBottom>
//         {resume.resume_name || "Информация не указана"}
//       </Typography>       
      
//       <Typography variant="body1">
//         Регион: {resume.location?.name || "Информация не указана"}
//       </Typography>
      
//       <Typography variant="body1">
//         Категория: {resume.category?.name || "Информация не указана"}
//       </Typography>
 
//       <Typography variant="body1">
//         Оплата: {resume.desired_salary  || "No salary information available"} 
//       </Typography>
//       {/* <Typography variant="body1">
//         Желаемый тип занятости: {resume.work_schedule?.name || "Информация не указана"}
//       </Typography>
//       <Typography variant="body1">
//         Желаемый график работы: {resume.employment_type?.name || "Информация не указана"}
//       </Typography> */}
      
//       <Typography variant="body1">
//         Образование: {resume.education || "Информация не указана"}
//       </Typography>
//       <Typography variant="body1">
//         Опыт работы: {resume.experience || "Информация не указана"}
//       </Typography>
     
       

//       {/* Описание вакансии */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h5" gutterBottom>Описание вакансии:</Typography>
//         <Typography variant="body1">{resume.about_me || " "}</Typography>
//       </Box>

//       {/* Навыки, требуемые для вакансии */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h5" gutterBottom>Навыки:</Typography>
//         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           {resume.skills && resume.skills.length > 0 ? (
//             resume.skills.map((skill) => (
//               <Chip key={skill.id} label={skill.name} />
//             ))
//           ) : (
//             <Typography>Не указаны</Typography>
//           )}
//         </Box>
//       </Box>
//         <Box>
//       <Typography variant="body1">
//         Контактный телефон: {resume.phone || "Информация не указана"}
//       </Typography>
//       <Typography variant="body1">
//         Почта для связи: {resume.email || "Информация не указана"}
//       </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default ResumeDetails;
 
   

// // import React, { useEffect, useState } from 'react';
// // import { Typography, Box } from '@mui/material';
// // import { fetchJobDetails } from '../api'; // Импортируем функцию из api.js

// // const JobDetails = ({ jobId }) => {
// //   const [job, setJob] = useState(null);

// //   useEffect(() => {
// //     // Запрос данных вакансии при загрузке компонента
// //     fetchJobDetails(jobId).then((response) => {
// //       setJob(response.data);
// //     }).catch((error) => {
// //       console.error('Error fetching job details:', error);
// //     });
// //   }, [jobId]);

// //   if (!job) return <Typography>Loading...</Typography>;

// //   return (
// //     <Box sx={{ mt: 2 }}>
// //       <Typography variant="h4" gutterBottom>
// //         {job.title}
// //       </Typography>
// //       <Typography variant="h6">Company: {job.company}</Typography>
// //       <Typography variant="body1">Location: {job.location}</Typography>
// //       <Typography variant="body1">Salary: {job.salary}</Typography>
// //       <Typography variant="body1" sx={{ mt: 2 }}>
// //         {job.description}
// //       </Typography>
// //     </Box>
// //   );
// // };

// // export default JobDetails;


// // // import React from 'react';
// // // import { Typography, Box } from '@mui/material';

// // // const ResumeDetails = ({ resume }) => (
// // //   <Box sx={{ mt: 2 }}>
// // //     <Typography variant="h4" gutterBottom>
// // //       {resume.title}
// // //     </Typography>
// // //     <Typography variant="h6">Name: {resume.name}</Typography>
// // //     <Typography variant="body1">Location: {resume.location}</Typography>
// // //     <Typography variant="body1" sx={{ mt: 2 }}>
// // //       {resume.experience}
// // //     </Typography>
// // //   </Box>
// // // );

// // // export default ResumeDetails;
