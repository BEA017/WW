
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Box, CircularProgress } from '@mui/material';
import { fetchRelatedJobs } from '../../api';

const RelatedJobs = ({ jobId }) => {
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedJobs(jobId)
      .then((response) => {
        setRelatedJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching related jobs:', error);
        setLoading(false);
      });
  }, [jobId]);

  if (loading) return <CircularProgress />;
  if (!relatedJobs.length) return <Typography>No related jobs found.</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Related Jobs</Typography>
      <List>
        {relatedJobs.map((job) => (
          <ListItem key={job.id}>
            <ListItemText primary={job.title} secondary={job.company.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RelatedJobs;


// import React from 'react';
// import { Typography, Grid, Card, CardContent, Button } from '@mui/material';

// const RelatedJobs = ({ jobs }) => (
//   <Grid container spacing={3} sx={{ mt: 4 }}>
//     <Grid item xs={12}>
//       <Typography variant="h6">Related Jobs</Typography>
//     </Grid>
//     {jobs.map((job) => (
//       <Grid item xs={12} sm={6} md={4} key={job.id}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6">{job.title}</Typography>
//             <Typography variant="subtitle1">{job.company}</Typography>
//             <Typography variant="body2">{job.location}</Typography>
//             <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//               View Details
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>
//     ))}
//   </Grid>
// );

// export default RelatedJobs;
