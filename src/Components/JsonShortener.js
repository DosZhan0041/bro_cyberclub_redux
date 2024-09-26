// import React, { useEffect } from 'react';

// const JsonShortener = () => {
//   useEffect(() => {
//     // Загрузка JSON данных
//     fetch('http://localhost:8080/users') // Замените на правильный URL
//       .then((response) => response.json())
//       .then((data) => {
//         // Укорачиваем JSON
//         const shortenedData = data.map(user => ({
//           id: user.id,
//           name: user.name,
//           surname: user.surname,
//           phone: user.phone,
//           photo: user.photo ? user.photo.substring(0, 100) : null // Укорачивание поля photo до 50 символов
//           // НЕ включаем поле password
//         }));

//         // Проходим по каждому пользователю и обновляем его данные через отдельный запрос PATCH
//         shortenedData.forEach(user => {
//           fetch(`http://localhost:8080/users/${user.id}`, {
//             method: 'PATCH', // Используем PATCH для частичного обновления
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(user),
//           })
//           .then(response => {
//             if (!response.ok) {
//               throw new Error('Ошибка при обновлении пользователя с id: ' + user.id);
//             }
//             return response.json();
//           })
//           .then(updatedUser => {
//             console.log('Пользователь обновлен:', updatedUser);
//           })
//           .catch(error => console.error('Ошибка:', error));
//         });
//       })
//       .catch((error) => console.error('Ошибка при загрузке данных:', error));
//   }, [localStorage]);

//   return <div></div>;
// };

// export default JsonShortener;
