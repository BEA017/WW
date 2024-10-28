import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, CircularProgress, Avatar } from '@mui/material';
import { fetchUserDetails, makeModerator, deleteUser } from '../../../api'; // Предполагается, что эти функции реализованы

const UserModal = ({ userId, open, onClose, onDataChange }) => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    if (userId && open) {
      fetchUserDetails(userId)
        .then((response) => {
           setUser(response.user);
           if (response.user.role === 'employer') {
            setCompany(response.company); // Если пользователь - работодатель, загружаем данные о компании
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          setLoading(false);
        });
    }
    
  }, [userId, open]);

  const handleMakeModerator = async () => {
    await makeModerator(userId);
    onDataChange(); // Обновляем данные после изменения
    onClose(); // Закрываем модальное окно
  };

  const handleDeleteUser = async () => {
    await deleteUser(userId);
    onDataChange(); // Обновляем данные после удаления
    onClose(); // Закрываем модальное окно
  };

  if (loading) return <CircularProgress />;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: 'white',
          width: '600px',
          margin: 'auto',
          mt: '5%',
          maxHeight: '80vh',
          overflowY: 'auto',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h5">Информация о пользователе</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>Имя: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Роль: {user.role}</Typography>
         </Box>

        {company && (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ p: 2 }} display="flex" flexDirection="row" alignItems="center">                
                {company?.logo && (
                   <Avatar
                    alt={company.name}
                    src={`/images/logos/${company.logo}`}  // Ссылка на логотип
                    sx={{ width: 156, height: 156 }}
                  />
                 )}
            </Box>
            <Typography variant="h6">Информация о компании</Typography>
            <Typography>Название: {company.name}</Typography>
            <Typography>Описание: {company.description}</Typography>
            <Typography>Сайт: {company.website}</Typography>
          </Box>
        )}
        
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        {!company && (
          <Button variant="contained" color="success" onClick={handleMakeModerator}>
            Сделать модератором
          </Button>) }
        
          <Button variant="contained" color="error" onClick={handleDeleteUser}>
            Удалить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;
