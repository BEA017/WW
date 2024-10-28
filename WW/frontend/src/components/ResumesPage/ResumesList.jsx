 
import React from 'react';
import { List, Typography } from '@mui/material';
import ResumeCard from './ResumeCard';

const ResumesList = ({ resumes }) => {
  // Проверка наличия данных перед рендерингом
  if (!resumes || resumes.length === 0) {
    return <Typography>Нет доступных резюме.</Typography>;
  }

  return (
    <List>
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </List>
  );
};

export default ResumesList;

// import React from 'react';
// import { List, ListItem, ListItemText } from '@mui/material';
// import ResumeCard from './ResumeCard';
// const ResumesList = ({ resumes }) => {
//   return (
//     <List>
//       {resumes.map((resume) => (        
//           <ResumeCard  key={resume.id} resume={resume} />        
//       ))}
//     </List>
//   );
// };

// export default ResumesList;

 