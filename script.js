// Полная база данных вопросов по билетам
const allTickets = {
    "1": [
        { "ticket": 1, "id": 1, "question": "Avtomobil qaysi yo'nalishlarda harakatlanishi mumkin?", "image": "no_image", "options": ["Faqat o'ngga", "To'xtash va svetoforning yashil chirog'ini kutish", "Faqat to'g'riga", "Barcha yo'nalishlar bo'yicha"], "answer": 3 },
        { "ticket": 1, "id": 2, "question": "Svetaforning yashil miltillovchi ishorasi nimani bildiradi?", "image": "1.2.png", "options": ["Svetafor nosozligini", "Harakatga ruxsat beradi va tez orada taqiqlovchi ishora yonishi to'g'risida axborot beradi", "Harakatni davom ettirishni taqiqlaydi"], "answer": 1 },
        { "ticket": 1, "id": 3, "question": "Ushbu joyda avtomobilni to'xtab turish uchun qo'yishga ruxsat etiladimi?", "image": "1.3.png", "options": ["Ha", "Yo'q"], "answer": 1 },
        { "ticket": 1, "id": 4, "question": "Siz chorrahadan to'g'riga o'tmoqchisiz. Ushbu vaziyatda Sizning harakatingiz?", "image": "1.4.png", "options": ["Chorrahaga birinchi kirgan qizil avtomobilga yo'l berish", "Qizil avtomobil yo'l berayotganiga ishonch xosil qilib chorrahadan birinchi o'tish"], "answer": 1 },
        { "ticket": 1, "id": 5, "question": "Siz chorrahadan chapga burilmoqchisiz. Ushbu vaziyatda kimga yo'l berasiz?", "image": "no_image", "options": ["Faqat avtobusga", "Faqat qizil avtomobilga", "Hech kimga"], "answer": 2 },
        { "ticket": 1, "id": 6, "question": "Qaysi hollarda yo'lning harakatlanish bo'lagini ajratuvchi uzuq-uzuq chiziqni bosib o'tish mumkin?", "image": "1.6.png", "options": ["Faqat qayta tizilishda", "Yo'lda boshqa transport vositalari bo'lmasa", "Barcha sanab o'tilgan hollarda"], "answer": 0 },
        { "ticket": 1, "id": 7, "question": "Ushbu ko'rsatilgan holatda mototsikl haydovchisi sizga yo'l berishi kerakmi?", "image": "no_image", "options": ["Yo'q", "Ha"], "answer": 1 },
        { "ticket": 1, "id": 8, "question": "Sanab o'tilgan qaysi hollarda egiluvchan ulagichda shatakka olish taqiqlanadi?", "image": "1.8.png", "options": ["Faqat tog'li yo'llarda", "Yo'l yaxmalak, sirpanchiq bo'lgan hollarda", "Kunning qorong'i vaqtida va etarli ko'rinmaslik sharoitida", "Barcha sanab o'tilgan hollarda"], "answer": 1 },
        { "ticket": 1, "id": 9, "question": "Ushbu belgilardan qaysi biri bir tomonlama harakat tashkil qilingan yo'lning boshida o'rнатiladi?", "image": "1.9.png", "options": ["Faqat A", "Faqat Б", "Б va Г", "Б yoki В"], "answer": 1 },
        { "ticket": 1, "id": 10, "question": "Ushbu yo'l nechta harakatlanish bo'lagiga ega?", "image": "no_image", "options": ["Bitta harakatlanish bo'lagiga", "Ikkita harakatlanish bo'lagiga", "Uchta harakatlanish bo'lagiga"], "answer": 1 },
        { "ticket": 1, "id": 11, "question": "Yo'lda «TO'XTASh», yozuvi ko'rinishidagi yo'l chizig'i nimani bildiradi?", "image": "1.11.png", "options": ["Tartibga solingan chorrahada to'xtash chizig'iga yaqinlashayotganligi haqida ogohlantiradi", "To'xtash chizig'i va «To'xtamasdan harakatlanish taqiqlanadi» yo'l belgisi o'rnatilgan yo'l qismiga yaqinlashayotganligini bildiradi", "«Yo'l bering» yo'l belgisiga yaqinlashayotganligini bildiradi"], "answer": 1 },
        { "ticket": 1, "id": 12, "question": "Qaysi haydovchi to'xtab turish qoidasini buzdi?", "image": "no_image", "options": ["Mototsikl haydovchisi", "Trotuarda to'xtab turgan avtomobil haydovchisi", "Har ikkisi buzdi"], "answer": 2 },
        { "ticket": 1, "id": 13, "question": "Turar joy dahalarida qanday harakatlar taqiqlangan?", "image": "no_image", "options": ["Faqat o'quv mashg'ulotlarini bajarish", "Faqat dvigatel ishlab turganda to'xtab turish", "Barcha sanab o'tilgan hollarda"], "answer": 2 },
        { "ticket": 1, "id": 14, "question": "Transport vositalari qattiq ulagichda shatakka olinganda shatakka olgan va shatakka olingan transport vositalari orasidagi masofa qancha bo'lishi kerak?", "image": "no_image", "options": ["4 metrdan oshmasligi", "4 metrdan 6 metrgacha", "Qoidalarda belgilanmagan"], "answer": 0 },
        { "ticket": 1, "id": 15, "question": "Sanab o'tilgan qaysi holatda transport vositasidan foydalanishga ruxsat etiladi?", "image": "no_image", "options": ["Tashqi yoritgich asboblari ifloslangan bo'lsa", "Yorituvchi chiroq nurining yo'nalishi buzilgan bo'lsa", "Old qismida - oq yoki sariq rangli tumanga qarshi faralar o'rnatilgan bo'lsa"], "answer": 2 },
        { "ticket": 1, "id": 16, "question": "Yo'lning sirpanchiq qismida rul chambaragini keskin burganda hosil bo'ladigan sirpanishning oldini olish uchun haydovchi qanday ehtiyot choralarini ko'rishi kerak?", "image": "1.16.png", "options": ["Rul chambaragini zudlik bilan sirpanayotgan tomonga burish va tezda avtomobilni harakat yo'nalishini to'g'rilab olish", "Ilashmani uzish", "Tormoz tepkisini bosish"], "answer": 0 },
        { "ticket": 1, "id": 17, "question": "Ko'rsatilgan yo'l belgilaridan qaysi biri faqat yo'l qoplamasi nam bo'lganda ta'sir etadi?", "image": "1.17.png", "options": ["Faqat A", "Faqat A va B", "Barchasi"], "answer": 0 },
        { "ticket": 1, "id": 18, "question": "Yuk avtomobili haydovchisi to'xtab turish qoidasini buzdimi?", "image": "no_image", "options": ["Buzdi", "Buzmadi, agar uning ruxsat etilgan to'liq vazni 3,5 tonnadan oshmasa", "Xato qilmadi"], "answer": 0 },
        { "ticket": 1, "id": 19, "question": "Qanday hollarda aholi punktlarida tovush moslamalaridan foydalanishga ruxsat etiladi?", "image": "1.19.png", "options": ["Quvib o'tishda ogohlantirish uchun", "Yo'l-transport hodisasining oldini olish uchun", "Har ikkala sanab o'tilgan hollarda"], "answer": 1 },
        { "ticket": 1, "id": 20, "question": "Ko'rsatilgan qaysi belgilar sizga yashash manzilingizga avtomobilda o'tishga ruxsat beradi?", "image": "no_image", "options": ["Faqat A", "Faqat B", "Faqat A va B", "Barchasi"], "answer": 2 }
    ]
    // Сюда ты сможешь добавлять "2", "3" и так далее по аналогии
};

