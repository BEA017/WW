// import React, { useState, useEffect } from 'react';
// import { TextField, Button, MenuItem, Grid, Box, Typography, Chip } from '@mui/material';
// import Select from 'react-select';
// import { fetchCategories, fetchLocations,  createResume } from '../../api';

 

// function AddResume() {
//   const [resumeName, setResumeName] = useState('');
//   const [avatar, setAvatar] = useState(null);
//   const [category, setCategory] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState('');
//   const [locations, setLocations] = useState([]);
//   const [desiredSalary, setDesiredSalary] = useState('');
//   const [experience, setExperience] = useState('');
//   const [education, setEducation] = useState('');
//   const [aboutMe, setAboutMe] = useState('');
//   const [skills, setSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState('');
//   // Поля для водительских удостоверений и языков
//   // const [driverLicenses, setDriverLicenses] = useState([]);
//   // const [selectedLicenses, setSelectedLicenses] = useState([]);
   
//   // const [languages, setLanguages] = useState([]);
//   // const [selectedLanguages, setSelectedLanguages] = useState([]);
  
 
  
//   // Загрузка данных с сервера
//   useEffect(() => {
//     const loadData = async () => {
//             try {
//               const [categoriesData, locationsData ] = await Promise.all([
//                 fetchCategories(),
//                 fetchLocations(),
//                 // fetchLanguage(),
//                 // fetchDriverLicense()
//               ]);
            
//             setCategories(categoriesData);
//             setLocations(locationsData);
//             // setDriverLicenses(driverLicenseData);
//             // setLanguages(languageData);
//             //console.log(categoriesData,
//               locationsData
              
//               );
//            } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
//         loadData();
//       }, []);
    
  
 
//   // Обработчики для полей
//   const handleAvatarChange = (event) => {
//     setAvatar(event.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('resume_name', resumeName);
//     formData.append('avatar', avatar);
//     formData.append('category_id', category);
//     formData.append('email', email);
//     formData.append('phone', phone);
//     formData.append('location_id', location);
//     formData.append('desired_salary', desiredSalary);
//     formData.append('experience', experience);
//     formData.append('education', education);
//     formData.append('about_me', aboutMe);

//     //  formData.append('driver_licenses', JSON.stringify(selectedLicenses)); // Передаем массив выбранных удостоверений

//     // formData.append('languages', JSON.stringify(selectedLanguages)); // Передаем массив выбранных языков с уровнями
//     formData.append('skills', JSON.stringify(skills)); // Передаем массив навыков

//     try {
    
//       const response = createResume(formData);
//       //console.log('Резюме успешно создано', response.data);
//     } catch (error) {
//       console.error('Ошибка при создании резюме:', error);
//     }
//   };

//   // Добавление нового навыка
//   const handleAddSkill = () => {
//     if (newSkill && !skills.includes(newSkill)) {
//       setSkills([...skills, newSkill]);
//       setNewSkill('');
//     }
//   };
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Box, Typography, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Используем useNavigate
import { toast, ToastContainer } from 'react-toastify'; // Импортируем toast и ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Стили для уведомлений
import { fetchCategories, fetchLocations, createJob, fetchEmploymentTypes, fetchWorkSchedules } from '../../../api'; 
 
function AddResume() {
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
  const navigate = useNavigate(); // Инициализируем navigate для редиректа

  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [workSchedules, setWorkSchedules] = useState([]);
  const [employmentType, setEmploymentType] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');



  // Загрузка данных с сервера
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, locationsData, employmentTypesData, workSchedulesData] = 
        await Promise.all([fetchCategories(), fetchLocations(), fetchEmploymentTypes(), fetchWorkSchedules()]);
        setCategories(categoriesData);
        setLocations(locationsData);
        setEmploymentTypes(employmentTypesData);
        setWorkSchedules(workSchedulesData);     
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append('title', title);
     formData.append('category_id', category);
    formData.append('contact_email', email);
    formData.append('contact_phone', phone);
    formData.append('location_id', location);
    formData.append('work_schedule_id',workSchedule );
    formData.append('employment_type_id',employmentType );
    formData.append('salary', salary);
    formData.append('requirements_education', education);
    formData.append('requirements_experience', experience);
    formData.append('description', description);
    formData.append('skills', JSON.stringify(skills));

    try {
      await createJob(formData);
      toast.success('Резюме успешно добавлено!'); // Показ уведомления

      setTimeout(() => {
        navigate('/employer_dashboard'); // Редирект через 2 секунды
      }, 2000);
    } catch (error) {
      toast.error('Ошибка при создании резюме. Проверьте данные и попробуйте снова.');
      console.error('Ошибка при создании резюме:', error);
    }
  };

  // Добавление нового навыка
  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };
  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 5, p: 3, borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Добавить вакансию
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
           
          <Grid item xs={12} >
            <TextField
              fullWidth
              select
              label="Категория"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              helperText="Выберите категорию специализации. *Обязательное поле."
              FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Водительское удостоверение
          <Grid item xs={12} sx={{ zIndex: 11}}>
            <Select
              isMulti
              
              options={driverLicenses.map((license) => ({
                value: license.id,
                label: license.name,
              }))}
              onChange={(selectedOptions) =>
                setSelectedLicenses(selectedOptions.map(option => option.value))
              }
              placeholder="Выберите категории водительских прав"
            />
          </Grid> */}
         

          {/* Языки и уровень
          <Grid item xs={12} sx={{ zIndex: 10}}>
            <Select
              isMulti
              options={languages.map((language) => ({
                value: language.id,
                label: language.name,
              }))}
              onChange={(selectedOptions) =>
                setSelectedLanguages(selectedOptions.map(option => option.value))
              }
              placeholder="Выберите языки и уровень владения"
            />
          </Grid> */}

          {/* Основные навыки */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Добавить навык"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              helperText="Введите навык и нажмите Enter"
            />
            <Box mt={2}>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => setSkills(skills.filter((s) => s !== skill))}
                  sx={{ marginRight: 1, marginBottom: 1 }}
                />
              ))}
            </Box>
          </Grid>
 
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Местоположение"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              helperText="Выберите ваше местоположение. *Обязательное поле."
              FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}
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
              helperText="Укажите зарплату"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Опыт работы"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              helperText="Укажите необходимый опыт работы"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Образование"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              helperText="Укажите необходимое образование"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="О вакансии"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText="Укажите дополнительную информацию о вакансии"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="Укажите контактную электронную почту. *Обязательное поле."
              FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              helperText="Укажите контактный телефон. *Обязательное поле."
              FormHelperTextProps={{
                sx: { color: 'red' }, // Задаем цвет текста
              }}
            />
          </Grid>

          <Grid item xs={12} >
            <TextField
              fullWidth
              select
              label="Тип занятости"
              value={employmentType || ''}
              onChange={(e) => setEmploymentType(e.target.value)}
              helperText="Выберите категорию специализации.*Обязательное поле." 
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
              helperText="Выберите категорию специализации.*Обязательное поле." 
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
              Сохранить вакансию
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer /> {/* Контейнер для уведомлений */}

    </Box>
  );
}

export default AddResume;

 