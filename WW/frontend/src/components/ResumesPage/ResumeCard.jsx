import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResumeCard = ({ resume }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/resumes/${resume.id}`);
  };

  return (
    <Card sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {resume.resume_name}           
          </Typography>          
           <Typography variant="body2" color="text.secondary">
            Специализация: {resume.category?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Регион: {resume.location.name}
          </Typography>
         <Typography variant="body2" color="text.secondary">
            Ожидаемая зарплата:{resume.desired_salary} р.
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* Логотип компании */}
      <Box sx={{ p: 2 }} display="flex" flexDirection="row" alignItems="center">
      <Typography variant="h5" component="div" marginRight="15px">
            
          </Typography>
        {resume?.avatar && (
          <Avatar
            alt={resume.resume_name}
            src={`/images/avatars/${resume.avatar}`}  // Ссылка на логотип
            sx={{ width: 56, height: 56 }}
          />
        )}
      </Box>
    </Card>
  );
};

export default ResumeCard;

 