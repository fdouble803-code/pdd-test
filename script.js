let currentTicket = null;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let timerInterval = null;
let timeLeft = 20 * 60; // 20 минут

window.addEventListener("DOMContentLoaded", () => {
    // Безопасная проверка: если data.js не загрузился, просто пишем в консоль, чтобы не бесить алертами
    if (typeof allTickets === "undefined") {
        console.error("data.js fayli topilmadi yoki xato yozilgan!");
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
        btn.className = "btn"; // Твой класс стилей из CSS
        btn.innerText = `${i}-bilet`;
        
        btn.onclick = () => startQuiz(i);
        grid.appendChild(btn);
    }
}

// 2. Старт теста
function startQuiz(ticketNumber) {
    const ticketKey = String(ticketNumber);

    // ПРОВЕРКА: Если билета нет в data.js, то не переключаем экран, а деликатно предупреждаем
    if (!allTickets || !allTickets[ticketKey]) {
        alert(`Baza ma'lumotlarida ${ticketNumber}-bilet hali yo'q! Hozircha faqat 1-biletni tekshirib ko'ring.`);
        return;
    }

    currentTicket = allTickets[ticketKey];
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    timeLeft = 20 * 60; 

    // Скрываем меню, показываем тест
    document.getElementById("menu-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";

    startTimer();
    showQuestion();
}

// 3. Отображение вопроса
function showQuestion() {
    if (!currentTicket || !currentTicket[currentQuestionIndex]) return;
    
    const question = currentTicket[currentQuestionIndex];

    // Заполняем инфо
    const ticketInfo = document.getElementById("ticket-info");
    const questionText = document.getElementById("question-text");
    
    if (ticketInfo) ticketInfo.innerText = `${question.ticket}-bilet, ${currentQuestionIndex + 1}-savol`;
    if (questionText) questionText.innerText = question.question;

    // Работа с картинкой (no_image контроль)
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

    // Варианты ответов
    const optionsContainer = document.getElementById("options-container");
    if (optionsContainer) {
        optionsContainer.innerHTML = ""; 

        question.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.className = "btn";
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
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDOM() {
    const timerElement = document.getElementById("timer");
    if (!timerElement) return;
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerText = `Vaqt: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 6. Финиш
function finishQuiz() {
    clearInterval(timerInterval);

    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    const totalQuestions = currentTicket.length;
    const skipped = totalQuestions - (correctAnswersCount + incorrectAnswersCount);
    incorrectAnswersCount += skipped;

    const correctStat = document.getElementById("correct-stat");
    const incorrectStat = document.getElementById("incorrect-stat");
    
    if (correctStat) correctStat.innerText = `To'g'ri javoblar: ${correctAnswersCount}`;
    if (incorrectStat) incorrectStat.innerText = `Noto'g'ri javoblar: ${incorrectAnswersCount}`;
}
