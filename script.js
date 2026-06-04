// 1. Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
if (tg) {
    tg.expand();
}

// Безопасный алерт (работает везде)
function safeAlert(message, callback) {
    if (tg && tg.showAlert) {
        tg.showAlert(message, callback);
    } else {
        alert(message);
        if (callback) callback();
    }
}

// Проверка загрузки базы данных из data.js
if (typeof allTickets === 'undefined' || Object.keys(allTickets).length === 0) {
    document.getElementById("question-text").innerText = "Xatolik: data.js fayli yuklanmadi!";
    console.error("Переменная allTickets не найдена.");
} else {
    
    // Глобальное состояние игры
    let currentTicketNum = 1; // Номер текущего билета
    let currentTicket = allTickets[String(currentTicketNum)];
    let currentIndex = 0;     // Номер текущего вопроса (0-19)
    
    // Счетчики правильных и неправильных ответов
    let correctCount = 0;
    let incorrectCount = 0;

    // Получаем DOM элементы
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
    const ticketInfo = document.getElementById("ticket-info");
    const questionText = document.getElementById("question-text");
    const questionImg = document.getElementById("question-img");
    const optionsContainer = document.getElementById("options-container");
    
    const correctStat = document.getElementById("correct-stat");
    const incorrectStat = document.getElementById("incorrect-stat");
    const nextTicketBtn = document.getElementById("next-ticket-btn");

    // Функция отображения вопроса
    function showQuestion() {
        // Проверяем, существует ли такой билет в data.js
        if (!currentTicket) {
            safeAlert("Barcha biletlar tugadi! Test boshidan boshlanadi.", () => {
                currentTicketNum = 1;
                currentTicket = allTickets["1"];
                resetCounters();
                showQuestion();
            });
            return;
        }

        // Показываем блок теста, скрываем блок результатов
        quizContainer.style.display = "block";
        resultContainer.style.display = "none";

        const q = currentTicket[currentIndex];
        
        // Обновляем инфо-строку (например: "1-BILET | SAVOL: 5/20")
        ticketInfo.innerText = `${currentTicketNum}-Bilet | Savol: ${currentIndex + 1}/${currentTicket.length}`;
        
        // Текст вопроса
        questionText.innerText = q.question;

        // Картинка вопроса
        if (q.image && q.image !== "no_image" && q.image !== "") {
            questionImg.src = q.image;
            questionImg.style.display = "block";
        } else {
            questionImg.style.display = "none";
            questionImg.src = "";
        }

        // Кнопки ответов
        optionsContainer.innerHTML = "";
        q.options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.className = "btn";
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(index, q.answer, btn); 
            optionsContainer.appendChild(btn);
        });
    }

    // Функция проверки ответа
    function checkAnswer(selectedIndex, correctAnswerIndex, btnElement) {
        const buttons = optionsContainer.querySelectorAll(".btn");
        buttons.forEach(b => b.disabled = true); // Блокируем клики

        if (selectedIndex === correctAnswerIndex) {
            btnElement.style.backgroundColor = "#34c759"; // Зеленый
            correctCount++; // Плюс к правильным
            
            setTimeout(() => {
                goToNext();
            }, 600);
        } else {
            btnElement.style.backgroundColor = "#ff3b30"; // Красный
            if (buttons[correctAnswerIndex]) {
                buttons[correctAnswerIndex].style.backgroundColor = "#34c759"; // Подсказка
            }
            incorrectCount++; // Плюс к неправильным

            setTimeout(() => {
                goToNext();
            }, 1500);
        }
    }

    // Логика перехода к следующему шагу
    function goToNext() {
        currentIndex++;
        
        // Если в билете еще есть вопросы (меньше 20)
        if (currentIndex < currentTicket.length) {
            showQuestion();
        } else {
            // Если ответили на все 20 вопросов — открываем экран результатов
            showResultsView();
        }
    }

    // Показ экрана результатов
    function showResultsView() {
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        
        // Записываем собранную статистику в элементы
        correctStat.innerText = `To'g'ri javoblar: ${correctCount}`;
        incorrectStat.innerText = `Noto'g'ri javoblar: ${incorrectCount}`;
    }

    // Клик по кнопке "Перейти в следующий билет"
    nextTicketBtn.onclick = () => {
        currentTicketNum++; // Переключаем на следующий номер билета
        
        // Проверяем, есть ли следующий билет в базе данных data.js
        if (allTickets[String(currentTicketNum)]) {
            currentTicket = allTickets[String(currentTicketNum)];
            resetCounters();
            showQuestion();
        } else {
            // Если билеты кончились (например, дошли до конца вашей базы)
            safeAlert("Siz hamma biletlarni yubordingiz! Test 1-biletga qaytadi.", () => {
                currentTicketNum = 1;
                currentTicket = allTickets["1"];
                resetCounters();
                showQuestion();
            });
        }
    };

    // Сброс счетчиков перед новым билетом
    function resetCounters() {
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
    }

    // Самый первый запуск приложения
    showQuestion();
}
