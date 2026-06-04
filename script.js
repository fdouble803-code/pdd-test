// 1. Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// 2. Выбираем случайный билет из всех доступных в allTickets
const ticketNumbers = Object.keys(allTickets); // Получаем список всех номеров билетов [1, 2, 3...]
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
        btn.onclick = () => checkAnswer(index, q.answer); 
        optionsContainer.appendChild(btn);
    });
}

// 5. Функция проверки ответа
function checkAnswer(selectedIndex, correctAnswerIndex) {
    if (selectedIndex === correctAnswerIndex) {
        // Правильный ответ -> идем дальше
        currentIndex++;
        if (currentIndex < currentTicket.length) {
            showQuestion();
        } else {
            alert("Tabriklaymiz! Bilet tugadi!");
            // Можно перезапустить случайный билет или закрыть
            location.reload(); 
        }
    } else {
        // Неправильный ответ
        alert("Noto'g'ri javob, qayta urinib ko'ring!");
    }
}

// 6. Запуск теста
showQuestion();