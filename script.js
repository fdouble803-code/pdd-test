// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand();
}

// Переменные состояния
let currentTicket = null;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let timerInterval = null;
let timeLeft = 20 * 60;

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

// Глобальная функция выбора билета
window.selectTicket = function(ticketNumber) {
    // Проверка базы данных
    if (typeof allTickets === 'undefined') {
        alert("Xatolik: 'data.js' fayli yuklanmadi yoki unda xatolik bor! Oxiridagi qavslarni tekshiring.");
        return;
    }

    // Проверка конкретного билета
    if (!allTickets[ticketNumber] || allTickets[ticketNumber].length === 0) {
        alert(`${ticketNumber}-bilet ma'lumotlari topilmadi yoki hali kiritilmagan.`);
        return;
    }

    currentTicket = ticketNumber;
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    timeLeft = 20 * 60;

    // Переключение экранов
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

    if (ticketInfoElement) ticketInfoElement.innerText = `${currentTicket}-bilet, ${currentQuestionIndex + 1}-savol`;
    if (questionTextElement) questionTextElement.innerText = currentQuestion.question;

    // Картинки
    if (questionImgElement) {
        if (!currentQuestion.image || currentQuestion.image === 'no_image' || currentQuestion.image.includes('no image')) {
            questionImgElement.style.display = 'none';
            questionImgElement.src = '';
        } else {
            questionImgElement.src = `images/${currentQuestion.image}`;
            questionImgElement.style.display = 'block';
        }
    }

    // Варианты ответов
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

// Завершение
function finishQuiz() {
    clearInterval(timerInterval);

    if (quizContainer) quizContainer.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'block';

    if (correctStatElement) correctStatElement.innerText = `To'g'ri javoblar: ${correctAnswersCount}`;
    if (incorrectStatElement) incorrectStatElement.innerText = `Noto'g'ri javoblar: ${incorrectAnswersCount}`;
}
