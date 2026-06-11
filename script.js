let currentTicket = null;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let timerInterval = null;
let timeLeft = 20 * 60; // 20 минут

window.addEventListener("DOMContentLoaded", () => {
    if (typeof allTickets === "undefined") {
        console.error("data.js fayli yuklanmagan yoki xato bor!");
        return;
    }
    generateTicketsGrid();
});

// 1. Генерация сетки билетов
function generateTicketsGrid() {
    const grid = document.getElementById("tickets-grid");
    if (!grid) return;
    grid.innerHTML = ""; 

    for (let i = 1; i <= 60; i++) {
        const btn = document.createElement("button");
        btn.className = "btn"; 
        btn.style.margin = "5px";
        btn.innerText = `${i}-bilet`;
        
        btn.onclick = () => startQuiz(i);
        grid.appendChild(btn);
    }
}

// 2. Старт теста
function startQuiz(ticketNumber) {
    const ticketKey = String(ticketNumber);

    if (!allTickets || !allTickets[ticketKey]) {
        alert(`Baza ma'lumotlarida ${ticketNumber}-bilet hali yo'q! 1-biletni tekshiring.`);
        return;
    }

    currentTicket = allTickets[ticketKey];
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    timeLeft = 20 * 60; 

    document.getElementById("menu-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";

    startTimer();
    showQuestion();
}

// 3. Отображение вопроса
function showQuestion() {
    const question = currentTicket[currentQuestionIndex];

    document.getElementById("ticket-info").innerText = `${question.ticket}-bilet, ${currentQuestionIndex + 1}-savol`;
    document.getElementById("question-text").innerText = question.question;

    // Картинка
    const qImg = document.getElementById("question-img");
    if (qImg) {
        if (question.image && question.image !== "no_image") {
            qImg.src = question.image; 
            qImg.style.display = "block";
            qImg.style.maxWidth = "100%";
        } else {
            qImg.src = "";
            qImg.style.display = "none";
        }
    }

    // Кнопки ответов
    const optionsContainer = document.getElementById("options-container");
    if (optionsContainer) {
        optionsContainer.innerHTML = ""; 

        question.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.className = "btn"; 
            btn.style.display = "block";
            btn.style.width = "100%";
            btn.style.margin = "10px 0";
            btn.style.textAlign = "left";
            btn.style.transition = "background-color 0.2s";
            btn.innerText = option;
            
            // Передаем саму кнопку, выбранный индекс и правильный ответ
            btn.onclick = () => checkAnswer(btn, index, question.answer);
            optionsContainer.appendChild(btn);
        });
    }
}

// 4. Проверка и моментальное окрашивание кнопок
function checkAnswer(clickedButton, selectedIndex, correctIndex) {
    const optionsContainer = document.getElementById("options-container");
    const allButtons = optionsContainer.querySelectorAll("button");

    // Выключаем клики по всем кнопкам, чтобы не нажимали повторно
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = "none";
    });

    if (selectedIndex === correctIndex) {
        // Если угадал — делаем её зелёной
        clickedButton.style.backgroundColor = "#2ecc71";
        clickedButton.style.color = "#ffffff";
        correctAnswersCount++;
    } else {
        // Если не угадал — выбранную в красный
        clickedButton.style.backgroundColor = "#e74c3c";
        clickedButton.style.color = "#ffffff";
        
        // А правильную подсвечиваем зелёным
        allButtons[correctIndex].style.backgroundColor = "#2ecc71";
        allButtons[correctIndex].style.color = "#ffffff";
        incorrectAnswersCount++;
    }

    // Пауза 1.5 секунды, чтобы юзер увидел, где был правильный ответ
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentTicket.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
    }, 1500);
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
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `Vaqt: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 6. Результаты
function finishQuiz() {
    clearInterval(timerInterval);

    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    document.getElementById("correct-stat").innerText = `To'g'ri javoblar: ${correctAnswersCount}`;
    document.getElementById("incorrect-stat").innerText = `Noto'g'ri javoblar: ${incorrectAnswersCount}`;
}
