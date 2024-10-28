// src/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Создание экземпляра API с базовым URL
const api = axios.create({
 baseURL: 'http://workingwaves.ru/api' ,
  //baseURL: 'http://localhost:8000/api' ,

 headers: {
  'Authorization': `Bearer ${Cookies.get('token')}`,
}
});

const token =  Cookies.get('token');


export const CSRF = async()=> {
   await axios.get('/sanctum/csrf-cookie').then(response => {     
});}


// Login API
export const loginUser = ({ email, password }) => {
  return api.post('/login', {email, password });
 };
 

 // Logout API
 export const Logout = async () => {
   const token =  Cookies.get('token');
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }
  return api.get('/logout',  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
 
// Register API
export const registerUser = ({ email, password, role }) => {
  try{
    return api.post('/register', {
      email,
      password,
      role
    });
  }catch(error){
    //console.log(error);
  }
};

export const employer_count = ( ) => {
  return api.get('get_employer_count' );
};
export const seeker_count = ( ) => {
  return api.get('get_seeker_count' );
};
export const active_job_count = ( ) => {
  return api.get('get_active_job_count' );
};
export const active_resume_count = ( ) => {
  return api.get('get_active_resume_count' );
};
export const job_to_check_count = ( ) => {
  return api.get('get_job_to_check_count' );
};
export const resume_to_check_count = ( ) => {
  return api.get('get_resume_to_check_count' );
};
 
// Jobs API для получения общего списка доступного не авторизованым пользователям
export const fetchJobs = ({ filters, sort, page , search }) => {
  return api.get('/jobs', { params: { ...filters, sort, page ,  query: search} });
};
 
// Resumes API для получения общего списка доступного не авторизованым пользователям
export const fetchResumes = ({ filters, sort, page, search }) => {
    return api.get('/resumes', { params: { ...filters, sort, page,  query: search } });
};

 //список вакансий ползователя
export const fetchPersonalResumes = async (params) => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error("Token is missing");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') // Если CSRF токен нужен
    },
    params: {
      page: params.page,
      search: params.search,
      ad_status: params.ad_status
    }
  };

  try {
    const response = await api.get('/personal_resumes', config);
    return response.data;
  } catch (error) {
    // console.error('Error fetching resumes:', error);
    throw error;
  }
};

// Функция для создания резюме
export const createResume = async (formData) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.post('/create_resume', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
// Функция для обновления резюме
export const updateResume = async (id, formData) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'  // Для отправки файлов
    }
  };

  try {
     const response = await api.post(`/resumes/${id}/update`, formData, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error updating resume:', error);
    throw error;
  }
};
 
// Функция для Удаления резюме
export const deleteResume = async (id) => {
 
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      }
  };

  try {
      const response = await api.delete(`/resumes/${id}`, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error del resume:', error);
    throw error;
  }
};
//запрос списка вакансий конкретного авторизованного пользователя
 
export const fetchPersonalJobs = async (params) => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error("Token is missing");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') // Если CSRF токен нужен
    },
    params: {
      page: params.page,
      search: params.search,
      ad_status: params.ad_status
    }
  };
  //console.log(config);
  try {
    const response = await api.get('/personal_jobs', config);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobAPI :', error);
    throw error;
  }
};
// Функция для создания вакансии
export const createJob = async (formData) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.post('/create_job', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Функция для обновления вакансии
export const updateJob = async (id, formData) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'  // Для отправки файлов
    }
  };

  try {
     const response = await api.post(`/job/${id}/update`, formData, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error updating job:', error);
    throw error;
  }
};
 
// Функция для Удаления резюме
export const deleteJob = async (id) => {
 
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      }
  };

  try {
      const response = await api.delete(`/jobs/${id}`, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error del job:', error);
    throw error;
  }
};

//открытый запрос данных о компании 
export const fetchCompany = async(id) =>{
  const response = await api.get(`/companies/${id}`);
  return response.data;
}
//обновление данных компании 
export const updateCompany = async(id, formData ) =>{
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'  // Для отправки файлов
    }
  };

  try {
     const response = await api.post(`/companies/${id}/update`, formData, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error updating job:', error);
    throw error;
  }
};
 

//API Модератора 
 //список вакансий ползователя
 
 
// Функция для одобрения заявки на работу
export const approveJob = async (jobId) => {
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.post(`/moderator/jobs/${jobId}/approve`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const reworkJob = async (jobId) => {
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.post(`/moderator/jobs/${jobId}/rework`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Функция для удаления заявки на работу
export const moderDeleteJob = async (jobId) => {
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.delete(`/moderator/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Функция для одобрения резюме
export const approveResume = async (resumeId) => {
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.post(`/moderator/resumes/${resumeId}/approve`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Функция для одобрения резюме
export const reworkResume = async (resumeId) => {
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.post(`/moderator/resumes/${resumeId}/rework`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Функция для удаления резюме
export const moderDeleteResume = async (resumeId) => {
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.delete(`/moderator/resumes/${resumeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Получение непроверенных вакансий

export const fetchUnverifiedJobs = async (params) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
     try{
      return api.get('/moderator/unverified-jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
          params: {
            page: params.page,
            query: params.search,
          }
        },
      });
    }
    catch{
      throw new Error('No token found, user is not logged in');
    }
  
};
 
;// Получение непроверенных вакансий
export const fetchUnverifiedResumes = (params) => {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error("Token is missing");
      }       
       
      return api.get('/moderator/unverified-resumes', {
        headers: {
          Authorization: `Bearer ${token}`,
           params: {
            page: params.page,
            query: params.search,
          }
        },
      });
};

// Получение активных вакансий
export const fetchActiveJobs = (params) => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.get('/moderator/active-jobs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: params.page,
      query: params.search,
    }
  });
};
// Получение активных вакансий
export const fetchActiveResumes = (params) => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.get('/moderator/active-resumes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: params.page,
      query: params.search,
    }
  });
};
// Получение компаний   

