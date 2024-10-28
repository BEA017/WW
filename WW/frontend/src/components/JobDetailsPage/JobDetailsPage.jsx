import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import JobDetails from './JobDetails';
import ApplyForm from './ApplyForm';
import RelatedJobs from './RelatedJobs';
import LogoAndName from './LogoAndName';

const JobDetailPage = ({ id }) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <JobDetails id={id} />
        </Grid>
        <Grid item xs={12} md={4}>
          <LogoAndName/>
          {/* <ApplyForm id={id} />
          <RelatedJobs id={id} /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobDetailPage;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Typography, Box, CircularProgress  } from '@mui/material';

// import{fetchJobDetails} from '../../api.js'
// import JobDetails from './JobDetails.jsx';


// const JobDetailPage = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
 
//   useEffect(() => {
//     fetchJobDetails(id)
//       .then((response) => {
//         setJob(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching job details:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <CircularProgress />;
//   if (!job) return <Typography>Error loading job details.</Typography>;
//   return (
//     <Box>
//       <JobDetails></JobDetails>
//     </Box>
//   );
// };

// export default JobDetailPage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const JobDetailsPage = ({ match }) => {
//   const jobId = match.params.id;
//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await axios.get(`/api/jobs/${jobId}`);
//         setJob(response.data);
//       } catch (error) {
//         console.error('Error fetching job details:', error);
//       }
//     };

//     fetchJobDetails();
//   }, [jobId]);

//   if (!job) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{job.title}</h1>
//       <p>{job.description}</p>
//       <p>Location: {job.location}</p>
//       <p>Salary: {job.salary}</p>
//       {/* Add more job details */}
//       <button>Contact Employer</button>
//     </div>
//   );
// };

// export default JobDetailsPage;
