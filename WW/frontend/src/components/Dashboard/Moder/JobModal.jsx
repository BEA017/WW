import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, CircularProgress, Chip } from '@mui/material';
import { fetchJobDetails, approveJob, moderDeleteJob, reworkJob } from '../../../api';

const JobModal = ({ jobId, open, onClose,onDataChange }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (jobId && open) {
      fetchJobDetails(jobId)
        .then((response) => {
          setJob(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching job details:', error);
          setLoading(false);
        });
    }
  }, [jobId, open]);
  
  const handleApprove = () => {
    approveJob(jobId).then(() => onClose());
    onDataChange();
  };
  const handleRework = () => {
    reworkJob(jobId).then(() => onClose()).then((response) => {
       setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching job details:', error);
      setLoading(false);
    });
    onDataChange();
  };
  const handleDelete = () => {
    moderDeleteJob(jobId).then(() => onClose());
    onDataChange();
  };

  if (loading) return <CircularProgress />;
  if (!job) return null;

  return (
    <Modal open={open} onClose={onClose}>
    <Box sx={{ p: 4,
       backgroundColor: 'white', 
       width: '600px',
       margin: 'auto', mt: '5%' ,
       maxHeight: '80vh',  
       overflowY: 'auto'   }}>
        <Typography variant="h4" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="body1">Компания: {job.company?.name || 'Не указано'}</Typography>
        <Typography variant="body1">Регион: {job.location?.name || 'Не указано'}</Typography>
        <Typography variant="body1">Категория: {job.category?.name || 'Не указано'}</Typography>
        <Typography variant="body1">Оплата: {job.salary || 'Не указана'}</Typography>
        <Typography variant="body1">Описание: {job.description || 'Не указано'}</Typography>
        <Typography variant="body1">Образование: {job.requirements_education || 'Не указано'}</Typography>
        <Typography variant="body1">Опыт: {job.requirements_experience || 'Не указано'}</Typography>

        {/* Навыки */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Навыки:</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {job.skills && job.skills.length > 0 ? job.skills.map((skill) => (
              <Chip key={skill.id} label={skill.name} />
            )) : 'Не указаны'}
          </Box>
        </Box>

        {/* Информация о пользователе */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Пользователь:</Typography>
          <Typography>Компания: {job.company?.name || 'Не указано'}</Typography>
          <Typography>Email: {job?.contact_email || 'Не указано'}</Typography>
          <Typography>Телефон: {job?.contact_phone || 'Не указано'}</Typography>
        </Box>

        {/* Кнопки для одобрения и удаления */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="success" onClick={handleApprove}>Одобрить</Button>
        <Button variant="contained" color="success" onClick={handleRework}> На доработку</Button>
        
          <Button variant="contained" color="error" onClick={handleDelete}>Удалить</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default JobModal;
// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Typography, Button, CircularProgress, Chip } from '@mui/material';
// import { fetchJobDetails, approveJob, moderDeleteJob, reworkJob } from '../../../api';

// const JobModal = ({ jobId, open, onClose }) => {
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (jobId && open) {
//       fetchJobDetails(jobId)
//         .then((response) => {
//           setJob(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching job details:', error);
//           setLoading(false);
//         });
//     }
//   }, [jobId, open]);
  
//   const handleApprove = () => {
//     approveJob(jobId).then(() => onClose());
//   };
//   const handleRework = () => {
//     reworkJob(jobId).then(() => onClose()).then((response) => {
//        setLoading(false);
//     })
//     .catch((error) => {
//       console.error('Error fetching job details:', error);
//       setLoading(false);
//     });
//     ;
//   };
//   const handleDelete = () => {
//     moderDeleteJob(jobId).then(() => onClose());
//   };

//   if (loading) return <CircularProgress />;
//   if (!job) return null;

//   return (
//     <Modal open={open} onClose={onClose}>
//     <Box sx={{ p: 4,
//        backgroundColor: 'white', 
//        width: '600px',
//        margin: 'auto', mt: '5%' ,
//        maxHeight: '80vh',  
//        overflowY: 'auto'   }}>
//         <Typography variant="h4" gutterBottom>
//           {job.title}
//         </Typography>
//         <Typography variant="body1">Компания: {job.company?.name || 'Не указано'}</Typography>
//         <Typography variant="body1">Регион: {job.location?.name || 'Не указано'}</Typography>
//         <Typography variant="body1">Категория: {job.category?.name || 'Не указано'}</Typography>
//         <Typography variant="body1">Оплата: {job.salary || 'Не указана'}</Typography>
//         <Typography variant="body1">Описание: {job.description || 'Не указано'}</Typography>
//         <Typography variant="body1">Образование: {job.requirements_education || 'Не указано'}</Typography>
//         <Typography variant="body1">Опыт: {job.requirements_experience || 'Не указано'}</Typography>

//         {/* Навыки */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h5">Навыки:</Typography>
//           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//             {job.skills && job.skills.length > 0 ? job.skills.map((skill) => (
//               <Chip key={skill.id} label={skill.name} />
//             )) : 'Не указаны'}
//           </Box>
//         </Box>

//         {/* Информация о пользователе */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Пользователь:</Typography>
//           <Typography>Компания: {job.company?.name || 'Не указано'}</Typography>
//           <Typography>Email: {job?.contact_email || 'Не указано'}</Typography>
//           <Typography>Телефон: {job?.contact_phone || 'Не указано'}</Typography>
//         </Box>

//         {/* Кнопки для одобрения и удаления */}
//         <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
//         <Button variant="contained" color="success" onClick={handleApprove}>Одобрить</Button>
//         <Button variant="contained" color="success" onClick={handleRework}> На доработку</Button>
        
//           <Button variant="contained" color="error" onClick={handleDelete}>Удалить</Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default JobModal;