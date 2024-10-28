import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Avatar } from '@mui/material';
 import { useParams } from 'react-router-dom';
import { fetchResumeDetails } from '../../api';

const AvatarAndName = () => {
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

  if (loading) return <CircularProgress />;
  if (!resume) return <Typography>Error loading resume details.</Typography>;
  return (
    <Box sx={{ p: 4 }}>
       <Box sx={{ p: 2 }} display="flex" flexDirection="row" alignItems="center">
         
          {resume?.avatar && (
            <Avatar
            alt={resume.resume_name}
            src={`/images/avatars/${resume.avatar}`}  // Ссылка на логотип
            sx={{ width: 156, height: 156 }}
          />
          )}
      </Box>
      <Typography variant="h4">
        Соискатель: {resume.user.name || "Информация не указана"}
      
      </Typography>
       
    </Box>
  );
};

export default AvatarAndName;
 