import React from 'react';
import { List  } from '@mui/material';
import JobCard from './JobCard';

const JobsList = ({ jobs }) => {
  return (
    <List>
    {jobs.map((job) => (
      <JobCard key={job.id} job={job} />
    ))}
  </List>
  );
};

export default JobsList;


// import React from 'react';
// import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

// const dummyJobs = [
//   { id: 1, title: 'Software Engineer', company: 'ABC Corp', location: 'New York' },
//   { id: 2, title: 'Product Manager', company: 'XYZ Ltd', location: 'San Francisco' },
// ];

// const JobsList = () => (
//   <Grid container spacing={3}>
//     {dummyJobs.map((job) => (
//       <Grid item xs={12} sm={6} md={4} key={job.id}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6">{job.title}</Typography>
//             <Typography variant="subtitle1">{job.company}</Typography>
//             <Typography variant="body2">{job.location}</Typography>
//             <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
//               View Details
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>
//     ))}
//   </Grid>
// );

// export default JobsList;




// // import React from 'react';

// // const JobsList = ({ jobs }) => {
// //   return (
// //     <div>
// //       <h2>Jobs List</h2>
// //       <ul>
// //         {jobs.map(job => (
// //           <li key={job.id}>
// //             <h3>{job.title}</h3>
// //             <p>{job.description}</p>
// //             <p>Salary: {job.salary}</p>
// //             {/* Add more job details */}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default JobsList;
