import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = Cookies.get('token'); // Получаем токен из cookies
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  
  //console.log("PRToken:"+token);
  //console.log("PRUser:"+user.role);

  if (!token || !user  || !allowedRoles.includes(user.role)) {
    //console.log("returnPR");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const token = Cookies.get('token');
//   const user = JSON.parse(Cookies.get('user'));

//   if (!token || !user || !allowedRoles.includes(user.role)) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

