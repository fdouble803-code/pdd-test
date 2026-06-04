// 1. Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
if (tg) {
    tg.expand();
}

// Безопасная функция для вызова алертов (работает и на ПК, и в TG)
function safeAlert(message, callback) {
    if (tg && tg.showAlert) {
        tg.showAlert(message, callback);
    } else {
        alert(message);
        if (callback) callback();
    }
}

// Проверка загрузки базы данных
if (typeof allTickets === 'undefined' || !allTickets["1"]) {
    document.getElementById("question-text").innerText = "Xatolik: data.js yuklanmadi yoki 1-bilet topilmadi!";
    console.error("Переменная allTickets или билет '1' не найдены в файле data.js");
} else {
    
    // ФИКС 1: Строго загружаем первый билет (а не случайный)
    const currentTicket = allTickets["1"]; 
    let currentIndex = 0; // Индекс текущего вопроса

    // Получаем элементы страницы
    const questionText = document.getElementById("question-text");
    const questionImg = document.getElementById("question-img");
    const optionsContainer = document.getElementById("options-container");

    // Функция отображения вопроса
    function showQuestion() {
        const q = currentTicket[currentIndex];
        
        // Устанавливаем текст вопроса
        questionText.innerText = `${currentIndex + 1}. ${q.question}`;

        // Работа с картинкой
        if (q.image && q.image !== "no_image" && q.image !== "") {
            questionImg.src = q.image;
            questionImg.style.display = "block";
        } else {
            questionImg.style.display = "none";
            questionImg.src = "";
        }

        // Очищаем старые кнопки и создаем новые
        optionsContainer.innerHTML = "";
        q.options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.className = "btn";
            btn.innerText = opt;
            
            // Обработчик нажатия
            btn.onclick = () => checkAnswer(index, q.answer, btn); 
            optionsContainer.appendChild(btn);
        });
    }

    // ФИКС 2: Функция проверки ответа с автоматическим переходом
    function checkAnswer(selectedIndex, correctAnswerIndex, btnElement) {
        // Блокируем все кнопки от повторных нажатий
        const buttons = optionsContainer.querySelectorAll(".btn");
        buttons.forEach(b => b.disabled = true);

        if (selectedIndex === correctAnswerIndex) {
            // Если ответ ПРАВИЛЬНЫЙ: красим кнопку в зеленый
            btnElement.style.backgroundColor = "#34c759"; 
            
            // Через 0.6 секунды переходим дальше
            setTimeout(() => {
                goToNextQuestion();
            }, 600);

        } else {
            // Если ответ НЕПРАВИЛЬНЫЙ: красим нажатую в красный
            btnElement.style.backgroundColor = "#ff3b30"; 
            
            // И СРАЗУ подсвечиваем правильную кнопку зеленым (подсказка)
            if (buttons[correctAnswerIndex]) {
                buttons[correctAnswerIndex].style.backgroundColor = "#34c759";
            }

            // Даем пользователю 1.5 секунды посмотреть на правильный ответ и переводим дальше
            setTimeout(() => {
                goToNextQuestion();
            }, 1500);
        }
    }

    // Вспомогательная функция переключения шага
    function goToNextQuestion() {
        currentIndex++;
        
        if (currentIndex < currentTicket.length) {
            // Если вопросы еще есть — показываем следующий
            showQuestion();
        } else {
            // Если билет закончился — выдаем финальное поздравление
            safeAlert("Tabriklaymiz! 1-bilet muvaffaqiyatli tugadi!", () => {
                location.reload(); // Перезапуск билета сначала
            });
        }
    }

    // Запуск самого первого вопроса
    showQuestion();
}
