// 1. Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// Убедитесь, что переменная allTickets (с вашим JSON из прошлого шага) подключена до этого кода!
const ticketNumbers = Object.keys(allTickets); // Получаем список всех номеров билетов ["6", "7", "8"...]
const randomTicketKey = ticketNumbers[Math.floor(Math.random() * ticketNumbers.length)];
const currentTicket = allTickets[randomTicketKey]; // Загружаем вопросы именно этого билета

let currentIndex = 0; // Индекс текущего вопроса в билете

// 3. Элементы страницы
const questionText = document.getElementById("question-text");
const questionImg = document.getElementById("question-img");
const optionsContainer = document.getElementById("options-container");

// 4. Функция отображения вопроса
function showQuestion() {
    const q = currentTicket[currentIndex];
    
    // Устанавливаем текст вопроса
    questionText.innerText = `${currentIndex + 1}. ${q.question}`;

    // Работа с картинкой (проверка наличия)
    if (q.image && q.image !== "no_image" && q.image !== "") {
        // Замените путь, если картинки лежат в отдельной папке, например: src = `images/${q.image}`
        questionImg.src = q.image;
        questionImg.style.display = "block";
    } else {
        questionImg.style.display = "none";
    }

    // Очистка и создание кнопок ответов
    optionsContainer.innerHTML = "";
    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.innerText = opt;
        // Передаем правильный индекс ответа из данных
        btn.onclick = () => checkAnswer(index, q.answer, btn); 
        optionsContainer.appendChild(btn);
    });
}

// 5. Функция проверки ответа
function checkAnswer(selectedIndex, correctAnswerIndex, btnElement) {
    if (selectedIndex === correctAnswerIndex) {
        // Правильный ответ -> подсвечиваем зеленым (опционально) и идем дальше
        btnElement.style.backgroundColor = "green";
        
        // Небольшая задержка перед следующим вопросом, чтобы пользователь увидел правильный ответ
        setTimeout(() => {
            currentIndex++;
            if (currentIndex < currentTicket.length) {
                showQuestion();
            } else {
                // Используем нативное окно Telegram вместо обычного alert
                tg.showAlert("Tabriklaymiz! Bilet tugadi!", () => {
                    location.reload(); // Перезапуск после закрытия окна
                });
            }
        }, 500); // 500 миллисекунд задержки

    } else {
        // Неправильный ответ
        btnElement.style.backgroundColor = "red";
        tg.showAlert("Noto'g'ri javob, qayta urinib ko'ring!");
    }
}

// 6. ВАЖНО: ЗАПУСК ПЕРВОГО ВОПРОСА
// Именно эта строчка запускает процесс при открытии приложения
showQuestion();
