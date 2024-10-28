import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, CircularProgress, Chip, Avatar } from '@mui/material';
import { fetchResumeDetails, approveResume, moderDeleteResume, reworkResume } from '../../../api';

const ResumeModal = ({ resumeId, open, onClose, onDataChange }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (resumeId && open) {
      fetchResumeDetails(resumeId)
        .then((response) => {
          setResume(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching resume details:', error);
          setLoading(false);
        });
    }
  }, [resumeId, open]);

  const handleApprove = () => {
    approveResume(resumeId).then(() => onClose());
    onDataChange();
  };
  const handleRework = () =>{
    reworkResume(resumeId).then(() => onClose());
    onDataChange();
  }
  const handleDelete = () => {
    moderDeleteResume(resumeId).then(() => onClose());
    onDataChange();
  };

  if (loading) return <CircularProgress />;
  if (!resume) return null;

  return (
    <Modal open={open} onClose={onClose}>
     <Box sx={{ p: 4,
       backgroundColor: 'white', 
       width: '600px',
       margin: 'auto',
       mt: '5%' ,
       maxHeight: '80vh',  
       overflowY: 'auto'   }}>
        <Typography variant="h4" gutterBottom>
          {resume.resume_name}
        </Typography>
        <Typography variant="body1">Регион: {resume.location?.name || 'Не указано'}</Typography>
        <Typography variant="body1">Категория: {resume.category?.name || 'Не указано'}</Typography>
        <Typography variant="body1">Оплата: {resume.desired_salary || 'Не указана'}</Typography>
        <Typography variant="body1">Образование: {resume.education || 'Не указано'}</Typography>
        <Typography variant="body1">Опыт работы: {resume.experience || 'Не указано'}</Typography>
        <Typography variant="body1">Описание: {resume.about_me || 'Не указано'}</Typography>

        {/* Навыки */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Навыки:</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {resume.skills && resume.skills.length > 0 ? resume.skills.map((skill) => (
              <Chip key={skill.id} label={skill.name} />
            )) : 'Не указаны'}
          </Box>
        </Box>

        {/* Фото резюме */}
        {resume?.avatar && (
            <Avatar
            alt={resume.resume_name}
            src={`/images/avatars/${resume.avatar}`}  // Ссылка на логотип
            sx={{ width: 156, height: 156 }}
          />
          )}

        {/* Информация о пользователе */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Пользователь:</Typography>
          <Typography>Имя: {resume.user?.name || 'Не указано'}</Typography>
          <Typography>Email: {resume.user?.email || 'Не указано'}</Typography>
          <Typography>Телефон: {resume?.phone || 'Не указано'}</Typography>
        </Box>

        {/* Кнопки для одобрения и удаления */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="success" onClick={handleApprove}>Одобрить</Button>
          <Button variant="contained" color="success" onClick={handleRework}>Отправить на доработку</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Удалить</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResumeModal;

// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Typography, Button, CircularProgress, Chip, Avatar } from '@mui/material';
// import { fetchResumeDetails, approveResume, moderDeleteResume, reworkResume } from '../../../api';

// const ResumeModal = ({ resumeId, open, onClose }) => {
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (resumeId && open) {
//       fetchResumeDetails(resumeId)
//         .then((response) => {
//           setResume(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching resume details:', error);
//           setLoading(false);
//         });
//     }
//   }, [resumeId, open]);

//   const handleApprove = () => {
//     approveResume(resumeId).then(() => onClose());

//   };
//   const handleRework = () =>{
//     reworkResume(resumeId).then(() => onClose());


//   }
//   const handleDelete = () => {
//     moderDeleteResume(resumeId).then(() => onClose());

//   };

//   if (loading) return <CircularProgress />;
//   if (!resume) return null;

//   return (
//     <Modal open={open} onClose={onClose}>
//      <Box sx={{ p: 4,
//        backgroundColor: 'white', 
//        width: '600px',
//        margin: 'auto',
//        mt: '5%' ,
//        maxHeight: '80vh',  
//        overflowY: 'auto'   }}>
//         <Typography variant="h4" gutterBottom>
//           {resume.resume_name}
//         </Typography>
//         <Typography variant="body1">Регион: {resume.location?.name || 'Не указано'}</Typography>
//         <Typography variant="body1">Категория: {resume.category?.name || 'Не указано'}</Typography>
//         <Typography variant="body1">Оплата: {resume.desired_salary || 'Не указана'}</Typography>
//         <Typography variant="body1">Образование: {resume.education || 'Не указано'}</Typography>
//         <Typography variant="body1">Опыт работы: {resume.experience || 'Не указано'}</Typography>
//         <Typography variant="body1">Описание: {resume.about_me || 'Не указано'}</Typography>

//         {/* Навыки */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h5">Навыки:</Typography>
//           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//             {resume.skills && resume.skills.length > 0 ? resume.skills.map((skill) => (
//               <Chip key={skill.id} label={skill.name} />
//             )) : 'Не указаны'}
//           </Box>
//         </Box>

//         {/* Фото резюме */}
//         {resume?.avatar && (
//             <Avatar
//             alt={resume.resume_name}
//             src={`http://localhost:8000/images/avatars/${resume.avatar}`}  // Ссылка на логотип
//             sx={{ width: 156, height: 156 }}
//           />
//           )}

//         {/* Информация о пользователе */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Пользователь:</Typography>
//           <Typography>Имя: {resume.user?.name || 'Не указано'}</Typography>
//           <Typography>Email: {resume.user?.email || 'Не указано'}</Typography>
//           <Typography>Телефон: {resume?.phone || 'Не указано'}</Typography>
//         </Box>

//         {/* Кнопки для одобрения и удаления */}
//         <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
//           <Button variant="contained" color="success" onClick={handleApprove}>Одобрить</Button>
//           <Button variant="contained" color="success" onClick={handleRework}>Отправить на доработку</Button>
//           <Button variant="contained" color="error" onClick={handleDelete}>Удалить</Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default ResumeModal;