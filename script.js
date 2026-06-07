// Barcha biletlar va o'zbek tilidagi xatosiz savollar bazasi
const allTickets = {
    "1": [
        { "ticket": 1, "id": 1, "question": "Svetaforning yashil miltillovchi ishorasi nimani bildiradi?", "image": "no_image", "options": ["Svetafor nosozligini", "Harakatga ruxsat beradi va tez orada taqiqlovchi ishora yonishi to'g'risida axborot beradi", "Harakatni davom ettirishni taqiqlaydi"], "answer": 1 },
        { "ticket": 1, "id": 2, "question": "Ushbu joyda avtomobilni to'xtab turish uchun qo'yishga ruxsat etiladimi?", "image": "1.2.png", "options": ["Ha", "Yo'q"], "answer": 1 },
        { "ticket": 1, "id": 3, "question": "Siz chorrahadan to'g'riga o'tmoqchisiz. Ushbu vaziyatda Sizning harakatingiz?", "image": "1.3.png", "options": ["Chorrahaga birinchi kirgan qizil avtomobilga yo'l berish", "Qizil avtomobil yo'l berayotganiga ishonch xosil qilib chorrahadan birinchi o'tish"], "answer": 1 },
        { "ticket": 1, "id": 4, "question": "Siz chorrahadan chapga burilmoqchisiz. Ushbu vaziyatda kimga yo'l berasiz?", "image": "no_image", "options": ["Faqat avtobusga", "Faqat qizil avtomobilga", "Hech kimga"], "answer": 2 },
        { "ticket": 1, "id": 5, "question": "Qaysi hollarda yo'lning harakatlanish bo'lagini ajratuvchi uzuq-uzuq chiziqni bosib o'tish mumkin?", "image": "1.5.png", "options": ["Faqat qayta tizilishda", "Yo'lda boshqa transport vositalari bo'lmasa", "Barcha sanab o'tilgan hollarda"], "answer": 0 },
        { "ticket": 1, "id": 6, "question": "Ushbu ko'rsatilgan holatda mototsikl haydovchisi sizga yo'l berishi kerakmi?", "image": "no_image", "options": ["Yo'q", "Ha"], "answer": 1 },
        { "ticket": 1, "id": 7, "question": "Sanab o'tilgan qaysi hollarda egiluvchan ulagichda shatakka olish taqiqlanadi?", "image": "1.7.png", "options": ["Faqat tog'li yo'llarda", "Yo'l yaxmalak, sirpanchiq bo'lgan hollarda", "Kunning qorong'i vaqtida va etarli ko'rinmaslik sharoitida", "Barcha sanab o'tilgan hollarda"], "answer": 1 },
        { "ticket": 1, "id": 8, "question": "Ushbu belgilardan qaysi biri bir tomonlama harakat tashkil qilingan yo'lning boshida o'rnatiladi?", "image": "1.8.png", "options": ["Faqat A", "Faqat Б", "Б va Г", "Б yoki В"], "answer": 1 },
        { "ticket": 1, "id": 9, "question": "Ushbu yo'l nechta harakatlanish bo'lagiga ega?", "image": "no_image", "options": ["Bitta harakatlanish bo'lagiga", "Ikkita harakatlanish bo'lagiga", "Uchta harakatlanish bo'lagiga"], "answer": 1 },
        { "ticket": 1, "id": 10, "question": "Yo'lda «TO'XTASh», yozuvi ko'rinishidagi yo'l chizig'i nimani bildiradi?", "image": "1.10.png", "options": ["Tartibga solingan chorrahada to'xtash chizig'iga yaqinlashayotganligi haqida ogohlantiradi", "To'xtash chizig'i va «To'xtamasdan harakatlanish taqiqlanadi» yo'l belgisi o'rnatilgan yo'l qismiga yaqinlashayotganligini bildiradi", "«Yo'l bering» yo'l belgisiga yaqinlashayotganligini bildiradi"], "answer": 1 },
        { "ticket": 1, "id": 11, "question": "Qaysi haydovchi to'xtab turish qoidasini buzdi?", "image": "no_image", "options": ["Mototsikl haydovchisi", "Trotuarda to'xtab turgan avtomobil haydovchisi", "Har ikkisi buzdi"], "answer": 2 },
        { "ticket": 1, "id": 12, "question": "Turar job dahalarida qanday harakatlar taqiqlangan?", "image": "no_image", "options": ["Faqat o'quv mashg'ulotlarini bajarish", "Faqat dvigatel ishlab turganda to'xtab turish", "Barcha sanab o'tilgan hollarda"], "answer": 2 },
        { "ticket": 1, "id": 13, "question": "Transport vositalari qattiq ulagichda shatakka olinganda shatakka olgan va shatakka olingan transport vositalari orasidagi masofa qancha bo'lishi kerak?", "image": "no_image", "options": ["4 metrdan oshmasligi", "4 metrdan 6 metrgacha", "Qoidalarda belgilanmagan"], "answer": 0 },
        { "ticket": 1, "id": 14, "question": "Sanab o'tilgan qaysi holatda transport vositasidan foydalanishga ruxsat etiladi?", "image": "no_image", "options": ["Tashqi yoritgich asboblari ifloslangan bo'lsa", "Yorituvchi chiroq nurining yo'nalishi buzilgan bo'lsa", "Old qismida - oq yoki sariq rangli tumanga qarshi faralar o'rnatilgan bo'lsa"], "answer": 2 },
        { "ticket": 1, "id": 15, "question": "Yo'lning sirpanchiq qismida rul chambaragini keskin burganda hosil bo'ladigan sirpanishning oldini olish uchun haydovchi qanday ehtiyot choralarini ko'rishi kerak?", "image": "1.15.png", "options": ["Rul chambaragini zudlik bilan sirpanayotgan tomonga burish va tezda avtomobilni harakat yo'nalishini to'g'rilab olish", "Ilashmani uzish", "Tormoz tepkisini bosish"], "answer": 0 },
        { "ticket": 1, "id": 16, "question": "Ko'rsatilgan yo'l belgilaridan qaysi biri faqat yo'l qoplamasi nam bo'lganda ta'sir etadi?", "image": "1.16.png", "options": ["Faqat A", "Faqat A va B", "Barchasi"], "answer": 0 },
        { "ticket": 1, "id": 17, "question": "Yuk avtomobili haydovchisi to'xtab turish qoidasini buzdimi?", "image": "no_image", "options": ["Buzdi", "Buzmadi, agar uning ruxsat etilgan to'liq vazni 3,5 tonnadan oshmasa", "Xato qilmadi"], "answer": 0 },
        { "ticket": 1, "id": 18, "question": "Qanday hollarda aholi punktlarida tovush moslamalaridan foydalanishga ruxsat etiladi?", "image": "1.18.png", "options": ["Quvib o'tishda ogohlantirish uchun", "Yo'l-transport hodisasining oldini olish uchun", "Har ikkala sanab o'tilgan hollarda"], "answer": 1 },
        { "ticket": 1, "id": 19, "question": "Ko'rsatilgan qaysi belgilar sizga yashash manzilingizga avtomobilda o'tishga ruxsat beradi?", "image": "no_image", "options": ["Faqat A", "Faqat B", "Faqat A va B", "Barchasi"], "answer": 2 },
        { "ticket": 1, "id": 20, "question": "Sariq rangli miltillovchi ishora nimani bildiradi?", "image": "1.20.png", "options": ["Harakatni taqiqlaydi", "Chorrahani yoki yo'lning xavfli qismini tartibga solinmaganligini bildiradi va harakat qatnashchilarini ogohlantiradi", "Faqat piyodalarga yo'l berish kerakligini bildiradi"], "answer": 1 }
    ]
};

