import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function JobSearch({ onSearch }) {
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
        placeholder="Search jobs..."
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        type="submit"
      >
        Search
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mt: 2, ml: 1 }} // Добавляем отступ слева для кнопки сброса
        onClick={handleReset}
      >
        Reset
      </Button>
    </form>
  );
}

export default JobSearch;


// import React, { useState } from 'react';
// import { Button, TextField, Select, MenuItem } from '@mui/material';

// function JobSearch({ onSearch }) {
//   const [query, setQuery] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         type="text"
//         fullWidth
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search jobs..."
//       />
//       <Button  variant="contained"
//         color="primary"
        
//         sx={{ mt: 2 }} 
//         type="submit" >
//           Search
//         </Button>
//     </form>
//   );
// }

// export default JobSearch;
