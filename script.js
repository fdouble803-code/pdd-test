// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand(); // Расширяем окно в телеграме
}

// Переменные состояния
let currentTicket = null;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let timerInterval = null;
let timeLeft = 20 * 60; // 20 минут

// Привязка элементов интерфейса
const menuContainer = document.getElementById('menu-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const timerElement = document.getElementById('timer');
const ticketInfoElement = document.getElementById('ticket-info');
const questionTextElement = document.getElementById('question-text');
const questionImgElement = document.getElementById('question-img');
const optionsContainer = document.getElementById('options-container');
const correctStatElement = document.getElementById('correct-stat');
const incorrectStatElement = document.getElementById('incorrect-stat');

// Функция старта квиза (Её вызывает кнопка из index.html)
window.startQuiz = function(ticketNumber) {
    // Проверяем, существует ли вообще переменная allTickets (из data.js)
    if (typeof allTickets === 'undefined') {
        alert("Xatolik: data.js fayli yuklanmagan yoki unda xatolik bor!");
        return;
    }

    // Проверяем наличие конкретного билета в базе
    if (!allTickets[ticketNumber] || allTickets[ticketNumber].length === 0) {
        alert(`${ticketNumber}-bilet ma'lumotlari topilmadi (data.js faylini tekshiring).`);
        return;
    }

    currentTicket = ticketNumber;
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    timeLeft = 20 * 60;

    // Переключаем экраны
    if (menuContainer) menuContainer.style.display = 'none';
    if (quizContainer) quizContainer.style.display = 'block';
    if (resultContainer) resultContainer.style.display = 'none';

    startTimer();
    showQuestion();
};

// Отображение вопроса
function showQuestion() {
    const questions = allTickets[currentTicket];
    
    if (currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (ticketInfoElement) {
        ticketInfoElement.innerText = `${currentTicket}-bilet, ${currentQuestionIndex + 1}-savol`;
    }
    if (questionTextElement) {
        questionTextElement.innerText = currentQuestion.question;
    }

    // Обработка картинок ("no_image" или пустая строка)
    if (questionImgElement) {
        if (currentQuestion.image === 'no_image' || !currentQuestion.image) {
            questionImgElement.style.display = 'none';
            questionImgElement.src = '';
        } else {
            // Путь к картинкам. Убедись, что папка называется именно "images" (маленькими буквами)
            questionImgElement.src = `images/${currentQuestion.image}`;
            questionImgElement.style.display = 'block';
        }
    }

    // Рендеринг вариантов ответов
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option-btn';
            optionButton.innerText = option;
            optionButton.onclick = () => checkAnswer(index, currentQuestion.answer);
            optionsContainer.appendChild(optionButton);
        });
    }
}

// Проверка ответа
function checkAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        correctAnswersCount++;
    } else {
        incorrectAnswersCount++;
    }

    currentQuestionIndex++;
    showQuestion();
}

// Таймер
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        if (timerElement) {
            timerElement.innerText = `Vaqt: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

// Завершение теста
function finishQuiz() {
    clearInterval(timerInterval);

    if (quizContainer) quizContainer.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'block';

    if (correctStatElement) correctStatElement.innerText = `To'g'ri javoblar: ${correctAnswersCount}`;
    if (incorrectStatElement) incorrectStatElement.innerText = `Noto'g'ri javoblar: ${incorrectAnswersCount}`;
}
