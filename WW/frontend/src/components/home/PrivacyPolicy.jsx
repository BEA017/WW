import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Политика конфиденциальности
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        1. Введение
      </Typography>
      <Typography variant="body1" paragraph>
        Настоящая Политика конфиденциальности описывает, какие данные мы собираем, как мы их используем и защищаем. Регистрируясь на сайте, вы соглашаетесь на сбор и обработку ваших данных в соответствии с этой политикой.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2. Какие данные мы собираем
      </Typography>
      <Typography variant="body1" paragraph>
        Мы можем собирать следующую информацию: имя, адрес электронной почты, номер телефона, дату рождения, и другие данные, предоставленные вами при регистрации или использовании сайта.
      </Typography>

      <Typography variant="h6" gutterBottom>
        3. Как мы используем ваши данные
      </Typography>
      <Typography variant="body1"  ></Typography>
        Данные используются для:
        <ul>
          <li>Предоставления и улучшения наших услуг.</li>
          <li>Связи с вами в случае необходимости.</li>
          <li>Персонализации вашего опыта на сайте.</li>
          <li>Соблюдения правовых требований.</li>
        </ul>
      

      <Typography variant="h6" gutterBottom>
        4. Передача данных третьим лицам
      </Typography>
      <Typography variant="body1" paragraph>
        Мы не передаем ваши личные данные третьим лицам, за исключением случаев, предусмотренных законом, или с вашего согласия.
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Безопасность данных
      </Typography>
      <Typography variant="body1" paragraph>
        Мы принимаем меры для защиты ваших данных от несанкционированного доступа или изменения. Однако, полную безопасность данных в сети Интернет гарантировать невозможно.
      </Typography>

      <Typography variant="h6" gutterBottom>
        6. Ваши права
      </Typography>
      <Typography variant="body1" paragraph>
        Вы имеете право на доступ, изменение или удаление своих данных. Для этого свяжитесь с нами по адресу support@company.com.
      </Typography>

      <Typography variant="h6" gutterBottom>
        7. Изменения в Политике конфиденциальности
      </Typography>
      <Typography variant="body1" paragraph>
        Мы оставляем за собой право изменять эту Политику в любое время. Новая версия вступает в силу с момента ее публикации на сайте.
      </Typography>

      <Typography variant="h6" gutterBottom>
        8. Контакты
      </Typography>
      <Typography variant="body1" paragraph>
        Если у вас есть вопросы или жалобы, пожалуйста, свяжитесь с нами по адресу support@company.com.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
          Последнее обновление: 8 октября 2024 года
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
