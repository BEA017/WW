import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <Card sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {job.title}
          </Typography>          
          <Typography variant="body2" color="text.secondary">
            Категория: {job.category?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.location?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Зароботная плата: {job.salary} р.
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* Логотип компании */}
      <Box sx={{ p: 2 }} display="flex" flexDirection="row" alignItems="center">
      <Typography variant="h5" component="div" marginRight="15px">
            {job.company?.name} 
          </Typography>
        {job.company?.logo && (
          <Avatar
            alt={job.company.name}
            src={`/images/logos/${job.company.logo}`}  // Ссылка на логотип
            sx={{ width: 56, height: 56 }}
          />
        )}
      </Box>
    </Card>
  );
};

export default JobCard;


// import React from 'react';
// import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
// import { useHistory } from 'react-router-dom'; // Используем для навигации
// import { useNavigate } from 'react-router-dom';

// const JobCard = ({ job }) => {
 
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/jobs/${job.id}`);
//   };

//   return (
//     <Card sx={{ mb: 2 }}>
//       <CardActionArea onClick={handleClick}>
//         <CardContent>
//           <Typography variant="h5" component="div">
//             {job.title}
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             {job.company?.name}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Category: {job.category?.name}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {job.location}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {job.salary}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default JobCard;
