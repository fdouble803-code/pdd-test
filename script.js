let currentTicket = null;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let timerInterval = null;
let timeLeft = 20 * 60; // 20 минут в секундах

window.addEventListener("DOMContentLoaded", () => {
    // Проверяем, загрузилась ли база данных
    if (typeof allTickets === "undefined") {
        console.error("data.js fayli topilmadi yoki yuklanishda xato bor!");
        return;
    }
    generateTicketsGrid();
});

// 1. Создание кнопок билетов (от 1 до 60)
function generateTicketsGrid() {
    const grid = document.getElementById("tickets-grid");
    if (!grid) return;
    grid.innerHTML = ""; 

    for (let i = 1; i <= 60; i++) {
        const btn = document.createElement("button");
        btn.className = "btn"; 
        btn.innerText = `${i}-bilet`;
        
        btn.onclick = () => startQuiz(i);
        grid.appendChild(btn);
    }
}

// 2. Старт теста при клике на билет
function startQuiz(ticketNumber) {
    // Получаем билет напрямую по числу или по строке (убирает баг пустого экрана)
    currentTicket = allTickets[ticketNumber] || allTickets[String(ticketNumber)];

    if (!currentTicket) {
        alert(`Baza ma'lumotlarida ${ticketNumber}-bilet topilmadi! Data.js faylini tekshiring.`);
        return;
    }

    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    timeLeft = 20 * 60; 

    // Переключаем экраны
    document.getElementById("menu-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";

    startTimer();
    showQuestion();
}

// 3. Вывод вопроса на экран
function showQuestion() {
    const question = currentTicket[currentQuestionIndex];

    document.getElementById("ticket-info").innerText = `${question.ticket}-bilet, ${currentQuestionIndex + 1}-savol`;
    document.getElementById("question-text").innerText = question.question;

    // Работа с картинкой вопроса
    const qImg = document.getElementById("question-img");
    if (qImg) {
        if (question.image && question.image !== "no_image") {
            // Если картинки лежат в папке images, добавь перед путем: `images/${question.image}`
            qImg.src = question.image; 
            qImg.style.display = "block";
            qImg.style.maxWidth = "100%";
            qImg.style.marginTop = "15px";
            qImg.style.borderRadius = "8px";
        } else {
            qImg.src = "";
            qImg.style.display = "none";
        }
    }

    // Вывод кнопок вариантов ответов
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
            btn.innerText = option;
            
            // Клик отправляет саму кнопку, её индекс и правильный индекс из базы
            btn.onclick = () => checkAnswer(btn, index, question.answer);
            optionsContainer.appendChild(btn);
        });
    }
}

// 4. Проверка ответа и подсветка (Красный / Зеленый)
function checkAnswer(clickedButton, selectedIndex, correctIndex) {
    const optionsContainer = document.getElementById("options-container");
    const allButtons = optionsContainer.querySelectorAll("button");

    // Моментально блокируем все кнопки от повторных кликов
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = "none";
    });

    if (selectedIndex === correctIndex) {
        // Угадал -> красим нажатую кнопку в ЗЕЛЕНЫЙ
        clickedButton.style.setProperty("background-color", "#2ecc71", "important");
        clickedButton.style.setProperty("color", "#ffffff", "important");
        correctAnswersCount++;
    } else {
        // Ошибка -> красим нажатую кнопку в КРАСНЫЙ
        clickedButton.style.setProperty("background-color", "#e74c3c", "important");
        clickedButton.style.setProperty("color", "#ffffff", "important");
        
        // И автоматически подсвечиваем ПРАВИЛЬНЫЙ ответ ЗЕЛЕНЫМ
        allButtons[correctIndex].style.setProperty("background-color", "#2ecc71", "important");
        allButtons[correctIndex].style.setProperty("color", "#ffffff", "important");
        incorrectAnswersCount++;
    }

    // Задержка 1.5 секунды, чтобы юзер успел увидеть цвета
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentTicket.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
    }, 1500);
}

// 5. Логика работы таймера
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

// 6. Экран результатов
function finishQuiz() {
    clearInterval(timerInterval);

    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    document.getElementById("correct-stat").innerText = `To'g'ri javoblar: ${correctAnswersCount}`;
    document.getElementById("incorrect-stat").innerText = `Noto'g'ri javoblar: ${incorrectAnswersCount}`;
}
