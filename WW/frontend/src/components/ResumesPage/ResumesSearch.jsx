import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function ResumesSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleReset = () => {
    setQuery('');  // Очистка поля ввода
    onSearch('');  // Сброс результатов поиска
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по заголовку и содержанию..."
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        type="submit"
      >
        Поиск резюме
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mt: 2, ml: 1 }} // Добавляем отступ слева для кнопки сброса
        onClick={handleReset}
      >
        Сбросить поиск
      </Button>
    </form>
  );
}

export default ResumesSearch;

 
