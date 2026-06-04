// 1. Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// Проверка безопасности: загрузились ли билеты из allTickets.js?
if (typeof allTickets === 'undefined' || Object.keys(allTickets).length === 0) {
    document.getElementById("question-text").innerText = "Xatolik: allTickets.js fayli topilmadi yoki yuklanmadi!";
    console.error("Переменная allTickets не найдена. Проверьте подключение allTickets.js в index.html");
} else {
    
    // 2. Выбираем случайный билет
    const ticketNumbers = Object.keys(allTickets);
    const randomTicketKey = ticketNumbers[Math.floor(Math.random() * ticketNumbers.length)];
    const currentTicket = allTickets[randomTicketKey];

    let currentIndex = 0; // Индекс текущего вопроса в билете

    // 3. Получаем элементы страницы
    const questionText = document.getElementById("question-text");
    const questionImg = document.getElementById("question-img");
    const optionsContainer = document.getElementById("options-container");

    // 4. Функция отображения вопроса
    function showQuestion() {
        const q = currentTicket[currentIndex];
        
        // Отображаем текст вопроса
        questionText.innerText = `${currentIndex + 1}. ${q.question}`;

        // Работа с картинкой
        if (q.image && q.image !== "no_image" && q.image !== "") {
            questionImg.src = q.image;
            questionImg.style.display = "block";
        } else {
            questionImg.style.display = "none";
        }

        // Очищаем контейнер и создаем кнопки ответов
        optionsContainer.innerHTML = "";
        q.options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.className = "btn";
            btn.innerText = opt;
            
            // Обработчик клика
            btn.onclick = () => checkAnswer(index, q.answer, btn); 
            optionsContainer.appendChild(btn);
        });
    }

    // 5. Функция проверки ответа
    function checkAnswer(selectedIndex, correctAnswerIndex, btnElement) {
        // Блокируем все кнопки, чтобы пользователь не кликал много раз во время анимации
        const buttons = optionsContainer.querySelectorAll(".btn");
        buttons.forEach(b => b.disabled = true);

        if (selectedIndex === correctAnswerIndex) {
            // Если ответ правильный -> делаем кнопку зеленой
            btnElement.style.backgroundColor = "#34c759"; // Нативный зеленый цвет Telegram
            
            setTimeout(() => {
                currentIndex++;
                if (currentIndex < currentTicket.length) {
                    showQuestion();
                } else {
                    tg.showAlert("Tabriklaymiz! Bilet tugadi!", () => {
                        location.reload(); // Перезагружаем страницу для нового случайного билета
                    });
                }
            }, 600); // 0.6 секунды задержки, чтобы увидеть зеленый цвет

        } else {
            // Если ответ неверный -> делаем кнопку красной
            btnElement.style.backgroundColor = "#ff3b30"; // Нативный красный цвет Telegram
            
            // Подсвечиваем правильный вариант зеленым, чтобы пользователь знал верный ответ
            buttons[correctAnswerIndex].style.backgroundColor = "#34c759";

            setTimeout(() => {
                tg.showAlert("Noto'g'ri javob, qayta urinib ko'ring!", () => {
                    // После закрытия алерта возвращаем кнопкам исходный вид и разблокируем их
                    buttons.forEach(b => {
                        b.disabled = false;
                        b.style.backgroundColor = "#2c2c2e";
                    });
                });
            }, 400);
        }
    }

    // 6. Запускаем первый вопрос при загрузке приложения!
    showQuestion();
}
