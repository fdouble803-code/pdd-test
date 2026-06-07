// Test bazasi (barcha biletlar shu yerda bo'ladi)
const allTickets = {
    "1": [
        { "ticket": 1, "id": 1, "question": "Avtomobil qaysi yo'nalishlarda harakatlanishi mumkin?", "image": "no_image", "options": ["Faqat o'ngga", "To'xtash va svetoforning yashil chirog'ini kutish", "Faqat to'g'riga", "Barcha yo'nalishlar bo'yicha"], "answer": 3 },
        { "ticket": 1, "id": 2, "question": "Svetaforning yashil miltillovchi ishorasi nimani bildiradi?", "image": "1.2.png", "options": ["Svetafor nosozligini", "Harakatga ruxsat beradi va tez orada taqiqlovchi ishora yonishi to'g'risida axborot beradi", "Harakatni davom ettirishni taqiqlaydi"], "answer": 1 },
        // ... qolgan 18 ta savolni shu yerga qo'shib borasan
    ],
    "2": [
        // 2-bilet savollari
    ]
};

let currentTicket = "1";
let currentQuestionIndex = 0;

function renderQuestion() {
    const ticket = allTickets[currentTicket];
    if (!ticket || !ticket[currentQuestionIndex]) return;

    const q = ticket[currentQuestionIndex];
    const container = document.getElementById('question-box');
    const optionsBox = document.getElementById('options-box');

    // Savol matni
    container.innerHTML = `<h3>${q.question}</h3>`;

    // Rasm tekshiruvi
    if (q.image !== "no_image") {
        container.innerHTML += `<img src="${q.image}" alt="Rasm" style="max-width:100%; border-radius:8px;">`;
    }

    // Variantlar
    optionsBox.innerHTML = q.options.map((opt, i) => `
        <button class="option-btn" onclick="checkAnswer(${i}, ${q.answer})">
            ${opt}
        </button>
    `).join('');
}

function checkAnswer(selectedIndex, correctAnswer) {
    if (selectedIndex === correctAnswer) {
        alert("To'g'ri!");
        currentQuestionIndex++;
        renderQuestion();
    } else {
        alert("Noto'g'ri, qayta urinib ko'ring.");
    }
}

// Boshlang'ich yuklash
document.addEventListener("DOMContentLoaded", renderQuestion);
