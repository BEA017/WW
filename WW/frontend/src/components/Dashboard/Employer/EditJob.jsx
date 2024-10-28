import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Box, Typography, Chip } from '@mui/material';
import { fetchCategories, fetchLocations, fetchJobDetails, updateJob, deleteJob, fetchEmploymentTypes, fetchWorkSchedules} from '../../../api';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Импортируем toast и ToastContainer
 
function EditJob() {
  const { id } = useParams(); // Получаем ID резюме из URL

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [ad_status, setAd_status] = useState('2');

  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [workSchedules, setWorkSchedules] = useState([]);
  const [employmentType, setEmploymentType] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');

  
  const navigate = useNavigate(); // Инициализируем navigate для редиректа

  // Загрузка данных с сервера
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, locationsData, jobData, employmentTypesData, workSchedulesData] = await Promise.all([
            fetchCategories(),
            fetchLocations(),            
            fetchJobDetails(id),
            fetchEmploymentTypes(), 
            fetchWorkSchedules(),
        ]);
        
        setCategories(categoriesData);
        setLocations(locationsData);    
             
        setEmploymentTypes(employmentTypesData);
        setWorkSchedules(workSchedulesData);  

        setEmploymentType(jobData.data.employment_type_id);
        setWorkSchedule(jobData.data.work_schedule_id);

        setTitle(jobData.data.title);
        setCategory(jobData.data.category_id);
        setPhone(jobData.data.contact_phone);
        setEmail(jobData.data.contact_email);
        setLocation(jobData.data.location_id);
        setSalary(jobData.data.salary);
        setEducation(jobData.data.requirements_education);
        setExperience(jobData.data.requirements_experience);
        setDescription(jobData.data.description);
        setSkills(jobData.data.skills || []);
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
    formData.append('title', title);
    formData.append('category_id', category);
    formData.append('contact_email', email);
    formData.append('contact_phone', phone);
    formData.append('location_id', location);
    formData.append('work_schedule_id', workSchedule);
    formData.append('employment_type_id', employmentType);
    formData.append('salary', salary);
    formData.append('requirements_education', education);
    formData.append('requirements_experience', experience);
    formData.append('description', description);
    formData.append('ad_status', ad_status);

    formData.append('skills', JSON.stringify(skills));

    try {
      const response = await updateJob(id, formData); // Отправляем обновленные данные
      toast.success('Вакансия успешно обновлено!'); // Показ уведомления

      setTimeout(() => {
        navigate('/employer_dashboard'); // Редирект через 2 секунды
      }, 2000);
    } catch (error) {
      toast.error('Ошибка при обновлении вакансии. Проверьте данные и попробуйте снова.');
      console.error('Ошибка при обновлении вакансии:', error);
    }
  };

  const handleArchive = async (e) => {
    e.preventDefault();
    setAd_status(4);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category_id', category);
    formData.append('contact_email', email);
    formData.append('contact_phone', phone);
    formData.append('location_id', location);
    formData.append('work_schedule_id', workSchedule);
    formData.append('employment_type_id', employmentType);
    formData.append('salary', salary);
    formData.append('requirements_education', education);
    formData.append('requirements_experience', experience);
    formData.append('description', description);
    formData.append('skills', JSON.stringify(skills));
    formData.append('ad_status', 4);

    try {
      await updateJob(id, formData ); // Архивация  
      toast.success('Вакансия успешно архивировано!');
      setTimeout(() => navigate('/employer_dashboard'), 2000);
    } catch (error) {
      console.error('Ошибка при архивации вакансии:', error);
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    setAd_status(3);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category_id', category);
   formData.append('contact_email', email);
   formData.append('contact_phone', phone);
   formData.append('location_id', location);
   formData.append('work_schedule_id', workSchedule);
   formData.append('employment_type_id', employmentType);
   formData.append('salary', salary);
   formData.append('requirements_education', education);
   formData.append('requirements_experience', experience);
   formData.append('description', description);
   formData.append('skills', JSON.stringify(skills));
   formData.append('ad_status', 3);

    try {     
      await updateJob(id, formData); // Сохранение в черновик  
      toast.success('Вакансия сохранено в черновики!');
      setTimeout(() => navigate('/employer_dashboard'), 2000);
    } catch (error) {
      console.error('Ошибка при сохранении вакансии в черновики:', error);
    }
  };

  const handleDelete = async () => {
    try {
      
      await deleteJob(id); // Удаление резюме
      toast.success('Вакансия успешно удалено!');
      setTimeout(() => navigate('/employer_dashboard'), 1000);
    } catch (error) {
      console.error('Ошибка при удалении вакансии:', error);
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
    <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 5, p: 3, borderRadius: '8px', boxShadow: 3 }}>
    <Typography variant="h4" align="center" gutterBottom>
      Редактирование вакансии
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
             <TextField
              fullWidth
              label="Название вакансии"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helperText="Введите краткое название вакансии. *Обязательное поле."
              FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}
            />
           
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
            label="Зарплата"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
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
            label="Информация о вакансии"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

          
          <Grid item xs={12} >
            <TextField
              fullWidth
              select
              label="Тип занятости"
              value={employmentType || ''}
              onChange={(e) => setEmploymentType(e.target.value)}
              helperText="Укажите тип занятости.*Обязательное поле." 
                FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}             
            >
              {employmentTypes.map((employmentType) => (
                <MenuItem key={employmentType.id} value={employmentType.id}>
                  {employmentType.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
 
          <Grid item xs={12} >
            <TextField
              fullWidth
              select
              label="График работы"
              value={workSchedule || ''}
              onChange={(e) => setWorkSchedule(e.target.value)}
              helperText="Укажите график работы.*Обязательное поле." 
                FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}                           
            >
              {workSchedules.map((workSchedule) => (
                <MenuItem key={workSchedule.id} value={workSchedule.id}>
                  {workSchedule.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Обновить вакансию
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

export default EditJob;
