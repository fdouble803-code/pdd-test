// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand();
}

// Глобальные переменные игры
let currentTicket = null;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let timerInterval = null;
let timeLeft = 20 * 60;

// Связывание элементов DOM
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

// Функция вызова билета (назначается кнопкам из HTML)
window.selectTicket = function(ticketNumber) {
    // 1. Проверяем, существует ли переменная allTickets вообще
    if (typeof allTickets === 'undefined') {
        alert("Xatolik: 'data.js' fayli yuklanmadi yoki unda xatolik bor. Iltimos, fayldagi qavslarni tekshiring!");
        return;
    }

    // 2. Проверяем, есть ли такой билет в объекте базы данных
    if (!allTickets[ticketNumber] || allTickets[ticketNumber].length === 0) {
        alert(`${ticketNumber}-bilet ma'lumotlari topilmadi yoki hali yuklanmagan.`);
        return;
    }

    // Инициализация данных билета
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

// Функция отрисовки вопроса
function showQuestion() {
    try {
        const questions = allTickets[currentTicket];
        
        if (currentQuestionIndex >= questions.length) {
            finishQuiz();
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];

        if (ticketInfoElement) ticketInfoElement.innerText = `${currentTicket}-bilet, ${currentQuestionIndex + 1}-savol`;
        if (questionTextElement) questionTextElement.innerText = currentQuestion.question;

        // Обработка картинок вопросов
        if (questionImgElement) {
            if (!currentQuestion.image || currentQuestion.image === 'no_image' || currentQuestion.image.includes('no image')) {
                questionImgElement.style.display = 'none';
                questionImgElement.src = '';
            } else {
                questionImgElement.src = `images/${currentQuestion.image}`;
                questionImgElement.style.display = 'block';
            }
        }

        // Вывод вариантов ответов
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
    } catch (e) {
        console.error("Savolni ko'rsatishda xatolik:", e);
    }
}

// Проверка нажатого ответа
function checkAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        correctAnswersCount++;
    } else {
        incorrectAnswersCount++;
    }

    currentQuestionIndex++;
    showQuestion();
}

// Запуск таймера обратного отсчета
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

// Финиш теста
function finishQuiz() {
    clearInterval(timerInterval);

    if (quizContainer) quizContainer.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'block';

    if (correctStatElement) correctStatElement.innerText = `To'g'ri javoblar: ${correctAnswersCount}`;
    if (incorrectStatElement) incorrectStatElement.innerText = `Noto'g'ri javoblar: ${incorrectAnswersCount}`;
}
