 
import React from 'react';
import { List, Typography } from '@mui/material';
import ResumeCardSD from './ResumeCardSD';

const ResumesListSD = ({ resumes }) => {
  // Проверка наличия данных перед рендерингом
  if (!resumes || resumes.length === 0) {
    return <Typography>Нет доступных резюме.</Typography>;
  }

  return (
    <List>
      {resumes.map((resume) => (
        <ResumeCardSD key={resume.id} resume={resume} />
      ))}
    </List>
  );
};

export default ResumesListSD;