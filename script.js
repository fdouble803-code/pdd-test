(function() {
    // Безопасное получение Telegram WebApp
    var tg = window.Telegram ? window.Telegram.WebApp : null;
    if (tg && typeof tg.expand === 'function') {
        tg.expand();
    }

    // Проверяем существование базы данных
    if (typeof allTickets === 'undefined') {
        document.getElementById("menu-title").style.color = "#ff3b30";
        document.getElementById("menu-title").innerHTML = "Xatolik: data.js fayli topilmadi!";
        return;
    }

    // Состояние игры
    var currentTicketNum = null;
    var currentTicket = null;
    var currentIndex = 0;
    var correctCount = 0;
    var incorrectCount = 0;

    // DOM-элементы
    var menuContainer = document.getElementById("menu-container");
    var ticketsGrid = document.getElementById("tickets-grid");
    
    var quizContainer = document.getElementById("quiz-container");
    var resultContainer = document.getElementById("result-container");
    
    var ticketInfo = document.getElementById("ticket-info");
    var questionText = document.getElementById("question-text");
    var questionImg = document.getElementById("question-img");
    var optionsContainer = document.getElementById("options-container");
    
    var correctStat = document.getElementById("correct-stat");
    var incorrectStat = document.getElementById("incorrect-stat");
    
    var nextTicketBtn = document.getElementById("next-ticket-btn");
    var homeBtn = document.getElementById("home-btn");

    // 1. ФУНКЦИЯ ПОКАЗА ГЛАВНОГО МЕНЮ
    function showMenu() {
        menuContainer.style.display = "block";
        quizContainer.style.display = "none";
        resultContainer.style.display = "none";
        
        // Очищаем старые кнопки
        ticketsGrid.innerHTML = "";
        
        // Получаем все номера билетов из data.js и сортируем их по порядку (1, 2, 3...)
        var ticketKeys = Object.keys(allTickets).sort(function(a, b) {
            return parseInt(a) - parseInt(b);
        });

        // Создаем кнопку для каждого билета
        ticketKeys.forEach(function(key) {
            var btn = document.createElement("button");
            btn.className = "ticket-btn";
            btn.innerText = key;
            btn.onclick = function() {
                startTicket(key); // Запуск билета по клику
            };
            ticketsGrid.appendChild(btn);
        });
    }

    // 2. ФУНКЦИЯ ЗАПУСКА ВЫБРАННОГО БИЛЕТА
    function startTicket(ticketId) {
        currentTicketNum = parseInt(ticketId);
        currentTicket = allTickets[String(currentTicketNum)];
        
        if (!currentTicket) return;

        resetCounters();
        menuContainer.style.display = "none";
        resultContainer.style.display = "none";
        quizContainer.style.display = "block";
        
        showQuestion();
    }

    // 3. ФУНКЦИЯ ПОКАЗА ВОПРОСА
    function showQuestion() {
        var q = currentTicket[currentIndex];
        
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

        // Рендеринг кнопок ответов
        optionsContainer.innerHTML = "";
        q.options.forEach(function(opt, index) {
            var btn = document.createElement("button");
            btn.className = "btn";
            btn.innerText = opt;
            btn.onclick = function() { checkAnswer(index, q.answer, btn); };
            optionsContainer.appendChild(btn);
        });
    }

    // 4. ФУНКЦИЯ ПРОВЕРКИ ОТВЕТА
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

    // Переход к следующему вопросу или результатам
    function goToNext() {
        currentIndex++;
        if (currentIndex < currentTicket.length) {
            showQuestion();
        } else {
            showResultsView();
        }
    }

    // 5. ЭКРАН РЕЗУЛЬТАТОВ
    function showResultsView() {
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        if (correctStat) correctStat.innerText = "To'g'ri javoblar: " + correctCount;
        if (incorrectStat) incorrectStat.innerText = "Noto'g'ri javoblar: " + incorrectCount;
    }

    // 6. ОБРАБОТЧИКИ КНОПОК В РЕЗУЛЬТАТАХ
    if (nextTicketBtn) {
        nextTicketBtn.onclick = function() {
            var nextNum = currentTicketNum + 1;
            if (allTickets[String(nextNum)]) {
                startTicket(nextNum);
            } else {
                alert("Siz oxirgi biletni yechdingiz! Bosh menyuga qaytamiz.");
                showMenu();
            }
        };
    }

    if (homeBtn) {
        homeBtn.onclick = function() {
            showMenu();
        };
    }

    function resetCounters() {
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
    }

    // СТАРТ ПРОГРАММЫ: Показываем главное меню вместо 1 вопроса
    showMenu();
})();
