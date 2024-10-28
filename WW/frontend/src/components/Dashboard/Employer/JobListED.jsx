 
import React from 'react';
import { List, Typography } from '@mui/material';
import JobCardED from './JobCardED';

const JobListSD = ({ jobs }) => {
  // Проверка наличия данных перед рендерингом
  if (!jobs || jobs.length === 0) {
    return <Typography>Нет доступных вакансий.</Typography>;
  }

  return (
    <List>
      {jobs.map((job) => (
        <JobCardED key={job.id} job={job} />
      ))}
    </List>
  );
};

export default JobListSD;