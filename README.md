
<img align="right" src="https://cloud.githubusercontent.com/assets/8696354/14777614/df01df58-0ad6-11e6-881d-813f742742b9.png" width="200">

# hexcraft

Hexcraft - это пёстрая смесь из тактик, стратегий, логики и фигурок, которая поможет вам и вашим друзьям весело провести время. Эта игра требует тщательного продумывания каждого хода, а также учит разрабатывать свои уникальные стратегии.

## Разработка

### Первый запуск
Для начала работы вам потребуется nodejs. Склонируйте репозиторий и потом установите все зависимости проекта

```
npm i
```

Все необходимое для запуска будет установлено и собрано. Теперь остается только запустить проект

```
npm start
```

При изменении исходного кода, все будет собрано автоматически. Для api будет пересобрана документация и запущены все тесты.

### Дополнительно

Для удобной работы вы можете установить bower, sequelize-cli и gulp глобально (если вы еще это не сделали)

```
npm i -g bower sequelize-cli gulp
```

### Тесты

Для ручного запуска тестов api игры

```
npm test
```
<<<<<<< Updated upstream
=======
```

### Тестовые данные

Для заполнения базы тестовыми данными используйте команду

```
sequelize db:seed:all
```

Будет создано несколько новостей и тестовый пользователь с логином\паролем test\test
>>>>>>> Stashed changes
