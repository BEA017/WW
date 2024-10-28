import { Container } from '@mui/material';
import React, { useEffect } from 'react';
 import { useParams, useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const  Verify = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const msg = params.get('msg');
  const navigate = useNavigate();
  useEffect(() => {
    
      alert(msg);
  })
  return (
 
    <div>
        <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: '20vh' }}>
      
      <Box>
      
       <Typography variant="body1" gutterBottom>
        Ваша почта подтверждена, войдите в аккаунт и укажите личный данные в настройках аккаунта для продолжения работы на сайте.
       </Typography>
    
         <Button
           variant="contained"
           color="primary"
           onClick={() => navigate('/login')} // Перенаправление на страницу входа после успешного подтверждения
           sx={{ marginTop: 3 }}
         >
           Перейти на страницу входа
         </Button>
   
     </Box>
  
 </Container>
  {msg === 'already' && <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: '20vh' }}>
      
      <Box>
      
       <Typography variant="body1" gutterBottom>
        Ваша почта подтверждена ранее.
       </Typography>
    
         <Button
           variant="contained"
           color="primary"
           onClick={() => navigate('/login')} // Перенаправление на страницу входа после успешного подтверждения
           sx={{ marginTop: 3 }}
         >
           Перейти на страницу входа
         </Button>
   
     </Box>
  
 </Container>} {msg === 'error' && <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: '20vh' }}>
      
          <Box>
          
           <Typography variant="body1" gutterBottom>
          Ошибка при подтверждении почты.
           </Typography>
        
             <Button
               variant="contained"
               color="primary"
               onClick={() => navigate('/')} // Перенаправление на страницу входа после успешного подтверждения
               sx={{ marginTop: 3 }}
             >
               Перейти на главную
             </Button>
       
         </Box>
      
     </Container>}
      {/* {msg === 'already' && <h1>Email уже был подтвержден ранее.</h1>}
      {msg === 'error' && <h1>Ошибка при подтверждении Email.</h1>} */}
    </div>
  );
};

export default Verify;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
//  import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';

// const Verify = () => {
//    const navigate = useNavigate();
  
   
//   return (
//     <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: '20vh' }}>
      
//         <Box>
          
//           <Typography variant="body1" gutterBottom>
//            Ваша почта подтверждена, войдите в аккаунт и укажите личный данные в настройках аккаунта для продолжения работы на сайте.
//           </Typography>
        
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => navigate('/login')} // Перенаправление на страницу входа после успешного подтверждения
//               sx={{ marginTop: 3 }}
//             >
//               Перейти на страницу входа
//             </Button>
         
//         </Box>
      
//     </Container>
 
// )};

// export default Verify;
