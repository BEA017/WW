import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Autocomplete, Grid } from '@mui/material';
import { fetchCategories, fetchLocations, fetchEmploymentTypes, fetchWorkSchedules } from '../../api'; // Импорт API функций

const ResumesFilter = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');

  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [workSchedules, setWorkSchedules] = useState([]);
  const [employmentType, setEmploymentType] = useState(null);
  const [workSchedule, setWorkSchedule] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, locationsData, employmentTypesData, workSchedulesData] = await Promise.all([
          fetchCategories(),
          fetchLocations(),
          fetchEmploymentTypes(),
          fetchWorkSchedules(),
        ]);
        
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

  const handleFilterChange = () => {
    // Передаем текущие значения в родительский компонент
    onFilterChange({
      category: category ? category.id : null,
      location: location ? location.id : null,
      salaryRange: `${salaryMin}-${salaryMax}`,
      employmentType: employmentType ? employmentType.id : null,
      workSchedule: workSchedule ? workSchedule.id : null,
    });
  };

  const handleResetFilters = () => {
    // Сброс всех фильтров
    setCategory(null);
    setLocation(null);
    setSalaryMin('');
    setSalaryMax('');
    setEmploymentType(null);
    setWorkSchedule(null);

    // Передаем пустые значения в родительский компонент
    onFilterChange({
      category: null,
      location: null,
      salaryRange: '',
      employmentType: null,
      workSchedule: null,
    });
  };

  return (
    <Box>
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.name}
        value={category}
        onChange={(event, newValue) => setCategory(newValue)}
        renderInput={(params) => <TextField {...params} label="Категория" variant="outlined" margin="normal" />}
      />
      <Autocomplete
        options={locations}
        getOptionLabel={(option) => option.name}
        value={location}
        onChange={(event, newValue) => setLocation(newValue)}
        renderInput={(params) => <TextField {...params} label="Регион" variant="outlined" margin="normal" />}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Зарплата от"
            variant="outlined"
            fullWidth
            margin="normal"
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Зарплата до"
            variant="outlined"
            fullWidth
            margin="normal"
            value={salaryMax}
            onChange={(e) => setSalaryMax(e.target.value)}
          />
        </Grid>
      </Grid>
      <Autocomplete
        options={employmentTypes}
        getOptionLabel={(option) => option.name}
        value={employmentType}
        onChange={(event, newValue) => setEmploymentType(newValue)}
        renderInput={(params) => <TextField {...params} label="Тип занятости" variant="outlined" margin="normal" />}
      />
      <Autocomplete
        options={workSchedules}
        getOptionLabel={(option) => option.name}
        value={workSchedule}
        onChange={(event, newValue) => setWorkSchedule(newValue)}
        renderInput={(params) => <TextField {...params} label="График работы" variant="outlined" margin="normal" />}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 1  }}
        onClick={handleFilterChange}
      >
        Применить фильтры
      </Button>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 1, backgroundColor:'gray' }}
        onClick={handleResetFilters}
      >
        Сбросить фильтры
      </Button>
    </Box>
  );
};
export default ResumesFilter;
 