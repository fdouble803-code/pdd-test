(function() {
    var tg = window.Telegram ? window.Telegram.WebApp : null;
    if (tg) tg.expand();

    var currentTicketNum = null, currentTicket = null, currentIndex = 0;
    var correctCount = 0, incorrectCount = 0, timerInterval;

    var menuContainer = document.getElementById("menu-container");
    var quizContainer = document.getElementById("quiz-container");
    var resultContainer = document.getElementById("result-container");
    var ticketsGrid = document.getElementById("tickets-grid");

    function showMenu() {
        menuContainer.style.display = "block";
        quizContainer.style.display = "none";
        resultContainer.style.display = "none";
        ticketsGrid.innerHTML = "";
        
        Object.keys(allTickets).sort((a,b) => a-b).forEach(key => {
            var btn = document.createElement("button");
            btn.className = "ticket-btn";
            btn.innerText = key;
            btn.onclick = () => startTicket(key);
            ticketsGrid.appendChild(btn);
        });
    }

    function startTicket(ticketId) {
        currentTicketNum = parseInt(ticketId);
        currentTicket = allTickets[String(currentTicketNum)];
        currentIndex = 0; correctCount = 0; incorrectCount = 0;
        
        menuContainer.style.display = "none";
        quizContainer.style.display = "block";
        
        startTimer();
        showQuestion();
    }

    function startTimer() {
        var timeLeft = 1200; // 20 daqiqa
        var timerDisplay = document.getElementById("timer");
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            var m = Math.floor(timeLeft / 60);
            var s = timeLeft % 60;
            timerDisplay.innerText = "Vaqt: " + m + ":" + (s < 10 ? "0" : "") + s;
            if (timeLeft <= 0) { clearInterval(timerInterval); showResults(); }
        }, 1000);
    }

    function showQuestion() {
        var q = currentTicket[currentIndex];
        document.getElementById("ticket-info").innerText = currentTicketNum + "-Bilet | Savol: " + (currentIndex + 1);
        document.getElementById("question-text").innerText = q.question;
        
        var img = document.getElementById("question-img");
        if (q.image && q.image !== "no_image") {
            img.src = q.image; img.style.display = "block";
        } else { img.style.display = "none"; }

        var container = document.getElementById("options-container");
        container.innerHTML = "";
        q.options.forEach((opt, idx) => {
            var btn = document.createElement("button");
            btn.className = "btn";
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(idx, q.answer, btn);
            container.appendChild(btn);
        });
    }

    function checkAnswer(idx, correctIdx, btn) {
        var buttons = document.querySelectorAll(".btn");
        buttons.forEach(b => b.disabled = true);
        if (idx === correctIdx) {
            btn.classList.add('correct'); correctCount++;
            setTimeout(goToNext, 500);
        } else {
            btn.classList.add('wrong');
            buttons[correctIdx].classList.add('correct');
            incorrectCount++;
            setTimeout(goToNext, 1200);
        }
    }

    function goToNext() {
        currentIndex++;
        if (currentIndex < currentTicket.length) showQuestion();
        else showResults();
    }

    function showResults() {
        clearInterval(timerInterval);
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        document.getElementById("correct-stat").innerText = "To'g'ri: " + correctCount;
        document.getElementById("incorrect-stat").innerText = "Noto'g'ri: " + incorrectCount;
    }

    showMenu();
})();
