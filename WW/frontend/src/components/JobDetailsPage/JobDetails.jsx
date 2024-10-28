import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Chip, Grid, Card, CardContent, CardHeader, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchJobDetails } from '../../api';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверка размера экрана для адаптивности
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchJobDetails(id)
      .then((response) => {
        setJob(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  if (!job) return <Typography>Error loading job details.</Typography>;

  return (
    <Box sx={{ p: isMobile ? 2 : 4, maxWidth: '1200px', mx: 'auto' }}>
      <Card variant="outlined" sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title={job.title || "Информация не указана"}
          subheader={`Регион: ${job.location?.name || "Информация не указана"}`}
          sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Категория:</strong> {job.category?.name ?? "Информация не указана"}
              </Typography>
              <Typography variant="body1">
                <strong>График работы:</strong> {job.work_schedule?.name ?? "Информация не указана"}
              </Typography>
              <Typography variant="body1">
                <strong>Тип занятости:</strong> {job.employment_type?.name ?? "Информация не указана"}
              </Typography>
              <Typography variant="body1">
                <strong>Оплата:</strong> {job.salary ?? "Информация не указана"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Контактный телефон:</strong> {job.contact_phone ?? "Информация не указана"}
              </Typography>
              <Typography variant="body1">
                <strong>Почта для связи:</strong> {job.contact_email ?? "Информация не указана"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Описание вакансии */}
      <Card variant="outlined" sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Описание вакансии:</Typography>
          <Typography variant="body1">{job?.description ?? "Информация не указана"}</Typography>
        </CardContent>
      </Card>

      {/* Необходимое образование и опыт */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Необходимое образование:</Typography>
              <Typography variant="body1">{job?.requirements_education ?? "Информация не указана"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Требуемый опыт:</Typography>
              <Typography variant="body1">{job.requirements_experience ?? "Информация не указана"}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Необходимые навыки */}
      <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Необходимые навыки:</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
            {job.skills && job.skills.length > 0 ? (
              job.skills.map((skill) => (
                <Chip key={skill.id} label={skill.name} sx={{ backgroundColor: '#e0f7fa', fontWeight: 500 }} />
              ))
            ) : (
              <Typography>Не указаны</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobDetails;


// import React, { useEffect, useState } from 'react';
// import { Typography, Box, CircularProgress, Chip } from '@mui/material';
//  import { useParams } from 'react-router-dom';
// import { fetchJobDetails } from '../../api';

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
 
//   useEffect(() => {
//     fetchJobDetails(id)
//       .then((response) => {
//         setJob(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching job details:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <CircularProgress />;
//   if (!job) return <Typography>Error loading job details.</Typography>;
//   return (
//     <Box sx={{ p: 4 }}>
//       {/* Заголовок и основная информация */}
//       <Typography variant="h4" gutterBottom>
//         {job.title || "Информация не указана"}
//         </Typography>       
      
//       <Typography variant="body1">
//         Регион: {job.location?.name || "Информация не указана"}
//       </Typography>
      
//       <Typography variant="body1">
//         Категория: {job.category?.name || "Информация не указана"}
//       </Typography>
 
//       <Typography variant="body1">
//        График работы: {job.work_schedule?.name || "Информация не указана"}
//       </Typography>
//       <Typography variant="body1">
//        Тип занятости: {job.employment_type?.name || "Информация не указана"}
//       </Typography>
//       <Typography variant="body1">
//         Контактный телефон: {job.contact_phone || "Информация не указана"}
//       </Typography>
//       <Typography variant="body1">
//         Почта для связи: {job.contact_email || "Информация не указана"}
//       </Typography>
      
     
      
//       <Typography variant="body1">
//         Оплата: {job.salary  || "Информация не указана"} 
//       </Typography>

//       {/* Описание вакансии */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h5" gutterBottom>Описание вакансии:</Typography>
//         <Typography variant="body1">{job.description || "Информация не указана"}</Typography>
//       </Box>
//       {/* необходимое образование */}
//       <Box sx={{ mt: 4 }}>
//               <Typography variant="h5" gutterBottom>Необходимое образование:</Typography>
//               <Typography variant="body1">{job.requirements_education || "Информация не указана"}</Typography>
//       </Box>
//       {/* необходимый опыт */}
//       <Box sx={{ mt: 4 }}>
//               <Typography variant="h5" gutterBottom>Требуемый опыт:</Typography>
//               <Typography variant="body1">{job.requirements_experience || "Информация не указана"}</Typography>
//       </Box>

//       {/* Навыки, требуемые для вакансии */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h5" gutterBottom>Необходимые навыки:</Typography>
//         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           {job.skills && job.skills.length > 0 ? (
//             job.skills.map((skill) => (
//               <Chip key={skill.id} label={skill.name} />
//             ))
//           ) : (
//             <Typography>Не указаны</Typography>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default JobDetails;
 