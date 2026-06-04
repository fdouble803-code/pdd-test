(function() {
    // Безопасное получение Telegram WebApp
    var tg = window.Telegram ? window.Telegram.WebApp : null;
    if (tg && typeof tg.expand === 'function') {
        tg.expand();
    }

    // Проверяем существование базы данных
    if (typeof allTickets === 'undefined') {
        document.getElementById("question-text").style.color = "#ff3b30";
        document.getElementById("question-text").innerHTML = "<b>Ошибка структуры:</b> Переменная 'allTickets' не найдена. Проверьте структуру вашего файла data.js!";
        return;
    }

    // Состояние игры
    var currentTicketNum = 1;
    var currentTicket = allTickets[String(currentTicketNum)];
    var currentIndex = 0;
    var correctCount = 0;
    var incorrectCount = 0;

    if (!currentTicket) {
        document.getElementById("question-text").style.color = "#ff3b30";
        document.getElementById("question-text").innerHTML = "<b>Ошибка данных:</b> Билет №1 не найден внутри переменной allTickets.";
        return;
    }

    // DOM-элементы
    var quizContainer = document.getElementById("quiz-container");
    var resultContainer = document.getElementById("result-container");
    var ticketInfo = document.getElementById("ticket-info");
    var questionText = document.getElementById("question-text");
    var questionImg = document.getElementById("question-img");
    var optionsContainer = document.getElementById("options-container");
    var correctStat = document.getElementById("correct-stat");
    var incorrectStat = document.getElementById("incorrect-stat");
    var nextTicketBtn = document.getElementById("next-ticket-btn");

    function showQuestion() {
        if (!currentTicket) {
            alert("Barcha biletlar tugadi! Test boshidan boshlanadi.");
            currentTicketNum = 1;
            currentTicket = allTickets["1"];
            resetCounters();
        }

        quizContainer.style.display = "block";
        resultContainer.style.display = "none";

        var q = currentTicket[currentIndex];
        if (!q) {
            questionText.innerHTML = "Ошибка: Вопрос не найден.";
            return;
        }
        
        if (ticketInfo) {
            ticketInfo.innerText = currentTicketNum + "-Bilet | Savol: " + (currentIndex + 1) + "/" + currentTicket.length;
        }
        
        questionText.innerText = q.question;

        // Обработка картинок
        if (q.image && q.image !== "no_image" && q.image !== "") {
            questionImg.src = q.image;
            questionImg.style.display = "block";
        } else {
            questionImg.style.display = "none";
            questionImg.src = "";
        }

        // Рендеринг кнопок
        optionsContainer.innerHTML = "";
        q.options.forEach(function(opt, index) {
            var btn = document.createElement("button");
            btn.className = "btn";
            btn.innerText = opt;
            btn.onclick = function() { checkAnswer(index, q.answer, btn); };
            optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(selectedIndex, correctAnswerIndex, btnElement) {
        var buttons = optionsContainer.querySelectorAll(".btn");
        buttons.forEach(function(b) { b.disabled = true; });

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
        if (correctStat) correctStat.innerText = "To'g'ri javoblar: " + correctCount;
        if (incorrectStat) incorrectStat.innerText = "Noto'g'ri javoblar: " + incorrectCount;
    }

    if (nextTicketBtn) {
        nextTicketBtn.onclick = function() {
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

    // Официальный старт программы
    showQuestion();
})();
