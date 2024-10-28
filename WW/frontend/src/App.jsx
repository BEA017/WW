import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import PrivacyPolicy from './components/home/PrivacyPolicy';
import TermsOfService from './components/home/TermsOfService';
import JobsPage from './components/JobsPage/JobsPage';
import JobDetailsPage from './components/JobDetailsPage/JobDetailsPage';
import ResumesPage from './components/ResumesPage/ResumesPage';
import ResumeDetailsPage from './components/ResumeDetailsPage/ResumeDetailsPage';
import LoginPage from './components/Auth/Login';
import RegisterPage from './components/Auth/Register';
import Verify from './components/Auth/Verify';
import SeekerDashboard from './components/Dashboard/Seeker/SeekerDashboard';
import EmployerDashboard from './components/Dashboard/Employer/EmployerDashboard';
import AdminDashboard from './components/Dashboard/Admin/AdminDashboard';
import ModeratorDashboard from './components/Dashboard/Moder/ModeratorDashboard';
import AddResume from './components/Dashboard/Seeker/AddResume';
import EditResume from './components/Dashboard/Seeker/EditResume';
import UserEdit from './components/Dashboard/Seeker/UserEdit';
import AddJob from './components/Dashboard/Employer/AddJob';
import EditJob from './components/Dashboard/Employer/EditJob';
import Layout from './Layout';
import CompanyPage from './components/Dashboard/CompanyPage';
import CompanyEdit from './components/Dashboard/Employer/CompanyEdit';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/resumes" element={<ResumesPage />} />
          <Route path="/resumes/:id" element={<ResumeDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          {/* Маршрут для страницы подтверждения email */}
          <Route path="/user/email-verify" component={<Verify/>} />

          {/* Маршрут для страницы ошибок */}
          {/* <Route path="/error" component={ErrorPage} /> */}

          {/* Обработка неизвестных маршрутов */}
          {/* <Route path="*">
            <div>Страница не найдена</div>
          </Route> */}

          <Route path="/company/:id" element={<CompanyPage />} />

          {/* Пути для редактирования данных о копании*/}
          <Route path="/company/:id/edit" element={
            <ProtectedRoute allowedRoles={['employer']}>
              <CompanyEdit />
            </ProtectedRoute>
          } />

          {/* Пути к кабинету соискателя */}
          <Route path="/seeker_dashboard" element={
            <ProtectedRoute allowedRoles={['job_seeker']}>
              <SeekerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user/:id/edit" element={
            <ProtectedRoute allowedRoles={['job_seeker']}>
              <UserEdit />
            </ProtectedRoute>
          } />
          <Route path="/resumes/create_resume_page" element={
            <ProtectedRoute allowedRoles={['job_seeker']}>
              <AddResume />
            </ProtectedRoute>
          } />
          <Route path="/resumes/:id/edit" element={
            <ProtectedRoute allowedRoles={['job_seeker']}>
              <EditResume />
            </ProtectedRoute>
          } />
          {/* Пути к кабинету работодателя */}
          <Route path="/employer_dashboard" element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerDashboard />
            </ProtectedRoute>
          } />

          <Route path="/jobs/create_job_page" element={
            <ProtectedRoute allowedRoles={['employer']}>
              <AddJob />
            </ProtectedRoute>
          } />

          <Route path="/jobs/:id/edit" element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EditJob />
            </ProtectedRoute>
          } />
          {/* Пути к кабинету Админа */}
          <Route path="/admin_dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Пути к кабинету Модератора */}
          <Route path="/moderator_dashboard" element={
            <ProtectedRoute allowedRoles={['moder']}>
              <ModeratorDashboard />
            </ProtectedRoute>
          } />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/home/HomePage';  
// import JobsPage from './components/JobsPage/JobsPage';
// import JobDetailsPage from './components/JobDetailsPage/JobDetailsPage';
// import ResumesPage from './components/ResumesPage/ResumesPage';
// import ResumeDetailsPage from './components/ResumeDetailsPage/ResumeDetailsPage';
// import Login from './components/Auth/Login';
// import RegisterPage from './components/Auth/Register';
// import ProtectedRoute from './components/Dashboard/ProtectedRoute';
// import SeekerDashboard from './components/Dashboard/SeekerDashboard';
// import EmployerDashboard from './components/Dashboard/EmployerDashboard';
// import AdminDashboard from './components/Dashboard/AdminDashboard';
// import ModeratorDashboard from './components/Dashboard/ModeratorDashboard';
// import Layout from './Layout';

// function App() {
//   return (
//     <Router>
//       <Layout>
//       <Routes>
//         <Route path="/" element={<HomePage />} />  
//         <Route path="/jobs" element={<JobsPage />} />
//         <Route path="/jobs/:id" element={<JobDetailsPage />} />
//         <Route path="/resumes" element={<ResumesPage />} />
//         <Route path="/resumes/:id" element={<ResumeDetailsPage />} />
//          <Route path="/register" element={<RegisterPage />} />
//         <Route path="/login" element={<Login />} />

// <Route path="/seeker_dashboard" element={
//   <ProtectedRoute allowedRoles={['job_seeker']}>
//     <SeekerDashboard />
//   </ProtectedRoute>
// } />


//       </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;

