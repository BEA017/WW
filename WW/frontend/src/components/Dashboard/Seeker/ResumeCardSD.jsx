import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Box, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResumeCardSD = ({ resume }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/resumes/${resume.id}`);
  };

  const handleEditClick = () => {
    navigate(`/resumes/${resume.id}/edit`);
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
            Ожидаемая зарплата: {resume.desired_salary} р.
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {resume?.avatar && (
          <Avatar
            alt={resume.resume_name}
            src={`/images/avatars/${resume.avatar}`}
            sx={{ width: 56, height: 56 }}
          />
        )}
        <Button variant="outlined" color="primary" sx={{ ml: 1, mr:1 }} onClick={handleEditClick}>
          Редактировать
        </Button>
      </Box>
    </Card>
  );
};

export default ResumeCardSD;
