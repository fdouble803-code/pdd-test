// Перехватываем абсолютно любые глобальные ошибки до старта кода
window.onerror = function(message, source, lineno, colno, error) {
    const qText = document.getElementById("question-text");
    if (qText) {
        qText.innerHTML = `<span style="color: #ff3b30;">Глобальная ошибка скрипта:<br>${message}<br>Строка: ${lineno}</span>`;
    }
    return false;
};

try {
    const tg = window.Telegram?.WebApp;
    if (tg) { tg.expand(); }

    // Проверяем наличие базы данных
    if (typeof allTickets === 'undefined') {
        throw new Error("Переменная 'allTickets' не найдена. Файл data.js не загрузился или содержит ошибку.");
    }

    // Состояние приложения
    let currentTicketNum = 1;
    let currentTicket = allTickets[String(currentTicketNum)];
    let currentIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    // Проверяем первый билет
    if (!currentTicket) {
        throw new Error(`Билет под номером '${currentTicketNum}' не найден в объекте allTickets.`);
    }

    // Элементы страницы
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
    const ticketInfo = document.getElementById("ticket-info");
    const questionText = document.getElementById("question-text");
    const questionImg = document.getElementById("question-img");
    const optionsContainer = document.getElementById("options-container");
    const correctStat = document.getElementById("correct-stat");
    const incorrectStat = document.getElementById("incorrect-stat");
    const nextTicketBtn = document.getElementById("next-ticket-btn");

    function showQuestion() {
        try {
            if (!currentTicket) {
                alert("Barcha biletlar tugadi! Test boshidan boshlanadi.");
                currentTicketNum = 1;
                currentTicket = allTickets["1"];
                resetCounters();
            }

            quizContainer.style.display = "block";
            resultContainer.style.display = "none";

            const q = currentTicket[currentIndex];
            if (!q) {
                throw new Error(`Вопрос по индексу ${currentIndex} отсутствует в билете ${currentTicketNum}`);
            }
            
            if (ticketInfo) {
                ticketInfo.innerText = `${currentTicketNum}-Bilet | Savol: ${currentIndex + 1}/${currentTicket.length}`;
            }
            
            questionText.innerText = q.question;

            // Картинка
            if (q.image && q.image !== "no_image" && q.image !== "") {
                questionImg.src = q.image;
                questionImg.style.display = "block";
            } else {
                questionImg.style.display = "none";
                questionImg.src = "";
            }

            // Ответы
            optionsContainer.innerHTML = "";
            q.options.forEach((opt, index) => {
                const btn = document.createElement("button");
                btn.className = "btn";
                btn.innerText = opt;
                btn.onclick = () => checkAnswer(index, q.answer, btn);
                optionsContainer.appendChild(btn);
            });
        } catch (e) {
            questionText.innerHTML = `<span style="color: #ff3b30;">Ошибка внутри showQuestion:<br>${e.message}</span>`;
        }
    }

    function checkAnswer(selectedIndex, correctAnswerIndex, btnElement) {
        const buttons = optionsContainer.querySelectorAll(".btn");
        buttons.forEach(b => b.disabled = true);

        if (selectedIndex === correctAnswerIndex) {
            btnElement.style.backgroundColor = "#34c759";
            correctCount++;
            setTimeout(goToNext, 600);
        } else {
            btnElement.style.backgroundColor = "#ff3b30";
            if (buttons[correctAnswerIndex]) {
                buttons[correctAnswerIndex].style.backgroundColor = "#34c759";
            }
            incorrectCount++;
            setTimeout(goToNext, 1500);
        }
    }

    function goToNext() {
        currentIndex++;
        if (currentIndex < currentTicket.length) {
            showQuestion();
        } else {
            showResultsView();
        }
    }

    function showResultsView() {
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        if (correctStat) correctStat.innerText = `To'g'ri javoblar: ${correctCount}`;
        if (incorrectStat) incorrectStat.innerText = `Noto'g'ri javoblar: ${incorrectCount}`;
    }

    if (nextTicketBtn) {
        nextTicketBtn.onclick = () => {
            currentTicketNum++;
            if (allTickets[String(currentTicketNum)]) {
                currentTicket = allTickets[String(currentTicketNum)];
                resetCounters();
                showQuestion();
            } else {
                alert("Siz hamma biletlarni yubordingiz! Test 1-biletga qaytadi.");
                currentTicketNum = 1;
                currentTicket = allTickets["1"];
                resetCounters();
                showQuestion();
            }
        };
    }

    function resetCounters() {
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
    }

    // Старт
    showQuestion();

} catch (globalError) {
    document.getElementById("question-text").innerHTML = `<span style="color: #ff3b30;">Критическая ошибка инициализации:<br>${globalError.message}</span>`;
}
