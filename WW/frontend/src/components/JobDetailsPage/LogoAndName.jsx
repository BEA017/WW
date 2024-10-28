import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Avatar } from '@mui/material';
 import { useParams, Link } from 'react-router-dom';
import { fetchJobDetails } from '../../api';

const LogoAndName = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
 
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

  if (loading) return <CircularProgress />;
  if (!job) return <Typography>Error loading job details.</Typography>;
  return (
    <Box sx={{ p: 4 }}>
       <Box sx={{ p: 2 }} display="flex" flexDirection="row" alignItems="center">
         
          {job.company?.logo && (
            <Link to={`/company/${job.company.id}`}>
            <Avatar
              alt={job.company.name}
              src={`/images/logos/${job.company.logo}`}  // Ссылка на логотип
              sx={{ width: 156, height: 156 }}
            />
            </Link>
          )}
      </Box>
      <Typography variant="h4">
        Работодатель:
        </Typography>
        <Typography variant="h4">        
        <Link to={`/company/${job.company.id}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
         {job.company?.name || "Информация не указана"}</Link>
      </Typography>
       
    </Box>
  );
};

export default LogoAndName;
 