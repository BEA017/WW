import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortDashboard = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
      sx={{ mt: 1 }}>Объявления</InputLabel>
      <Select
        label="Сортировка"
        onChange={handleSortChange}
        sx={{ mt: 2 }}
      >
        <MenuItem value="1">Активные</MenuItem>
        <MenuItem value="2">Черновик</MenuItem>
        <MenuItem value="3">Архив</MenuItem>
        <MenuItem value="4">На проверке</MenuItem>
        <MenuItem value="5">Отклонено</MenuItem>
        <MenuItem value="5">Заблокировано</MenuItem>
        <MenuItem value="5">Удалено</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDashboard;