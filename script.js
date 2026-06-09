// Переменные состояния теста
let currentTicket = null;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let timerInterval = null;
let timeLeft = 20 * 60; // 20 минут в секундах

// Инициализация при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
    // Проверяем, загрузились ли данные из data.js
    if (typeof allTickets === "undefined") {
        alert("Xatolik: 'data.js' fayli yuklanmadi yoki unda xatolik bor! Oxiridagi qavslarni tekshiring.");
        return;
    }
    generateTicketsGrid();
});

// 1. Генерация сетки билетов (от 1 до 60)
function generateTicketsGrid() {
    const grid = document.getElementById("tickets-grid");
    grid.innerHTML = ""; // Очищаем перед заполнением

    for (let i = 1; i <= 60; i++) {
        const btn = document.createElement("button");
        btn.className = "ticket-btn"; // Стили берутся из твоего style.css
        btn.innerText = `${i}-bilet`;
        
        // Вешаем событие клика на каждый билет
        btn.onclick = () => startQuiz(i);
        grid.appendChild(btn);
    }
}

// 2. Старт теста для выбранного билета
function startQuiz(ticketNumber) {
    // Проверяем, есть ли такой билет в базе данных
    if (!allTickets[ticketNumber] || allTickets[ticketNumber].length === 0) {
        alert(`${ticketNumber}-bilet ma'lumotlari topilmadi! (data.js faylini tekshiring)`);
        return;
    }

    currentTicket = allTickets[ticketNumber];
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    timeLeft = 20 * 60; // Сброс таймера на 20 минут

    // Переключение экранов
    document.getElementById("menu-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";

    // Запуск таймера и показ первого вопроса
    startTimer();
    showQuestion();
}

// 3. Отображение текущего вопроса
function showQuestion() {
    const question = currentTicket[currentQuestionIndex];

    // Обновляем информацию о номере билета и вопроса
    document.getElementById("ticket-info").innerText = `${question.ticket}-bilet, ${currentQuestionIndex + 1}-savol`;
    document.getElementById("question-text").innerText = question.question;

    // Безопасная обработка картинок (чтобы код не падал из-за no_image)
    const qImg = document.getElementById("question-img");
    if (question.image && question.image !== "no_image") {
        qImg.src = question.image; // Если картинки в папке, используй: "images/" + question.image
        qImg.style.display = "block";
    } else {
        qImg.src = "";
        qImg.style.display = "none";
    }

    // Отображение вариантов ответов
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // Очищаем старые варианты

    question.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = option;
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

// 4. Проверка выбранного ответа
function checkAnswer(selectedIndex) {
    const question = currentTicket[currentQuestionIndex];

    if (selectedIndex === question.answer) {
        correctAnswersCount++;
    } else {
        incorrectAnswersCount++;
    }

    // Переходим к следующему вопросу или завершаем тест
    currentQuestionIndex++;
    if (currentQuestionIndex < currentTicket.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

// 5. Работа таймера
function startTimer() {
    clearInterval(timerInterval); // На всякий случай очищаем старый таймер
    updateTimerDOM();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDOM();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Vaqt tugadi!");
            finishQuiz();
        }
    }, 1000);
}

// Об
