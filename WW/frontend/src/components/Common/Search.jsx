import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function Search({ onSearch }) {
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
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <TextField
        type="text"
        fullWidth
        value={query}
        sx={{ mt: 2 }}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по заголовку и содержанию..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={handleReset}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default Search;


// import React, { useState } from 'react';
// import { Button, TextField } from '@mui/material';

// function Search({ onSearch }) {
//   const [query, setQuery] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   const handleReset = () => {
//     setQuery('');  // Очистка поля ввода
//     onSearch('');  // Сброс результатов поиска
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         type="text"
//         fullWidth
//         value={query}
//         sx={{ mt: 2 }}

//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Поиск по заголовку и содержанию..."
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ mt: 1 ,backgroundColor:'orange'}}
//         type="submit"
//       >
//         Поиск
//       </Button>
//       <Button
//         variant="outlined"
//         color="secondary"
//         sx={{ mt: 1, ml: 1  }} // Добавляем отступ слева для кнопки сброса
         
//         onClick={handleReset}
//       >
//         Сбросить
//       </Button>
//     </form>
//   );
// }

// export default Search;
 