 
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, Avatar } from '@mui/material';
import { fetchCompanyDetails, updateCompany, deleteCompany } from '../../../api';

const CompanyModal = ({ companyId, open, onClose, onDataChange }) => {
  const [company, setCompany] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', website: '', description: '' });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
     if (companyId && open) {
      fetchCompanyDetails(companyId)
        .then((response) => {
           setCompany(response.data);
          setUser(response.data.user);
          setFormData({
            name: response.data.name,
            website: response.data.website,
            description: response.data.description,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching company details:', error);
          setLoading(false);
        });
    }
  }, [companyId, open]);

  const handleSave = async() => {
    // updateCompanyM(companyId, formData).then(() => onClose());
    await updateCompany(companyId, formData).then(() => onClose()); // Отправляем обновленные данные
    onDataChange()
  };

  const handleDelete = () => {
    deleteCompany(companyId).then(() => onClose());
    onDataChange()
  };
  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  if (loading) return <CircularProgress />;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4,
       backgroundColor: 'white', 
       width: '600px',
       margin: 'auto', 
       mt: '5%' ,
       maxHeight: '80vh',  
       overflowY: 'auto'   }}>
        <Typography variant="h5">Редактирование компании</Typography>
        <TextField
          label="Название"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Сайт"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Описание"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />  
        <Box sx={{ p: 2 }} display="flex" flexDirection="row" alignItems="center">
                
                  {company?.logo && (
                     <Avatar
                      alt={company.name}
                      src={`/images/logos/${company.logo}`}  // Ссылка на логотип
                      sx={{ width: 156, height: 156 }}
                    />
                   )}
        </Box>
           <label htmlFor="avatar-upload">
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })}
              style={{ display: 'none' }}
            />
            <Button variant="contained" component="span">
              Загрузить аватар
            </Button>
            {avatar && <Typography variant="body2" sx={{ mt: 1 }}>{avatar.name}</Typography>}
          </label>
         {/* Информация о пользователе */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Пользователь:</Typography>
          <Typography>Имя: {user?.name || 'Не указано'}</Typography>
          <Typography>Email: {user?.email || 'Не указано'}</Typography>
          <Typography>Телефон: {user?.phone || 'Не указано'}</Typography>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="success" onClick={handleSave}>Сохранить</Button>
          {/* <Button variant="contained" color="error" onClick={handleDelete}>Удалить</Button> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default CompanyModal;



// import React, { useState, useEffect } from 'react';
// import { Modal, Box, Typography, TextField, Button, CircularProgress, Avatar } from '@mui/material';
// import { fetchCompanyDetails, updateCompany, deleteCompany } from '../../../api';

// const CompanyModal = ({ companyId, open, onClose }) => {
//   const [company, setCompany] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({ name: '', website: '', description: '' });
//   const [avatar, setAvatar] = useState(null);

//   useEffect(() => {
//      if (companyId && open) {
//       fetchCompanyDetails(companyId)
//         .then((response) => {
//            setCompany(response.data);
//           setUser(response.data.user);
//           setFormData({
//             name: response.data.name,
//             website: response.data.website,
//             description: response.data.description,
//           });
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching company details:', error);
//           setLoading(false);
//         });
//     }
//   }, [companyId, open]);

//   const handleSave = async() => {
//     // updateCompanyM(companyId, formData).then(() => onClose());
//     await updateCompany(companyId, formData); // Отправляем обновленные данные

//   };

//   const handleDelete = () => {
//     deleteCompany(companyId).then(() => onClose());
//   };
//   const handleAvatarChange = (event) => {
//     setAvatar(event.target.files[0]);
//   };

//   if (loading) return <CircularProgress />;

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{ p: 4,
//        backgroundColor: 'white', 
//        width: '600px',
//        margin: 'auto', 
//        mt: '5%' ,
//        maxHeight: '80vh',  
//        overflowY: 'auto'   }}>
//         <Typography variant="h5">Редактирование компании</Typography>
//         <TextField
//           label="Название"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Сайт"
//           value={formData.website}
//           onChange={(e) => setFormData({ ...formData, website: e.target.value })}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Описание"
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           fullWidth
//           sx={{ mb: 2 }}
//         />  
//         <Box sx={{ p: 2 }} display="flex" flexDirection="row" alignItems="center">
                
//                   {company?.logo && (
//                      <Avatar
//                       alt={company.name}
//                       src={`http://localhost:8000/images/logos/${company.logo}`}  // Ссылка на логотип
//                       sx={{ width: 156, height: 156 }}
//                     />
//                    )}
//         </Box>
//            <label htmlFor="avatar-upload">
//             <input
//               accept="image/*"
//               id="avatar-upload"
//               type="file"
//               onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })}
//               style={{ display: 'none' }}
//             />
//             <Button variant="contained" component="span">
//               Загрузить аватар
//             </Button>
//             {avatar && <Typography variant="body2" sx={{ mt: 1 }}>{avatar.name}</Typography>}
//           </label>
//          {/* Информация о пользователе */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Пользователь:</Typography>
//           <Typography>Имя: {user?.name || 'Не указано'}</Typography>
//           <Typography>Email: {user?.email || 'Не указано'}</Typography>
//           <Typography>Телефон: {user?.phone || 'Не указано'}</Typography>
//         </Box>

//         <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
//           <Button variant="contained" color="success" onClick={handleSave}>Сохранить</Button>
//           {/* <Button variant="contained" color="error" onClick={handleDelete}>Удалить</Button> */}
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default CompanyModal;
