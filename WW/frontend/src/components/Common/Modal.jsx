import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const CustomModal = ({ open, handleClose, title, content }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography sx={{ mt: 2 }}>{content}</Typography>
      <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
    </Box>
  </Modal>
);

export default CustomModal;
