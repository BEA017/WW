import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const AuthForm = ({ type }) => (
  <Box>
    <TextField label="Email" variant="outlined" fullWidth margin="normal" />
    <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
    <Button type="submit" variant="contained" color="primary" fullWidth>
      {type}
    </Button>
  </Box>
);

export default AuthForm;
