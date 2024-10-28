import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box, Paper } from '@mui/material';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

const HomePage = () => {
  return (
    <div>
      {/* Фоновой блок с текстом приветствия */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: { xs: 4, md: 8 },  // Используем разные отступы для мобильных (xs) и десктопов (md)
          backgroundImage: 'url(/images/layout.jpeg)',
          backgroundSize: 'cover',
          minHeight: { xs: '40vh', md: '50vh' },
          backgroundPosition: 'center',
          textAlign: { xs: 'left', md: 'center' },  // Выравнивание текста по-разному на мобильных и десктопах
        }}
      >
        <Container>
          <Typography
            variant="h3"  // Уменьшение размера заголовка для адаптивности
            align="center"
            color="white"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', md: '4rem' } }}  // Различный размер шрифта
          >
            Добро пожаловать на сайт WorkWave
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="white"
            paragraph
            sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}  // Адаптивный размер шрифта
          >
            Ваш путь к поиску работы своей мечты или идеального кандидата.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/jobs"
              sx={{ mx: 1, mb: { xs: 2, md: 0 } }}  // Разные отступы снизу для кнопок на мобильных и десктопах
            >
              Просмотреть Вакансии
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/resumes"
              sx={{ mx: 1 }}
            >
              Просмотреть Резюме
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Основной контент страницы */}
      <Container sx={{ my: { xs: 4, md: 8 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Для соискателей
              </Typography>
              <Typography paragraph>
                Изучите тысячи вакансий в различных отраслях. Фильтруйте и сортируйте, чтобы найти ту, которая идеально соответствует вашим навыкам.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/jobs">
                Начать поиски
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Для работодателей
              </Typography>
              <Typography paragraph>
                Просмотрите обширный список талантливых специалистов. Отфильтруйте и отсортируйте резюме, чтобы найти идеального кандидата для вашей компании.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/resumes">
                Начать поиски
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Призыв к действию внизу страницы */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 4, md: 6 } }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Начнем!
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            У вас уже есть аккаунт? Войдите сейчас. Вы здесь впервые? Зарегистрируйтесь и начните свои поиски с нами уже сегодня.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
              sx={{ mx: 1, mb: { xs: 2, md: 0 } }}
            >
              Вход
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/register"
              sx={{ mx: 1 }}
            >
              Регистрация
            </Button>
          </Box>
        </Container>
      </Box>

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Typography, Button, Grid, Box, Paper } from '@mui/material';
// import Navbar from '../Common/Navbar';
// import Footer from '../Common/Footer';

// const HomePage = () => {
//   return (
//     <div>
     

//       <Box sx={{ 
//         bgcolor: 'background.paper',
//         py: 8,  
//         backgroundImage: 'url(/images/layout.jpeg)',
//         backgroundSize: 'cover',  
//         backgroundPosition: 'center'  }}>
//         <Container>
//           <Typography variant="h1" align="center" color="white" gutterBottom>
//             Добро пожаловать на сайт WorkWave
//           </Typography>
//           <Typography variant="h5" align="center" color="white"  paragraph>
//             Ваш путь к поиску работы своей мечты или идеального кандидата.
//           </Typography>
//           <Box sx={{ textAlign: 'center', mt: 4 }}>
//             <Button variant="contained" color="primary" component={Link} to="/jobs" sx={{ mx: 1 }}>
//               Просмотреть Вакансии
//             </Button>
//             <Button variant="contained" color="primary" component={Link} to="/resumes" sx={{ mx: 1 }}>
//               Просмотреть Резюме
//             </Button>
//           </Box>
//         </Container>
//       </Box>

//       <Container sx={{ my: 8 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 4, textAlign: 'center' }}>
//               <Typography variant="h6" gutterBottom>
//                 Для соискателей
//               </Typography>
//               <Typography paragraph>
//                 Изучите тысячи вакансий в различных отраслях. Фильтруйте и сортируйте, чтобы найти ту, которая идеально соответствует вашим навыкам.
//               </Typography>
//               <Button variant="contained" color="primary" component={Link} to="/jobs">
//                 Начать поиски
//               </Button>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 4, textAlign: 'center' }}>
//               <Typography variant="h6" gutterBottom>
//                 Для работодателей
//               </Typography>
//               <Typography paragraph>
//                 Просмотрите обширный список талантливых специалистов. Отфильтруйте и отсортируйте резюме, чтобы найти идеального кандидата для вашей компании.
//               </Typography>
//               <Button variant="contained" color="primary" component={Link} to="/resumes">
//                 Начать поиски
//               </Button>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>

//       <Box sx={{ bgcolor: 'background.default', py: 6 }}>
//         <Container>
//           <Typography variant="h4" align="center" gutterBottom>
//             Начнем!
//           </Typography>
//           <Typography variant="h6" align="center" paragraph>
//             У вас уже есть аккаунт? Войдите сейчас. Вы здесь впервые? Зарегистрируйтесь и начните свое поиски с нами уже сегодня.
//           </Typography>
//           <Box sx={{ textAlign: 'center' }}>
//             <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mx: 1 }}>
//               Вход
//             </Button>
//             <Button variant="outlined" color="secondary" component={Link} to="/register" sx={{ mx: 1 }}>
//               Регистрация
//             </Button>
//           </Box>
//         </Container>
//       </Box>

//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default HomePage;
