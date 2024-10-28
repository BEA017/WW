import React, { useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select, Box, Paper } from '@mui/material';
import { registerUser } from '../../api';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser({ email, password, role });
      
      if (response.data === 'ok') {
        toast.success('Регистрация прошла успешно, подтвердите адрес электронной почты в полученном письме!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error('Ошибка при регистрации: возможно, почта уже используется. Проверьте данные и повторите попытку.');
      }
    } catch (error) {
      console.error('Registration failed', error);
      toast.error('Произошла ошибка при регистрации. Проверьте данные и повторите попытку.');
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
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Box component="form" onSubmit={handleRegister} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
            Регистрация
          </Typography>
          
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="user-role-label">Тип аккаунта</InputLabel>
            <Select
              labelId="user-role-label"
              id="user-role-select"
              value={role}
              onChange={handleChange}
              label="Тип аккаунта"
            >
              <MenuItem value="job_seeker">Соискатель</MenuItem>
              <MenuItem value="employer">Работодатель</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, height: 48, backgroundColor: 'orange' }}
          >
            Зарегистрироваться
          </Button>
          
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Уже есть аккаунт? <Button variant="text" color="primary" onClick={() => navigate('/login')}>Войти</Button>
          </Typography>
        </Box>
        <ToastContainer /> {/* Контейнер для уведомлений */}
      </Paper>
    </Container>
    </Box>
  );
};

export default Register;


// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
// import { registerUser } from '../../api'; // Импортируем функцию из api.js
// import { toast, ToastContainer } from 'react-toastify'; // Импортируем toast и ToastContainer
// import {  useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     setRole(event.target.value);
//   };
//   const handleRegister = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await registerUser({ email, password, role });
//       // Здесь можно перенаправить пользователя на страницу логина или показать сообщение об успешной регистрации
      
//       if(response.data==='ok')
//       {
//       toast.success('Регистрация прошла успешно, подтвердите адресс электронной почты в полученном письме!'); // Показ уведомления
//       setTimeout(() => {
//         navigate('/login'); // Редирект через 2 секунды
//       }, 2000);
//        }else
//       toast.error('Произошла ошибка при регистрации, возможно почта уже используеться. Проверте данные, укажите тип аккаунта и повторите попытку.')
//     } catch (error) {
//       console.error('Registration failed', error);
//       toast.error('Произошла ошибка при регистрации, возможно почта уже используеться. Проверте данные, укажите тип аккаунта и повторите попытку.')

//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
//         Регистрация
//       </Typography>
//       <form onSubmit={handleRegister}>

//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           label="Пароль"
//           type="password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="user-role-label">Тип аккаунта</InputLabel>
//           <Select
//             labelId="user-role-label"
//             id="user-role-select"
//             value={role}
//             onChange={handleChange}
//             label="Роль"
//             sx={{ mt: 2 }}
//           >
//             <MenuItem value="job_seeker">Соискатель</MenuItem>
//             <MenuItem value="employer">Работодатель</MenuItem>
//           </Select>
//         </FormControl>
//         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//           Зарегистрироваться
//         </Button>
//       </form>
//       <ToastContainer /> {/* Контейнер для уведомлений */}
//     </Container>
//   );
// };

// export default Register;