let currentTicket = "1";
let currentQuestionIndex = 0;

// Генерация кнопок для 15 билетов на главном экране
function initTicketScreen() {
    const grid = document.getElementById('tickets-grid');
    grid.innerHTML = '';
    
    for (let i = 1; i <= 15; i++) {
        const btn = document.createElement('button');
        btn.className = 'ticket-btn';
        btn.innerText = `Билет ${i}`;
        btn.onclick = () => startQuiz(i.toString());
        grid.appendChild(btn);
    }
}

// Запуск теста для выбранного билета
function startQuiz(ticketId) {
    if (!allTickets[ticketId]) {
        alert(`Билет ${ticketId} еще не заполнен данными.`);
        return;
    }
    
    currentTicket = ticketId;
    currentQuestionIndex = 0;
    
    document.getElementById('ticket-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    
    renderQuestion();
}

// Возврат к экрану выбора билетов
function showTicketScreen() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('ticket-screen').classList.remove('hidden');
}

// Отображение текущего вопроса
function renderQuestion() {
    const ticket = allTickets[currentTicket];
    if (!ticket || currentQuestionIndex >= ticket.length) {
        alert("Поздравляем! Вы прошли все вопросы этого билета.");
        showTicketScreen();
        return;
    }

    const q = ticket[currentQuestionIndex];
    
    // Номер текущего вопроса
    document.getElementById('progress-info').innerText = `Вопрос ${currentQuestionIndex + 1} из ${ticket.length}`;
    
    // Текст вопроса
    document.getElementById('question-box').innerText = q.question;

    // Контроль изображений (если no_image — блок чистится)
    const imageBox = document.getElementById('image-box');
    imageBox.innerHTML = '';
    if (q.image && q.image !== "no_image") {
        const img = document.createElement('img');
        img.src = q.image;
        img.alt = `Вопрос ${q.id}`;
        imageBox.appendChild(img);
    }

    // Рендеринг вариантов ответов
    const optionsBox = document.getElementById('options-box');
    optionsBox.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i, q.answer);
        optionsBox.appendChild(btn);
    });
}

// Проверка ответа
function checkAnswer(selectedIndex, correctAnswer) {
    if (selectedIndex === correctAnswer) {
        alert("Правильно!");
        currentQuestionIndex++;
        renderQuestion();
    } else {
        alert("Неправильно! Попробуйте еще раз.");
    }
}

// Старт при полной загрузке страницы
document.addEventListener("DOMContentLoaded", initTicketScreen);
