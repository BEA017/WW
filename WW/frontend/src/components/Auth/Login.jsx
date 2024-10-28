import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser, CSRF } from '../../api';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await CSRF();

      const response = await loginUser({ email, password });
      const token =response.data.token;
      const userdata =response.data.user;
      //console.log("RESPONSE token:"+token);
      //console.log("RESPONSE userdata:"+userdata);

    
      // Сохраняем токен и информацию о пользователе в cookies
      Cookies.set('token', response.data.token, { expires: 1, secure: false, sameSite: 'Strict' });
      Cookies.set('user', JSON.stringify(response.data.user), { expires: 1, secure: false, sameSite: 'Strict' });
      //console.log("Login-Cookie-token:"+Cookies.get('token'));
      //const user=JSON.parse(Cookies.get('user'));
      const user=  Cookies.get('user');
      //console.log("Login-Cookie-user:"+ user.role)
      const userRole = response.data.user.role;

      // Перенаправление на соответствующий личный кабинет
      switch (userRole) {
        case 'employer':
          navigate('/employer_dashboard');
          break;
        case 'job_seeker':
          navigate('/seeker_dashboard');
          break;
        case 'admin':
          navigate('/admin_dashboard');
          break;
        case 'moder':
          navigate('/moderator_dashboard');
          break;
        default:
          console.error('Unknown role:', userRole);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("/images/bgA.jpg")', // Указываем путь к изображению
      backgroundSize: 'cover', // Картинка покрывает весь фон
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Box component="form" onSubmit={handleLogin} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
            Вход
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, backgroundColor: 'orange', height: 48 }}
          >
            Войти
          </Button>

          {/* Дополнительная информация для тестирования */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" color="textSecondary">
              <strong>Тестовые данные для входа:</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Email:</strong> employer1@example.com
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Пароль:</strong> password123
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
    </Box>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { TextField, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { loginUser, CSRF } from '../../api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       await CSRF();  
      
//       const response = await loginUser({ email, password });

//       // Сохраняем токен и информацию о пользователе
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user)); // сохраняем объект пользователя

//       const userRole = response.data.user.role;

//       // Перенаправление на соответствующий личный кабинет
//       switch(userRole) {
//         case 'employer':
//           history('/employer_dashboard');
//           break;
//         case 'job_seeker':
//           history('/seeker_dashboard');
//           break;
//         case 'admin':
//           history('/admin_dashboard');
//           break;
//         case 'moder':
//           history('/moderator_dashboard');
//           break;
//         default:
//           console.error('Unknown role:', userRole);
//       }
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <TextField value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//       <Button type="submit">Login</Button>      
      
//       <Typography variant="h4" gutterBottom>
//           employer1@example.com
//       </Typography> 
//       <Typography variant="h4" gutterBottom>
//         password123
//       </Typography>
      
//     </form>
 
//   );
// };

// export default Login;


// import React, { useEffect, useState } from 'react';
// import { Container, TextField, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../../api';
//  import { CSRF } from '../../api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//        const csrf=CSRF();
//       const response = await loginUser({ email, password });
      
     
//       const userRole = response.data.user.role;

//       // Перенаправление на соответствующий личный кабинет
//       switch(userRole) {
//         case 'employer':
//           history('/employer_dashboard');
//           break;
//         case 'job_seeker':
//           history('/seeker_dashboard');
//           break;
//         case 'admin':
//           history('/admin_dashboard');
//           break;
//         case 'moder':
//           history('/moderator_dashboard');
//           break;
//         default:
//           console.error('Unknown role:', userRole);
//       }
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <TextField value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//       <Button type="submit">Login</Button>
//       <Typography variant="h4" gutterBottom>
//           employer1@example.com
//       </Typography> 
//       <Typography variant="h4" gutterBottom>
//         password123
//       </Typography>
//     </form>
//   );
// };

// export default Login;

//  
// const userdata =response.data.user;
// const token =response.data.token;
// //console.log("TOKEN::"+token);
// //console.log("ROLE"+userdata.role)
 

// // Сохраняем токен и информацию о пользователе в cookies
// Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });
// Cookies.set('user', JSON.stringify(response.data.user), { expires: 1, secure: true, sameSite: 'Strict' });

// // const user=JSON.parse(Cookies.get('user'));

// const userRole = userdata.role;
