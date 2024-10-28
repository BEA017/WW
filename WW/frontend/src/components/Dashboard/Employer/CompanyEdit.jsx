// EditCompany.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompany, updateCompany } from '../../../api';
import { toast, ToastContainer } from 'react-toastify'; // Импортируем toast и ToastContainer

const CompanyEdit = () => {
  const { id } = useParams();
  
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');

  const navigate = useNavigate();
 

  useEffect(() => {
    const loadData = async (companyId) => {
      try {
        // Подставляем id компании в запрос
        const compData = await fetchCompany(companyId); 
        setUserName(compData.user.name);
        setTitle(compData.name);
        setDescription(compData.description);
        setWebsite(compData.website);
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
    formData.append('user_name', userName);
    formData.append('name', title);
    formData.append('logo', avatar);
    formData.append('description', description);
    formData.append('website', website);
     //console.log(formData);
    try {
      await updateCompany(id, formData); // Отправляем обновленные данные
      toast.success('Данные успешно обновлены!'); // Показ уведомления

      setTimeout(() => {
        navigate('/employer_dashboard'); // Редирект через 2 секунды
      }, 2000);
    } catch (error) {
      toast.error('Ошибка при обновлении . Проверьте данные и попробуйте снова.');
      console.error('Ошибка при обновлении:', error);
    }
  };
  return (
 
    <Box 
    component="form" 
    onSubmit={handleSubmit} 
    sx={{ maxWidth: '600px', margin: 'auto', mt: 5, p: 3, borderRadius: '8px', boxShadow: 3 }}>
      <Grid container spacing={3}>
      <Grid item xs={12}    >
          <TextField
            label="Ваше имя"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
          />
        </Grid>
         <Grid item xs={12} >
          <TextField
            label="Название компании"
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}  >
          <TextField
            label="Вебсайт компании"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Описание компании"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
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
              Загрузить аватар
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

export default CompanyEdit;
