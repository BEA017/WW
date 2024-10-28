import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Box, Typography, Chip } from '@mui/material';
import { fetchCategories, fetchLocations, fetchResumeDetails, updateResume, deleteResume } from '../../../api';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Импортируем toast и ToastContainer
 
function EditResume() {
  const { id } = useParams(); // Получаем ID резюме из URL
  const [resumeName, setResumeName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ad_status, setAd_status] = useState('2');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [desiredSalary, setDesiredSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  
  const navigate = useNavigate(); // Инициализируем navigate для редиректа

  // Загрузка данных с сервера
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, locationsData, resumeData] = await Promise.all([
            fetchCategories(),
            fetchLocations(),
          fetchResumeDetails(id)
        ]);

        setCategories(categoriesData);
        setLocations(locationsData);
        // Заполняем поля резюме данными с сервера
        // //console.log("!!!RD:",resumeData.data);

        setResumeName(resumeData.data.resume_name);
        setCategory(resumeData.data.category_id);
        setEmail(resumeData.data.email);
        setPhone(resumeData.data.phone);
        setLocation(resumeData.data.location_id);
        setDesiredSalary(resumeData.data.desired_salary);
        setExperience(resumeData.data.experience);
        setEducation(resumeData.data.education);
        setAboutMe(resumeData.data.about_me);
        setSkills(resumeData.data.skills || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, [id]);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('resume_name', resumeName);
    formData.append('avatar', avatar);
    formData.append('category_id', category);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('location_id', location);
    formData.append('desired_salary', desiredSalary);
    formData.append('experience', experience);
    formData.append('education', education);
    formData.append('about_me', aboutMe);
    formData.append('ad_status', ad_status);
    formData.append('skills', JSON.stringify(skills));

    try {
      const response = await updateResume(id, formData); // Отправляем обновленные данные
      toast.success('Резюме успешно обновлено!'); // Показ уведомления

      setTimeout(() => {
        navigate('/seeker_dashboard'); // Редирект через 2 секунды
      }, 2000);
    } catch (error) {
      toast.error('Ошибка при обновлении резюме. Проверьте данные и попробуйте снова.');
      console.error('Ошибка при обновлении резюме:', error);
    }
  };

  const handleArchive = async (e) => {
    e.preventDefault();
    setAd_status(4);
    const formData = new FormData();
    formData.append('resume_name', resumeName);
    formData.append('avatar', avatar);
    formData.append('category_id', category);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('location_id', location);
    formData.append('desired_salary', desiredSalary);
    formData.append('experience', experience);
    formData.append('education', education);
    formData.append('about_me', aboutMe);
    formData.append('ad_status', 4);
    formData.append('skills', JSON.stringify(skills));

    try {
      await updateResume(id, formData ); // Архивация (ad_status = 3)
      toast.success('Резюме успешно архивировано!');
      setTimeout(() => navigate('/seeker_dashboard'), 2000);
    } catch (error) {
      console.error('Ошибка при архивации резюме:', error);
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    setAd_status(3);
    const formData = new FormData();
    formData.append('resume_name', resumeName);
    formData.append('avatar', avatar);
    formData.append('category_id', category);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('location_id', location);
    formData.append('desired_salary', desiredSalary);
    formData.append('experience', experience);
    formData.append('education', education);
    formData.append('about_me', aboutMe);
    formData.append('ad_status', 3);
    formData.append('skills', JSON.stringify(skills));

    try {     
      await updateResume(id, formData); // Сохранение в черновик (ad_status = 4)
      toast.success('Резюме сохранено в черновики!');
      setTimeout(() => navigate('/seeker_dashboard'), 2000);
    } catch (error) {
      console.error('Ошибка при сохранении резюме в черновики:', error);
    }
  };

  const handleDelete = async () => {
    try {
      
      await deleteResume(id); // Удаление резюме
      toast.success('Резюме успешно удалено!');
      setTimeout(() => navigate('/seeker_dashboard'), 1000);
    } catch (error) {
      console.error('Ошибка при удалении резюме:', error);
    }
  };
 // Добавление нового навыка
 const handleAddSkill = () => {
    if (newSkill.trim() === '') return; // Игнорируем пустые значения

  // Добавляем новый навык в массив
  setSkills((prevSkills) => [
    ...prevSkills,
    { id: Date.now(), name: newSkill } // Генерация уникального id
  ]);

  // Очищаем поле ввода
  setNewSkill('');
  
  };

  return (
    <Box sx={{ maxWidth: '60vh', margin: 'auto', mt: 5, p: 3, borderRadius: '8px', boxShadow: 3 }}>
    <Typography variant="h4" align="center" gutterBottom>
      Редактирование резюме
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Название резюме"
            helperText="*Обязательное поле."
              FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="avatar-upload">
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
            <Button variant="contained" component="span">
              Загрузить аватар
            </Button>
            {avatar && <Typography variant="body2" sx={{ mt: 1 }}>{avatar.name}</Typography>}
          </label>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Категория"
            helperText="*Обязательное поле."
            FormHelperTextProps={{
              sx: { color: 'red' }, // Задаем цвет текста
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Добавить навык"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? handleAddSkill() : null}
          />
          <Button onClick={handleAddSkill} sx={{ mt: 2 }} variant="outlined">
            Добавить навык
          </Button>
          <Box sx={{ mt: 2 }}>
          {skills.length > 0 ? (
                skills.map((skill) => (
                <Chip key={skill.id} label={skill.name} style={{ margin: '4px' }}  onDelete={() => setSkills(skills.filter((s) => s !== skill))}/>
                ))
            ) : (
                <Typography variant="body2">Нет добавленных навыков</Typography>
            )}
             
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Местоположение"
            helperText="*Обязательное поле."
            FormHelperTextProps={{
              sx: { color: 'red' }, // Задаем цвет текста
            }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Желаемая зарплата"
            value={desiredSalary}
            onChange={(e) => setDesiredSalary(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Опыт работы"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Образование"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Обо мне"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="*Обязательное поле."
              FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Телефон"
              helperText="*Обязательное поле."
              FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
             />
          </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Обновить резюме
          </Button>
            {/* Кнопки Архивировать, Сохранить в черновики, Удалить */}
          <Grid item xs={12} sx={{mt:1}}>
            <Button fullWidth variant="contained" color="warning" onClick={handleSaveDraft}>Сохранить в черновики</Button>
          </Grid>
          <Grid item xs={12} sx={{mt:1}}>
            <Button fullWidth variant="contained" color="secondary" onClick={handleArchive}>Архивировать</Button>
          </Grid>          
          <Grid item xs={12} sx={{mt:1}}>
            <Button fullWidth variant="contained" color="error" onClick={handleDelete}>Удалить</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    <ToastContainer /> {/* Контейнер для уведомлений */}

  </Box>
);
}

export default EditResume;