export const fetchCompanies = async(params) => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.get('/moderator/companies', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: params.page,
      query: params.search,
    }
  });
};

// Детали компании
export const fetchCompanyDetails = async (companyId) => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.get(`/moderator/company/${companyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Обновление компании
export const updateCompanyM = async(companyId, formData) => {

  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'  // Для отправки файлов
    }
  };

  try {
     const response = await api.post(`/moderator/company/${companyId}`, formData, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error updating job:', error);
    throw error;
  }
};
 
// Удаление компании
 export const deleteCompany = async(companyId) => { 
  const token = Cookies.get('token');

   if (!token) {
    throw new Error('No token found, user is not logged in');
  }

  return api.delete('/moderator/company/${companyId})', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const fetchUsers = async (params) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }
  try {
    const response = await api.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: params.page,
        query: params.search,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchJobsA = async (params) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }
  try {
    const response = await api.get('/admin/jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: params.page,
        query: params.search,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchResumesA = async (params) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }
  try {
    const response = await api.get('/admin/resumes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: params.page,
        query: params.search,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching resumes:', error);
    throw error;
  }
};

export const fetchCategoriesA = async (params) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }
  try {
    const response = await api.get('/admin/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: params.page,
        query: params.search,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchLocationsA = async (params) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }
  try {
    const response = await api.get('/admin/locations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: params.page,
        query: params.search,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};
 
export const makeModerator = async (userId) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      }
  };
  try {
    const response = await api.get(`/admin/users/${userId}/to_moder`, config);  
    return response.data;
  } catch (error) {
     console.error('Ответ:Error:', error);
    throw error;
  }}

export const fetchUserDetails = async (userId) => {
 
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      }
  };
  try {
    const response = await api.get(`/admin/users/${userId}`, config);  
    return response.data;
  } catch (error) {
     console.error('Ответ:Error:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => { 
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      }
  };
  try {
    const response = await api.delete(`/admin/users/${userId}`, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error del job:', error);
    throw error;
  }
};
export const updateUser = async (userId, formData) => { 
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'  // Для отправки файлов
    }
  };

  try {
     const response = await api.post(`/user/${userId}/update`, formData, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error updating resume:', error);
    throw error;
  }
};


 

export const fetchStatistics = async () => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found, user is not logged in');
  }
  try {
    const response = await api.get('/admin/stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};
// Добавление новой категории
export const addCategory = async (categoryData) => {
  try {
    const token = Cookies.get('token');
    const response = await api.post('/admin/categories', categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении категории:', error);
    throw error;
  }
};

// Добавление новой локации
export const addLocation = async (locationData) => {
  try {
    const token = Cookies.get('token');
    const response = await api.post('/admin/locations', locationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении локации:', error);
    throw error;
  }
};

export const deleteLocation = async (id) => {
 
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      }
  };
  try {
      const response = await api.delete(`/admin/locations/${id}`, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error del job:', error);
    throw error;
  }
};
export const deleteCategory = async (id) => {
 
  const token = Cookies.get('token');
  if (!token) {
    throw new Error("Token is missing");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      }
  };
  try {
      const response = await api.delete(`/admin/categories/${id}`, config); // Исправили URL и передаем данные правильно
    return response.data;
  } catch (error) {
    // console.error('Ответ:Error del job:', error);
    throw error;
  }
};

// Fetch categories для получения общего списка доступного не авторизованым пользователям
export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// Fetch locations для получения общего списка доступного не авторизованым пользователям
export const fetchLocations = async () => {
  const response = await api.get('/locations');
  return response.data;
};

// Fetch employment types для получения общего списка доступного не авторизованым пользователям
export const fetchEmploymentTypes = async () => {
  const response = await api.get('/employment_type');
  return response.data;
};

// Fetch work schedules для получения общего списка доступного не авторизованым пользователям
export const fetchWorkSchedules = async () => {
  const response = await api.get('/work_schedule');
  return response.data;
};

// Получение деталей вакансии метод не требует авторизации
export const fetchJobDetails = (id) => {
  return api.get(`/jobs/${id}`);
};
 


// Получение связанных вакансий метод не требует авторизации
export const fetchRelatedJobs = (jobId) => {
  return api.get(`/jobs/${jobId}/related`);
};

// Получение деталей резюме метод не требует авторизации
export const fetchResumeDetails = (id) => {
  return api.get(`/resumes/${id}`);
};

// Отправка сообщения соискателю метод  требует авторизации
export const sendContactMessage = (resumeId, formData) => {
  return api.post(`/resumes/${resumeId}/contact`, formData);
};

// Получение похожих резюме метод не требует авторизации
export const fetchSimilarResumes = (resumeId) => {
  return api.get(`/resumes/${resumeId}/similar`);
};
export const applyForJob = (jobId, formData) => {
  return api.post(`/jobs/${jobId}/apply`, formData);
};
