let currentTicket = null;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let timerInterval = null;
let timeLeft = 20 * 60; // 20 минут

window.addEventListener("DOMContentLoaded", () => {
    if (typeof allTickets === "undefined") {
        alert("script.js ne zagruzilsya ili soderjit oshibki!");
        return;
    }
    generateTicketsGrid();
});

// 1. Генерация сетки билетов (от 1 до 60)
function generateTicketsGrid() {
    const grid = document.getElementById("tickets-grid");
    if (!grid) return;
    grid.innerHTML = ""; 

    for (let i = 1; i <= 60; i++) {
        const btn = document.createElement("button");
        // Присваиваем класс btn, так как он у тебя используется для стилей
        btn.className = "btn"; 
        btn.style.margin = "5px"; // Небольшой отступ между кнопками
        btn.innerText = `${i}-bilet`;
        
        btn.onclick = () => startQuiz(i);
        grid.appendChild(btn);
    }
}

// 2. Старт теста
function startQuiz(ticketNumber) {
    // Превращаем число в строку, так как в твоем data.js ключи "1", "2" — это строки
    const ticketKey = String(ticketNumber);

    if (!allTickets[ticketKey]) {
        alert(`${ticketNumber}-bilet ma'lumotlari topilmadi!`);
        return;
    }

    currentTicket = allTickets[ticketKey];
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    timeLeft = 20 * 60; 

    // Показываем/скрываем контейнеры строго по твоим ID в HTML
    document.getElementById("menu-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";

    startTimer();
    showQuestion();
}

// 3. Отображение вопроса
function showQuestion() {
    const question = currentTicket[currentQuestionIndex];

    // Заполняем информацию о билете и текст вопроса
    document.getElementById("ticket-info").innerText = `${question.ticket}-bilet, ${currentQuestionIndex + 1}-savol`;
    document.getElementById("question-text").innerText = question.question;

    // Работа с картинкой
    const qImg = document.getElementById("question-img");
    if (qImg) {
        if (question.image && question.image !== "no_image") {
            qImg.src = question.image; 
            qImg.style.display = "block";
        } else {
            qImg.src = "";
            qImg.style.display = "none";
        }
    }

    // Рендерим варианты ответов
    const optionsContainer = document.getElementById("options-container");
    if (optionsContainer) {
        optionsContainer.innerHTML = ""; 

        question.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.className = "btn"; // Используем твой стандартный класс кнопок
            btn.style.display = "block";
            btn.style.width = "100%";
            btn.style.margin = "10px 0";
            btn.innerText = option;
            
            btn.onclick = () => checkAnswer(index);
            optionsContainer.appendChild(btn);
        });
    }
}

// 4. Проверка ответа
function checkAnswer(selectedIndex) {
    const question = currentTicket[currentQuestionIndex];

    if (selectedIndex === question.answer) {
        correctAnswersCount++;
    } else {
        incorrectAnswersCount++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentTicket.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

// 5. Таймер
function startTimer() {
    clearInterval(timerInterval);
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

function updateTimerDOM() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `Vaqt: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById("timer").innerText = formattedTime;
}

// 6. Финиш
function finishQuiz() {
    clearInterval(timerInterval);

    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    const totalQuestions = currentTicket.length;
    const skipped = totalQuestions - (correctAnswersCount + incorrectAnswersCount);
    incorrectAnswersCount += skipped;

    document.getElementById("correct-stat").innerText = `To'g'ri javoblar: ${correctAnswersCount}`;
    document.getElementById("incorrect-stat").innerText = `Noto'g'ri javoblar: ${incorrectAnswersCount}`;
}
