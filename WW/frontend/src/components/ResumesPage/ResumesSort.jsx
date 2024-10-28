import React from 'react';
import { Select, MenuItem } from '@mui/material';

const ResumesSort = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <Select
      value=""
      onChange={handleSortChange}
      displayEmpty
      size="small"
      sx={{ minWidth: 120, mt: 1, height: 40, borderRadius: 1 }}
    >
      <MenuItem value="" disabled>
        Сортировка
      </MenuItem>
      <MenuItem value="date">Дата</MenuItem>
      <MenuItem value="salary">Зарплата</MenuItem>
    </Select>
  );
};

export default ResumesSort;


// import React from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const ResumesSort = ({ onSortChange }) => {
//   const handleSortChange = (e) => {
//     onSortChange(e.target.value);
//   };

//   return (
//     <FormControl
//       size="small" // Устанавливаем меньший размер для компактности
//       variant="outlined"
//       sx={{ width: '200px', mt: 1 }} // Задаем фиксированную ширину
//     >
//       <InputLabel>Сортировка</InputLabel>
//       <Select
//         label="Сортировка"
//         onChange={handleSortChange}
//       >
//         <MenuItem value="date">Дата публикации</MenuItem>
//         <MenuItem value="salary">Зароботная плата</MenuItem>
//       </Select>
//     </FormControl>
//   );
// };

// export default ResumesSort;


// import React from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const ResumesSort = ({ onSortChange }) => {
//   const handleSortChange = (e) => {
//     onSortChange(e.target.value);
//   };

//   return (
//     <FormControl fullWidth>
//       <InputLabel>Sort by</InputLabel>
//       <Select
//         label="Сортировка"
//         onChange={handleSortChange}
//         sx={{ mt: 1 }}
//       >
//         <MenuItem value="date">Дата публикации</MenuItem>
//         <MenuItem value="salary">Зароботная плата</MenuItem>
//       </Select>
//     </FormControl>
//   );
// };

// export default ResumesSort;
 