import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { fetchSimilarResumes } from '../../api'; // Импорт функции для получения похожих резюме

const SimilarResumes = ({ resumeId }) => {
  const [similarResumes, setSimilarResumes] = useState([]);

  useEffect(() => {
    // Запрашиваем похожие резюме
    fetchSimilarResumes(resumeId)
      .then((response) => {
        setSimilarResumes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching similar resumes:', error);
      });
  }, [resumeId]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Similar Resumes
      </Typography>
      <List>
        {similarResumes.map((resume) => (
          <ListItem key={resume.id}>
            <ListItemText primary={resume.fullName} secondary={resume.location} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SimilarResumes;


// import React from 'react';
// import { Typography, Grid, Card, CardContent, Button } from '@mui/material';

// const SimilarResumes = ({ resumes }) => (
//   <Grid container spacing={3} sx={{ mt: 4 }}>
//     <Grid item xs={12}>
//       <Typography variant="h6">Similar Resumes</Typography>
//     </Grid>
//     {resumes.map((resume) => (
//       <Grid item xs={12} sm={6} md={4} key={resume.id}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6">{resume.name}</Typography>
//             <Typography variant="subtitle1">{resume.title}</Typography>
//             <Typography variant="body2">{resume.location}</Typography>
//             <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//               View Details
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>
//     ))}
//   </Grid>
// );

// export default SimilarResumes;
