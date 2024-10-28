import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ p: 2, mt: 'auto', bgcolor: 'background.paper' }}>
      <Container>
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} WorkingWaves. Права защищены.
        </Typography>
        <Box sx={{ mt: 1 }} align="center">
          <Link href="/policy" color="inherit" sx={{ mr: 2 }}>
           Политика конфиденциальности
          </Link> 
           
          <Link href="/terms" color="inherit">
            Правила пользования
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
