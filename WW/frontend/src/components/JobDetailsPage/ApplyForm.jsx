import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { applyForJob } from '../../api';

const ApplyForm = ({ id }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    applyForJob(id, formData)
      .then((response) => {
        //console.log('Application submitted successfully:', response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error submitting application:', error);
        setLoading(false);
      });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Apply for this job</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <TextField
          label="Cover Letter"
          variant="outlined"
          fullWidth
          margin="normal"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit Application'}
        </Button>
      </form>
    </Box>
  );
};

export default ApplyForm;


// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { applyForJob } from '../api'; // Импортируем функцию из api.js

// const ApplyForm = ({ jobId }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     coverLetter: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     applyForJob(jobId, formData).then((response) => {
//       //console.log('Application submitted successfully:', response.data);
//       // Добавьте обработку успешной отправки
//     }).catch((error) => {
//       console.error('Error submitting application:', error);
//       // Добавьте обработку ошибки
//     });
//   };

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Typography variant="h6">Apply for this job</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Full Name"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Phone"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Cover Letter"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           name="coverLetter"
//           value={formData.coverLetter}
//           onChange={handleChange}
//           multiline
//           rows={4}
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//           Submit Application
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default ApplyForm;


// // import React from 'react';
// // import { TextField, Button, Box, Typography } from '@mui/material';

// // const ApplyForm = () => (
// //   <Box sx={{ mt: 4 }}>
// //     <Typography variant="h6">Apply for this job</Typography>
// //     <form>
// //       <TextField label="Full Name" variant="outlined" fullWidth margin="normal" />
// //       <TextField label="Email" variant="outlined" fullWidth margin="normal" />
// //       <TextField label="Phone" variant="outlined" fullWidth margin="normal" />
// //       <TextField
// //         label="Cover Letter"
// //         variant="outlined"
// //         fullWidth
// //         margin="normal"
// //         multiline
// //         rows={4}
// //       />
// //       <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
// //         Submit Application
// //       </Button>
// //     </form>
// //   </Box>
// // );

// // export default ApplyForm;
