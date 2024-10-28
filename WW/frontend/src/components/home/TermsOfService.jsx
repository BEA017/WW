import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Правила пользования сайтом
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        1. Введение
      </Typography>
      <Typography variant="body1" paragraph>
        Данный документ описывает условия использования нашего веб-сайта и услуги. Регистрируясь или используя сайт, вы соглашаетесь с этими условиями.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2. Регистрация и учетная запись
      </Typography>
      <Typography variant="body1" paragraph>
        При создании учетной записи вы обязуетесь предоставить точную и актуальную информацию о себе или вашей компании. Вы несете ответственность за сохранение конфиденциальности своей учетной записи и пароля.
      </Typography>

      <Typography variant="h6" gutterBottom>
        3. Права и обязанности пользователя
      </Typography>
      <Typography variant="body1" paragraph>
        Пользователи обязуются не размещать ложную или незаконную информацию, соблюдать правила деловой этики и уважать права других пользователей. Нарушение данных условий может привести к блокировке аккаунта.
      </Typography>

      <Typography variant="h6" gutterBottom>
        4. Размещение контента
      </Typography>
      <Typography variant="body1" paragraph>
        Пользователи могут размещать вакансии или резюме в соответствии с тематикой сайта. Администрация оставляет за собой право удалять контент, который нарушает правила или содержит оскорбительные материалы.
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Ответственность сторон
      </Typography>
      <Typography variant="body1" paragraph>
        Администрация сайта не несет ответственности за достоверность информации, размещенной пользователями. Пользователи самостоятельно несут ответственность за последствия, возникающие в результате использования сайта.
      </Typography>

      <Typography variant="h6" gutterBottom>
        6. Изменения в условиях
      </Typography>
      <Typography variant="body1" paragraph>
        Мы оставляем за собой право вносить изменения в данные правила в любое время. Изменения вступают в силу с момента их публикации на сайте.
      </Typography>

      <Typography variant="h6" gutterBottom>
        7. Контакты
      </Typography>
      <Typography variant="body1" paragraph>
        Если у вас есть вопросы или жалобы, свяжитесь с нашей службой поддержки по адресу support@company.com.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
          Последнее обновление: 8 октября 2024 года
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService;
