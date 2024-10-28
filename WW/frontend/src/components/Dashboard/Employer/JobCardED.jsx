import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Box, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobCardSD = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  const handleEditClick = () => {
    navigate(`/jobs/${job.id}/edit`);
  };

  return (
    <Card sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {job.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Специализация: {job.category?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Регион: {job.location.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Зарплата: {job.salary} р.
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
   
        <Button variant="outlined" color="primary" sx={{ ml: 1, mr:1 }} onClick={handleEditClick}>
          Редактировать
        </Button>
      </Box>
    </Card>
  );
};

export default JobCardSD;
