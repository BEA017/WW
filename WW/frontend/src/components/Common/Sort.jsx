import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Sort = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
      sx={{ mt: 1 }}>Сортировка</InputLabel>
      <Select
        label="Сортировка"
        onChange={handleSortChange}
        sx={{ mt: 2 }}
      >
        <MenuItem value="date">Дата публикации</MenuItem>
        <MenuItem value="salary">Зароботная плата</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
 