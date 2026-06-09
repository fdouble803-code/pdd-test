// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Расширяем окно на весь экран

// Переменные для управления состоянием теста
let currentTicket = null;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let timerInterval = null;
let timeLeft = 20 * 60; // 20 минут в секундах

// Элементы интерфейса из index.html
const menuContainer = document.getElementById('menu-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const ticketsGrid = document.getElementById('tickets-grid');
const timerElement = document.getElementById('timer');
const ticketInfoElement = document.getElementById('ticket-info');
const questionTextElement = document.getElementById('question-text');
const questionImgElement = document.getElementById('question-img');
const optionsContainer = document.getElementById('options-container');
const correctStatElement = document.getElementById('correct-stat');
const incorrectStatElement = document.getElementById('incorrect-stat');

// 1. ГЕНЕРАЦИЯ СПИСКА ИЗ 60 БИЛЕТОВ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
function generateTicketsMenu() {
    ticketsGrid.innerHTML = ''; // Очищаем сетку
    
    // Цикл ровно на 60 билетов
    for (let i = 1; i <= 60; i++) {
        const button = document.createElement('button');
        button.className = 'ticket-btn';
        button.innerText = `${i}-bilet`;
        
        // Навешиваем событие клика на каждый билет
        button.onclick = () => startQuiz(i);
        ticketsGrid.appendChild(button);
    }
}

// 2. НАЧАЛО ТЕСТИРОВАНИЯ
function startQuiz(ticketNumber) {
    // Проверяем, есть ли данные для выбранного билета в data.js
    if (!allTickets || !allTickets[ticketNumber]) {
        alert("Bu bilet ma'lumotlari hali yuklanmagan (data.js faylini tekshiring).");
        return;
    }

    currentTicket = ticketNumber;
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    timeLeft = 20 * 60; // Сброс таймера на 20 минут

    // Переключение экранов
    menuContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    // Запуск таймера и отображение первого вопроса
    startTimer();
    showQuestion();
}

// 3. ОТОБРАЖЕНИЕ ТЕКУЩЕГО ВОПРОСА
function showQuestion() {
    const questions = allTickets[currentTicket];
    
    // Если вопросы в билете закончились — завершаем тест
    if (currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Выводим информацию о номере билета и вопроса
    ticketInfoElement.innerText = `${currentTicket}-bilet, ${currentQuestionIndex + 1}-savol`;
    questionTextElement.innerText = currentQuestion.question;

    // Проверка картинки: если "no_image" — скрываем тег, если есть — показываем
    if (currentQuestion.image === 'no_image' || !currentQuestion.image) {
        questionImgElement.style.display = 'none';
        questionImgElement.src = '';
    } else {
        questionImgElement.src = `images/${currentQuestion.image}`; // Путь к папке с картинками
        questionImgElement.style.display = 'block';
    }

    // Рендеринг вариантов ответов
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option-btn';
        optionButton.innerText = option;
        
        // Обработка выбора ответа
        optionButton.onclick = () => checkAnswer(index, currentQuestion.answer);
        optionsContainer.appendChild(optionButton);
    });
}

// 4. ПРОВЕРКА ВЫБРАННОГО ОТВЕТА
function checkAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        correctAnswersCount++;
    } else {
        incorrectAnswersCount++;
    }

    // Переходим к следующему вопросу
    currentQuestionIndex++;
    showQuestion();
}

// 5. РАБОТА ТАЙМЕРА
function startTimer() {
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        // Форматирование времени (например, 19:05)
        timerElement.innerText = `Vaqt: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Если время вышло — принудительно завершаем тест
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

// 6. ЗАВЕРШЕНИЕ ТЕСТА И ВЫВОД РЕЗУЛЬТАТОВ
function finishQuiz() {
    clearInterval(timerInterval);

    // Переключение экранов
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // Вывод статистики
    correctStatElement.innerText = `To'g'ri javoblar: ${correctAnswersCount}`;
    incorrectStatElement.innerText = `Noto'g'ri javoblar: ${incorrectAnswersCount}`;
}

// Запускаем генерацию меню при первой загрузке скрипта
generateTicketsMenu();
