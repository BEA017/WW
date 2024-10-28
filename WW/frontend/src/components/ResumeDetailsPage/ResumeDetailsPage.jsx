import React from 'react';
import { Container, Grid, Box, Paper } from '@mui/material';
import ResumeDetails from './ResumeDetails';
import SimilarResumes from './SimilarResumes';
import AvatarAndName from './AvatarAndName';

const ResumeDetailsPage = ({ id }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Левая колонка с основным содержимым */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <ResumeDetails id={id} />
          </Paper>
        </Grid>

        {/* Правая колонка с аватаром и подобными резюме */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 4 }}>
            <AvatarAndName />
          </Box>
                  
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResumeDetailsPage;


// import React from 'react';
// import { Container, Grid } from '@mui/material';
// import ResumeDetails from './ResumeDetails';
//  import SimilarResumes from './SimilarResumes';
// import AvatarAndName from './AvatarAndName';


// const ResumeDetailsPage = ({ id }) => {
//   return (
//     <Container>
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={8}>
//           <ResumeDetails id={id} />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <AvatarAndName/>
//           {/* <SimilarResumes id={id} /> */}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ResumeDetailsPage;

