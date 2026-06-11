// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand(); // Расширяем окно в телеграме
}

// Переменные состояния теста
let currentTicketQuestions = []; // Массив вопросов выбранного билета
let currentQuestionIndex = 0;   // Индекс текущего вопроса
let correctAnswersCount = 0;    // Счетчик верных ответов
let incorrectAnswersCount = 0;  // Счетчик ошибок
let timerInterval = null;
let timeLeft = 20 * 60; // 20 минут в секундах

// Элементы интерфейса
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

// 1. ГЕНЕРАЦИЯ МЕНЮ (СПИСОК БИЛЕТОВ ОТ 1 ДО 60)
function generateTicketsMenu() {
    ticketsGrid.innerHTML = ''; // Очистка сетки
    
    // Генерируем 60 кнопок билетов
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
        alert("Bilet topilmadi (data.js faylini tekshiring).");
        return;
    }

    currentTicketQuestions = allTickets[ticketNumber];
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    timeLeft = 20 * 60; // Сброс таймера на 20 минут

    // Переключение экранов
    menuContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    startTimer();
    showQuestion();
}

// 3. ОТОБРАЖЕНИЕ ВОПРОСА
function showQuestion() {
    // Если вопросы в билете закончились — завершаем тест
    if (currentQuestionIndex >= currentTicketQuestions.length) {
        finishQuiz();
        return;
    }

    const currentQuestion = currentTicketQuestions[currentQuestionIndex];

    // Выводим информацию о билете и вопросе
    ticketInfoElement.innerText = `${currentQuestion.ticket}-bilet, ${currentQuestionIndex + 1}-savol`;
    questionTextElement.innerText = currentQuestion.question;

    // Проверка картинки: если "no_image" — скрываем, если есть — показываем
    if (currentQuestion.image === 'no_image' || !currentQuestion.image) {
        questionImgElement.style.display = 'none';
        questionImgElement.src = '';
    } else {
        // Убедись, что папка называется "images"
        questionImgElement.src = `images/${currentQuestion.image}`;
        questionImgElement.style.display = 'block';
    }

    // Рендеринг вариантов ответов
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option-btn';
        optionButton.innerText = option;
        
        // Обработка выбора ответа
        optionButton.onclick = () => checkAnswer(optionButton, index, currentQuestion.answer);
        optionsContainer.appendChild(optionButton);
    });
}

// 4. ПРОВЕРКА ОТВЕТА С ЛОГИКОЙ ПОДСВЕТКИ (КРАСНЫЙ / ЗЕЛЕНЫЙ)
function checkAnswer(clickedButton, selectedIndex, correctIndex) {
    const allOptionButtons = optionsContainer.querySelectorAll('.option-btn');
    
    // Блокируем все кнопки, чтобы нельзя было нажать дважды или выбрать другой ответ
    allOptionButtons.forEach(btn => btn.classList.add('disabled'));

    if (selectedIndex === correctIndex) {
        // Если ответ верный — красим нажатую кнопку в ЗЕЛЕНЫЙ
        clickedButton.classList.add('correct');
        correctAnswersCount++;
    } else {
        // Если ответ неверный — красим нажатую кнопку в КРАСНЫЙ
        clickedButton.classList.add('incorrect');
        incorrectAnswersCount++;
        
        // !!! И НАХОДИМ ПРАВИЛЬНЫЙ ОТВЕТ И КРАСИМ ЕГО В ЗЕЛЕНЫЙ
        allOptionButtons[correctIndex].classList.add('correct');
    }

    // Делаем паузу 1.5 секунды, чтобы пользователь увидел результат
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion(); // Показываем следующий вопрос
    }, 1500); // 1500 миллисекунд
}

// 5. РАБОТА ТАЙМЕРА
function startTimer() {
    clearInterval(timerInterval);
    updateTimerDOM(); // Показываем время сразу

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDOM();

        // Если время вышло — завершаем тест
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

// Обновление таймера на экране
function updateTimerDOM() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // Форматирование (добавляем '0' перед числами < 10)
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    timerElement.innerText = `Vaqt: ${formattedMinutes}:${formattedSeconds}`;
}

// 6. ЗАВЕРШЕНИЕ ТЕСТА И ВЫВОД РЕЗУЛЬТАТОВ
function finishQuiz() {
    clearInterval(timerInterval); // Остановка таймера

    // Переключение экранов
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // Вывод статистики
    correctStatElement.innerText = `To'g'ri javoblar: ${correctAnswersCount}`;
    incorrectStatElement.innerText = `Noto'g'ri javoblar: ${incorrectAnswersCount}`;
}

// Запускаем генерацию меню при первой загрузке скрипта
generateTicketsMenu();