(function() {
    // Telegram WebApp integratsiyasi
    var tg = window.Telegram ? window.Telegram.WebApp : null;
    if (tg) tg.expand();

    var currentTicketNum = "1";
    var currentIndex = 0;
    var correctCount = 0, incorrectCount = 0;
    var timerInterval, timeLeft = 1200;

    // DOM ob'ektlarini aniqlash
    var tabsContainer = document.getElementById("tickets-tabs-container");
    var numsContainer = document.getElementById("questions-nums-container");
    var questionTextBox = document.getElementById("question-text-box");
    var questionImageBox = document.getElementById("question-image-box");
    var questionOptionsBox = document.getElementById("question-options-box");
    var timerDisplay = document.getElementById("timer-display");
    var correctDisplay = document.getElementById("correct-display");
    var incorrectDisplay = document.getElementById("incorrect-display");

    // 1-15 bilet tugmalarini yaratish
    function initTabs() {
        tabsContainer.innerHTML = "";
        for (let i = 1; i <= 15; i++) {
            var btn = document.createElement("button");
            btn.className = "ticket-tab" + (String(i) === currentTicketNum ? " active" : "");
            btn.innerText = i + "-Bilet";
            btn.onclick = function() {
                switchTicket(String(i));
            };
            tabsContainer.appendChild(btn);
        }
    }

    // Chap tarafdagi 1-20 tugmalarini yangilash
    function updateSidebar() {
        numsContainer.innerHTML = "";
        var ticket = allTickets[currentTicketNum] || [];
        ticket.forEach((_, idx) => {
            var btn = document.createElement("button");
            btn.className = "q-num-btn" + (idx === currentIndex ? " active" : "");
            btn.innerText = idx + 1;
            btn.onclick = function() {
                currentIndex = idx;
                renderQuestion();
                updateSidebar();
            };
            numsContainer.appendChild(btn);
        });
    }

    // Biletni o'zgartirish funksiyasi
    function switchTicket(ticketId) {
        if (!allTickets[ticketId]) {
            alert(ticketId + "-bilet ma'lumotlari hali kiritilmagan.");
            return;
        }
        currentTicketNum = ticketId;
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        timeLeft = 1200; // Taymerni qayta tiklash

        correctDisplay.innerText = "To'g'ri: 0";
        incorrectDisplay.innerText = "Noto'g'ri: 0";

        initTabs();
        startTimer();
        renderQuestion();
        updateSidebar();
    }

    // Taymer hisoblagichi (20 daqiqa)
    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            var m = Math.floor(timeLeft / 60);
            var s = timeLeft % 60;
            if (timerDisplay) {
                timerDisplay.innerText = "Vaqt: " + m + ":" + (s < 10 ? "0" : "") + s;
            }
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Vaqtingiz tugadi!");
            }
        }, 1000);
    }

    // Savolni kartaga chiroyli chiqarish va rasmlarni tekshirish
    function renderQuestion() {
        var ticket = allTickets[currentTicketNum];
        if (!ticket || !ticket[currentIndex]) return;

        var q = ticket[currentIndex];
        
        // Savol matni
        questionTextBox.innerText = currentTicketNum + "-Bilet | Savol: " + (currentIndex + 1) + "\n\n" + q.question;
        
        // Rasm blokini boshqarish (no_image bo'lsa yashiriladi)
        questionImageBox.innerHTML = "";
        if (q.image && q.image !== "no_image") {
            questionImageBox.style.display = "block";
            var img = document.createElement("img");
            img.src = q.image;
            img.alt = "Savol " + q.id;
            questionImageBox.appendChild(img);
        } else {
            questionImageBox.style.display = "none";
        }

        // Javob variantlari tugmalarini yaratish
        questionOptionsBox.innerHTML = "";
        q.options.forEach((opt, idx) => {
            var btn = document.createElement("button");
            btn.className = "option-item";
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(idx, q.answer, btn);
            questionOptionsBox.appendChild(btn);
        });
    }

    // Javobni tekshirish va yashil/qizil ranglar bilan vizual effekt berish
    function checkAnswer(selectedIndex, correctAnswerIndex, clickedBtn) {
        var buttons = questionOptionsBox.querySelectorAll(".option-item");
        buttons.forEach(b => b.disabled = true); // Qolgan tugmalarni vaqtincha bloklash

        if (selectedIndex === correctAnswerIndex) {
            clickedBtn.style.backgroundColor = "#10b981"; // To'g'ri (Yashil)
            clickedBtn.style.borderColor = "#10b981";
            clickedBtn.style.color = "#ffffff";
            correctCount++;
            correctDisplay.innerText = "To'g'ri: " + correctCount;
            setTimeout(goToNext, 500);
        } else {
            clickedBtn.style.backgroundColor = "#ef4444"; // Noto'g'ri (Qizil)
            clickedBtn.style.borderColor = "#ef4444";
            clickedBtn.style.color = "#ffffff";
            
            // To'g'ri javobni ham yashil qilib ochib berish
            if (buttons[correctAnswerIndex]) {
                buttons[correctAnswerIndex].style.backgroundColor = "#10b981";
                buttons[correctAnswerIndex].style.borderColor = "#10b981";
                buttons[correctAnswerIndex].style.color = "#ffffff";
            }
            incorrectCount++;
            incorrectDisplay.innerText = "Noto'g'ri: " + incorrectCount;
            setTimeout(goToNext, 1200);
        }
    }

    // Keyingi savolga o'tish
    function goToNext() {
        var ticket = allTickets[currentTicketNum];
        currentIndex++;
        if (currentIndex < ticket.length) {
            renderQuestion();
            updateSidebar();
        } else {
            clearInterval(timerInterval);
            alert("Bilet yakunlandi!\n\nTo'g'ri javoblar soni: " + correctCount + "\nNoto'g'ri javoblar soni: " + incorrectCount);
        }
    }

    // Sahifa yuklanganda tizimni avtomatik ishga tushirish
    initTabs();
    startTimer();
    renderQuestion();
    updateSidebar();
})();
