import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { sendContactMessage } from '../api'; // Импорт функции для отправки сообщения соискателю

const ContactForm = ({ resumeId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendContactMessage(resumeId, formData)
      .then((response) => {
        // //console.log('Message sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Contact this candidate</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Send Message
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;


// import React from 'react';
// import { TextField, Button, Box, Typography } from '@mui/material';

// const ContactForm = () => (
//   <Box sx={{ mt: 4 }}>
//     <Typography variant="h6">Contact Candidate</Typography>
//     <form>
//       <TextField label="Your Name" variant="outlined" fullWidth margin="normal" />
//       <TextField label="Your Email" variant="outlined" fullWidth margin="normal" />
//       <TextField label="Message" variant="outlined" fullWidth margin="normal" multiline rows={4} />
//       <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//         Send Message
//       </Button>
//     </form>
//   </Box>
// );

// export default ContactForm;
