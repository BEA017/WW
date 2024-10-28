// EditCompany.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserDetails, updateUser } from '../../../api';
import { toast, ToastContainer } from 'react-toastify'; // Импортируем toast и ToastContainer

const UserEdit = () => {
  const { id } = useParams();
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
 
  const navigate = useNavigate();
 

  useEffect(() => {
    const loadData = async (id) => {
      try {
        // Подставляем id компании в запрос
        const userData = await fetchUserDetails(id); 
         setName(userData.user.name);
      
       } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData(id);
  }, [id]);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('avatar', avatar);
    
     //console.log("page"+formData);
    try {
       await updateUser(id, formData); // Отправляем обновленные данные
      toast.success('Данные успешно обновлены!'); // Показ уведомления

      setTimeout(() => {
        navigate('/seeker_dashboard'); // Редирект через 2 секунды
      }, 2000);
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
      toast.error('Ошибка при обновлении . Проверьте данные и попробуйте снова.');      
    }
  };
  return (
 
    <Box 
    component="form" 
    onSubmit={handleSubmit} 
    sx={{ maxWidth: '600px', margin: 'auto', mt: 5, p: 3, borderRadius: '8px', boxShadow: 3 }}>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <TextField
            fullWidth
            label="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12}>
          <label htmlFor="avatar-upload">
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <Button variant="contained" component="span">
              Сменить аватар
            </Button>
            {avatar && <Typography variant="body2" sx={{ mt: 1 }}>{avatar.name}</Typography>}
          </label>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">Сохранить изменения</Button>
        </Grid>
      </Grid>
      <ToastContainer /> {/* Контейнер для уведомлений */}

    </Box>
  );
};

export default UserEdit;
