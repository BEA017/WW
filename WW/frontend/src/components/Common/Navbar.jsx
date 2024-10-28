import React, { useState, useEffect } from 'react';
import {  AppBar,  Toolbar,  Typography,  Button,  Box,  IconButton,  Drawer,  List,  ListItem,  ListItemText,  Container,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logout } from '../../api';
import './Navbar.css'; // Дополнительные кастомные стили
import Cookies from 'js-cookie';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    
    const token = Cookies.get('token'); // Получаем токен из cookies
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
 

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    if (user) {
     
      setRole(user.role);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  const handleLogout = async () => {
    //console.log( "cookie to del token:"+Cookies.get('token'));
      //console.log( "cookie to del user:"+Cookies.get('user'));
  
      await Logout().catch((error)=>{//console.log(error)}).finally(()=> {
        Cookies.remove('token');
            Cookies.remove('user');
            //console.log("logout")
            setIsAuthenticated(false);
            setRole('');
            navigate('/login');
      });      
     
  };

 
  const dashboardLink = () => {
    switch ( role) {
      case 'job_seeker':
        return '/seeker_dashboard';
      case 'employer':
        return '/employer_dashboard';
      case 'moder':
        return '/moderator_dashboard';
      case 'admin':
        return '/admin_dashboard';
      default:
        return '/';
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = (
    <>
      <Button component={Link} to="/jobs" sx={{ color: location.pathname === '/jobs' ? 'orange' : 'white' }}>
        Вакансии
      </Button>
      <Button component={Link} to="/resumes" sx={{ color: location.pathname === '/resumes' ? 'orange' : 'white' }}>
        Резюме
      </Button>
      {isAuthenticated ? (
        <>
          <Button component={Link} to={dashboardLink()} sx={{ color: location.pathname.includes('/dashboard') ? 'orange' : 'white' }}>
            Личный кабинет
          </Button>
          <Button onClick={handleLogout} sx={{ color: 'white' }}>
            Выйти
          </Button>
        </>
      ) : (
        <>
          <Button component={Link} to="/login" sx={{ color: location.pathname === '/login' ? 'orange' : 'white' }}>
            Вход
          </Button>
          <Button component={Link} to="/register" sx={{ color: location.pathname === '/register' ? 'orange' : 'white' }}>
            Регистрация
          </Button>
        </>
      )}
    </>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2e2e2e' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Логотип и надпись "WorkWave" */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              {/* Кликабельный логотип */}
              <Box
                component={Link}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: 1, // Отступ справа от логотипа
                  textDecoration: 'none',
                }}
              >
                <img
                  src="/images/logo.png" // Путь к логотипу в папке public
                  alt="WorkWave Logo"
                  style={{ width: '40px', height: '40px' }} // Размер логотипа
                />
              </Box>

              {/* Надпись "WorkWave" */}
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{ color: 'white', textDecoration: 'none' }}
              >
                WorkingWaves
              </Typography>
            </Box>

            {/* Ссылки для навигации (десктопная версия) */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
              {navLinks}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Мобильное меню Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <List>
          <ListItem component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Главная" />
          </ListItem>
          <ListItem component={Link} to="/jobs" onClick={handleDrawerToggle}>
            <ListItemText primary="Вакансии" />
          </ListItem>
          <ListItem component={Link} to="/resumes" onClick={handleDrawerToggle}>
            <ListItemText primary="Резюме" />
          </ListItem>
          {isAuthenticated ? (
            <>
              <ListItem onClick={() => { handleLogout(); handleDrawerToggle(); }}>
                <ListItemText primary="Выйти" />
              </ListItem>
              <ListItem component={Link} to={dashboardLink()} onClick={handleDrawerToggle}>
                <ListItemText primary="Личный кабинет" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem component={Link} to="/login" onClick={handleDrawerToggle}>
                <ListItemText primary="Вход" />
              </ListItem>
              <ListItem component={Link} to="/register" onClick={handleDrawerToggle}>
                <ListItemText primary="Регистрация" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Logout } from '../../api';
// import './Navbar.css'; // Дополнительные кастомные стили

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState('');
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get('token');
//     const user = JSON.parse(Cookies.get('user'));
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//     if (user) {
//       setRole(user.role);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [location]);

//   const handleLogout = async () => {
//     try {
//       await Logout();
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       setIsAuthenticated(false);
//       setRole('');
//       navigate('/login');
//     } catch (error) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       setIsAuthenticated(false);
//       setRole('');
//       navigate('/login');
//     }
//   };

//   const dashboardLink = () => {
//     switch (role) {
//       case 'job_seeker':
//         return '/seeker_dashboard';
//       case 'employeer':
//         return '/employer_dashboard';
//       case 'moder':
//         return '/moderator_dashboard';
//       case 'admin':
//         return '/admin_dashboard';
//       default:
//         return '/personal_dashboard';
//     }
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const navLinks = (
//     <>
//       <Button component={Link} to="/jobs" sx={{ color: location.pathname === '/jobs' ? 'orange' : 'white' }}>
//         Вакансии
//       </Button>
//       <Button component={Link} to="/resumes" sx={{ color: location.pathname === '/resumes' ? 'orange' : 'white' }}>
//         Резюме
//       </Button>
//       {isAuthenticated ? (
//         <>
//           <Button component={Link} to={dashboardLink()} sx={{ color: location.pathname.includes('/dashboard') ? 'orange' : 'white' }}>
//             Личный кабинет
//           </Button>
//           <Button onClick={handleLogout} sx={{ color: 'white' }}>
//             Выйти
//           </Button>
//         </>
//       ) : (
//         <>
//           <Button component={Link} to="/login" sx={{ color: location.pathname === '/login' ? 'orange' : 'white' }}>
//             Вход
//           </Button>
//           <Button component={Link} to="/register" sx={{ color: location.pathname === '/register' ? 'orange' : 'white' }}>
//             Регистрация
//           </Button>
//         </>
//       )}
//     </>
//   );

//   return (
//     <>
//       <AppBar position="static" sx={{ backgroundColor: '#2e2e2e' }}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <IconButton
//             color="inherit"
//             aria-label="menu"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ display: { xs: 'block', sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* Логотип и надпись "WorkWave" */}
//           <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//             {/* Кликабельный логотип */}
//             <Box
//               component={Link}
//               to="/"
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 mr: 1, // Отступ справа от логотипа
//                 textDecoration: 'none',
//               }}
//             >
//               <img
//                 src="/images/logo.png" // Путь к логотипу в папке public
//                 alt="WorkWave Logo"
//                 style={{ width: '40px', height: '40px' }} // Размер логотипа
//               />
//             </Box>

//             {/* Надпись "WorkWave" */}
//             <Typography
//               variant="h6"
//               component={Link}
//               to="/"
//               sx={{ color: 'white', textDecoration: 'none' }}
//             >
//               WorkWave
//             </Typography>
//           </Box>

//           {/* Ссылки для навигации (десктопная версия) */}
//           <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
//             {navLinks}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Мобильное меню Drawer */}
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
//         }}
//       >
//         <List>
//           <ListItem component={Link} to="/" onClick={handleDrawerToggle}>
//             <ListItemText primary="Главная" />
//           </ListItem>
//           <ListItem component={Link} to="/jobs" onClick={handleDrawerToggle}>
//             <ListItemText primary="Вакансии" />
//           </ListItem>
//           <ListItem component={Link} to="/resumes" onClick={handleDrawerToggle}>
//             <ListItemText primary="Резюме" />
//           </ListItem>
//           {isAuthenticated ? (
//             <>
//               <ListItem onClick={() => { handleLogout(); handleDrawerToggle(); }}>
//                 <ListItemText primary="Выйти" />
//               </ListItem>
//               <ListItem component={Link} to={dashboardLink()} onClick={handleDrawerToggle}>
//                 <ListItemText primary="Личный кабинет" />
//               </ListItem>
//             </>
//           ) : (
//             <>
//               <ListItem component={Link} to="/login" onClick={handleDrawerToggle}>
//                 <ListItemText primary="Вход" />
//               </ListItem>
//               <ListItem component={Link} to="/register" onClick={handleDrawerToggle}>
//                 <ListItemText primary="Регистрация" />
//               </ListItem>
//             </>
//           )}
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;
 