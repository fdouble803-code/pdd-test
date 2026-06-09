const allTickets = {
    "1": [
        { "ticket": 1, "id": 1, "question": "Svetaforning yashil miltillovchi ishorasi nimani bildiradi?", "image": "no_image", "options": ["Svetafor nosozligini", "Harakatga ruxsat beradi va tez orada taqiqlovchi ishora yonishi to'g'risida axborot beradi", "Harakatni davom ettirishni taqiqlaydi"], "answer": 1 },
        { "ticket": 1, "id": 2, "question": "Ushbu joyda avtomobilni to'xtab turish uchun qo'yishga ruxsat etiladimi?", "image": "1.2.png", "options": ["Ha", "Yo'q"], "answer": 1 },
        { "ticket": 1, "id": 3, "question": "Siz chorrahadan to'g'riga o'tmoqchisiz. Ushbu vaziyatda Sizning harakatingiz?", "image": "1.3.png", "options": ["Chorrahaga birinchi kirgan qizil avtomobilga yo'l berish", "Qizil avtomobil yo'l berayotganiga ishonch xosil qilib chorrahadan birinchi o'tish"], "answer": 1 },
        { "ticket": 1, "id": 4, "question": "Siz chorrahadan chapga burilmoqchisiz. Ushbu vaziyatda kimga yo'l berasiz?", "image": "1.4.png", "options": ["Faqat avtobusga", "Faqat qizil avtomobilga", "Hech kimga"], "answer": 2 },
        { "ticket": 1, "id": 5, "question": "Qaysi hollarda yo'lning harakatlanish bo'lagini ajratuvchi uzuq-uzuq chiziqni bosib o'tish mumkin?", "image": "no_image", "options": ["Faqat qayta tizilishda", "Yo'lda boshqa transport vositalari bo'lmasa", "Barcha sanab o'tilgan hollarda"], "answer": 0 },
        { "ticket": 1, "id": 6, "question": "Ushbu ko'rsatilgan holatda mototsikl haydovchisi sizga yo'l berishi kerakmi?", "image": "1.6.png", "options": ["Yo'q", "Ha"], "answer": 1 },
        { "ticket": 1, "id": 7, "question": "Sanab o'tilgan qaysi hollarda egiluvchan ulagichda shatakka olish taqiqlanadi?", "image": "no_image", "options": ["Faqat tog'li yo'llarda", "Yo'l yaxmalak, sirpanchiq bo'lgan hollarda", "Kunning qorong'i vaqtida va etarli ko'rinmaslik sharoitida", "Barcha sanab o'tilgan hollarda"], "answer": 1 },
        { "ticket": 1, "id": 8, "question": "Ushbu belgilardan qaysi biri bir tomonlama harakat tashkil qilingan yo'lning boshida o'rnatiladi?", "image": "1.8.png", "options": ["Faqat A", "Faqat Б", "Б va Г", "Б yoki В"], "answer": 1 },
        { "ticket": 1, "id": 9, "question": "Ushbu yo'l nechta harakatlanish bo'lagiga ega?", "image": "1.9.png", "options": ["Bitta harakatlanish bo'lagiga", "Ikkita harakatlanish bo'lagiga", "Uchta harakatlanish bo'lagiga"], "answer": 1 },
        { "ticket": 1, "id": 10, "question": "Yo'lda «TO'XTASh», yozuvi ko'rinishidagi yo'l chizig'i nimani bildiradi?", "image": "no_image", "options": ["Tartibga solingan chorrahada to'xtash chizig'iga yaqinlashayotganligi haqida ogohlantiradi", "To'xtash chizig'i va «To'xtamasdan harakatlanish taqiqlanadi» yo'l belgisi o'rnatilgan yo'l qismiga yaqinlashayotganligini bildiradi", "«Yo'l bering» yo'l belgisiga yaqinlashayotganligini bildiradi"], "answer": 1 },
        { "ticket": 1, "id": 11, "question": "Qaysi haydovchi to'xtab turish qoidasini buzdi?", "image": "1.11.png", "options": ["Mototsikl haydovchisi", "Trotuarda to'xtab turgan avtomobil haydovchisi", "Har ikkisi buzdi"], "answer": 2 },
        { "ticket": 1, "id": 12, "question": "Turar joy dahalarida qanday harakatlar taqiqlangan?", "image": "no_image", "options": ["Faqat o'quv mashg'ulotlarini bajarish", "Faqat dvigatel ishlab turganda to'xtab turish", "Barcha sanab o'tilgan hollarda"], "answer": 2 },
        { "ticket": 1, "id": 13, "question": "Transport vositalari qattiq ulagichda shatakka olinganda shatakka olgan va shatakka olingan transport vositalari orasidagi masofa qancha bo'lishi kerak?", "image": "no_image", "options": ["4 metrdan oshmasligi", "4 metrdan 6 metrgacha", "Qoidalarda belgilanmagan"], "answer": 0 },
        { "ticket": 1, "id": 14, "question": "Sanab o'tilgan qaysi holatda transport vositasidan foydalanishga ruxsat etiladi?", "image": "no_image", "options": ["Tashqi yoritgich asboblari ifloslangan bo'lsa", "Yorituvchi chiroq nurining yo'nalishi buzilgan bo'lsa", "Old qismida - oq yoki sariq rangli tumanga qarshi faralar o'rnatilgan bo'lsa"], "answer": 2 },
        { "ticket": 1, "id": 15, "question": "Yo'lning sirpanchiq qismida rul chambaragini keskin burganda hosil bo'ladigan sirpanishning oldini olish uchun haydovchi qanday ehtiyot choralarini ko'rishi kerak?", "image": "no_image", "options": ["Rul chambaragini zudlik bilan sirpanayotgan tomonga burish va tezda avtomobilni harakat yo'nalishini to'g'rilab olish", "Ilashmani uzish", "Tormoz tepkisini bosish"], "answer": 0 },
        { "ticket": 1, "id": 16, "question": "Ko'rsatilgan yo'l belgilaridan qaysi biri faqat yo'l qoplamasi nam bo'lganda ta'sir etadi?", "image": "1.16.png", "options": ["Faqat A", "Faqat A va B", "Barchasi"], "answer": 0 },
        { "ticket": 1, "id": 17, "question": "Yuk avtomobili haydovchisi to'xtab turish qoidasini buzdimi?", "image": "1.17.png", "options": ["Buzdi", "Buzmadi, agar uning ruxsat etilgan to'liq vazni 3,5 tonnadan oshmasa", "Xato qilmadi"], "answer": 0 },
        { "ticket": 1, "id": 18, "question": "Qanday hollarda aholi punktlarida tovush moslamalaridan foydalanishga ruxsat etiladi?", "image": "no_image", "options": ["Quvib o'tishda ogohlantirish uchun", "Yo'l-transport hodisasining oldini olish uchun", "Har ikkala sanab o'tilgan hollarda"], "answer": 1 },
        { "ticket": 1, "id": 19, "question": "Ko'rsatilgan qaysi belgilar sizga yashash manzilingizga avtomobilda o'tishga ruxsat beradi?", "image": "1.19.png", "options": ["Faqat A", "Faqat B", "Faqat A va B", "Barchasi"], "answer": 2 },
        { "ticket": 1, "id": 20, "question": "Sariq rangli miltillovchi ishora nimani bildiradi?", "image": "no_image", "options": ["Harakatni taqiqlaydi", "Chorrahani yoki yo'lning xavfli qismini tartibga solinmaganligini bildiradi va harakat qatnashchilarini ogohlantiradi", "Faqat piyodalarga yo'l berish kerakligini bildiradi"], "answer": 1 }
    ],
  "2": [
    {
      "ticket": 2,
      "id": 1,
      "question": "Ko'rsatilgan belgilardan qaysi biri yo'lning ko'rinish masofasi cheklangan joylarda majburan to'xtagan transport vositalarini belgilash uchun qo'llaniladi?",
      "image": "2.1.png",
      "options": ["«A»", "«B»", "«V»"],
      "answer": 0
    },
    {
      "ticket": 2,
      "id": 2,
      "question": "Haydovchi chapga burilishda qaysi yo'nalish bo'yicha qoidani buzmoqda?",
      "image": "2.2.png",
      "options": ["Faqat «A» yo'nalishi bo'yicha", "Faqat «B» yo'nalishi bo'yicha", "Ko'rsatilgan barcha yo'nalish bo'yicha"],
      "answer": 2
    },
    {
      "ticket": 2,
      "id": 3,
      "question": "Ushbu ko'rsatilgan vaziyatda sizga hovliga orqa bilan kirib qayrilib olishga ruxsat beriladimi?",
      "image": "2.3.png",
      "options": ["Har qanday hollarda ruxsat beriladi", "Ruxsat beriladi agarda bunda harakatning boshqa ishtirokchilariga halaqit berilmasa", "Taqiqlanadi"],
      "answer": 1
    },
    {
      "ticket": 2,
      "id": 4,
      "question": "Yo'l harakati qoidalari bo'yicha «yonlama oraliq masofa»ni ko'rsating:",
      "image": "2.4.png",
      "options": ["Faqat «A»", "Faqat «B»", "Faqat «V»", "«A» va «V»"],
      "answer": 3
    },
    {
      "ticket": 2,
      "id": 5,
      "question": "Tumanga qarshi chiroqlar va orqa tumanga qarshi chiroqlar birga yoqilishi mumkin?",
      "image": "no_image",
      "options": ["Cheklangan ko'rinish sharoitida", "Etarlicha ko'rinmaslik sharoitida"],
      "answer": 1
    },
    {
      "ticket": 2,
      "id": 6,
      "question": "Agar avtomobil antiblokirovkali (ABS) tormoz tizimi bilan jihozlangan bo'lsa keskin tormoz berishni qanday amalga oshirish kerak?",
      "image": "no_image",
      "options": ["Tormoz tepkisini uzub-uzub bosish yo'li bilan", "Tormoz tepkisini oxirigacha bosish va avtomobilni to'liq to'xtaguncha tepkini qo'yib yubormaslik", "To'xtab turish tormozi tizimini qo'llash yo'li bilan"],
      "answer": 1
    },
    {
      "ticket": 2,
      "id": 7,
      "question": "Haydovchiga transport vositasini boshqarish vaqtida telefondan foydalanishga ruxsat etiladimi?",
      "image": "no_image",
      "options": ["Ruxsat etiladi", "Qo'lni ishlatmasdan texnik vositalardan foydalanish gaplashishga ruxsat etiladi", "20 km/s tezlikda harakatlanayotganda ruxsat etiladi"],
      "answer": 1
    },
    {
      "ticket": 2,
      "id": 8,
      "question": "Ushbu yo'l belgisi chorrahaga yaqinlashayotganlik to'g'risida ogohlantiradi, bunda Siz:",
      "image": "2.8.png",
      "options": ["Birinchi bo'lib o'tish huquqiga egasiz", "Kesib o'tayotgan yo'ldagi transport vositalariga yo'l berishingiz kerak", "Faqatgina o'ng tomondan yaqinlashib kelayotgan transport vositalariga yo'l berishingiz kerak"],
      "answer": 2
    },
    {
      "ticket": 2,
      "id": 9,
      "question": "Shatakka olib harakatlanishingiz mumkin:",
      "image": "2.9.png",
      "options": ["Faqat «A» yo'nalishi bo'yicha", "Faqat «B» yo'nalishi bo'yicha", "Ko'rsatilgan barcha yo'nalish bo'yicha"],
      "answer": 0
    },
    {
      "ticket": 2,
      "id": 10,
      "question": "Ko'rsatilgan qaysi belgi reversiv harakat boshlanishi haqida axborot beradi?",
      "image": "2.10.png",
      "options": ["«A»", "«B»", "«V»"],
      "answer": 2
    },
    {
      "ticket": 2,
      "id": 11,
      "question": "Sizga ruxsat etilgan to'la vazni 3,5 tonnadan ortiq yuk avtomobilida harakatlanish:",
      "image": "no_image",
      "options": ["Faqat to'g'riga", "To'g'riga va o'ngga", "Barcha yo'nalishlarda"],
      "answer": 0
    },
    {
      "ticket": 2,
      "id": 12,
      "question": "M3 toifadagi avtotransport vositalarining boshqaruv qurilmasidagi qanday eng katta lyuft yig'indisiga yo'l qo'yiladi:",
      "image": "no_image",
      "options": ["10°", "20°", "25°"],
      "answer": 1
    },
    {
      "ticket": 2,
      "id": 13,
      "question": "Ushbu belgi axborot beradi:",
      "image": "no_image",
      "options": ["Siz o'ngga yoki chapga burilishingiz kerakligini ko'rsatadi", "Reversiv harakatlanish yo'liga chiqish haqida", "Chorrahadan o'ngga va chapga bir tomonlama harakat tashkil qilingan"],
      "answer": 1
    },
    {
      "ticket": 2,
      "id": 14,
      "question": "Ushbu yo'l chizig'i sizga qanday manyovr bajarishni taqiqlaydi?",
      "image": "2.14.png",
      "options": ["Quvib o'tishni", "Aylanib o'tishni", "Qayralib olishni", "Sanab o'tilgan barcha manevrlarga ruxsat beriladi"],
      "answer": 3
    },
    {
      "ticket": 2,
      "id": 15,
      "question": "Svetafor ishoralari qaysi guruh yo'l belgilarini bekor qiladi (miltillovchi sariq ishoradan tashqari)?",
      "image": "no_image",
      "options": ["Imtiyoz belgilari", "Taqiqlovchi belgilar", "Buyuruvchi belgilar", "Barcha sanab o'tilganlari"],
      "answer": 0
    },
    {
      "ticket": 2,
      "id": 16,
      "question": "Kunning yorug' vaqtida aholi punktlarida quvib o'tilayotgan transport vositasi haydovchisining e'tiborini jalb qilish uchun mumkin:",
      "image": "no_image",
      "options": ["Tovush signalidan foydalanish", "Faqat yaqinni yorituvchi chiroqni uzoqni yorituvchi chiroqqa qisqa muddat orasida o'tkazish bilan ishora berish", "Faqat birgalikda yorug'lik ishoralari bilan birga tovush signallarini qo'llash", "Sanab o'tilganlarning barchasidan foydalanish"],
      "answer": 1
    },
    {
      "ticket": 2,
      "id": 17,
      "question": "Qaysi hollarda transport vositasidan foydalanish taqiqlanadi?",
      "image": "no_image",
      "options": ["Yonilg'i darajasini ko'rsatish qurilmasi ishlamaydi", "O't oldirish tizimi nosoz", "Dvigatel qiyinchilik bilan ishga tushadi", "Tovush signallari ishlamaydi"],
      "answer": 3
    },
    {
      "ticket": 2,
      "id": 18,
      "question": "72 km/soat tezlikda harakatlanayotgan transport vositasi 1 sekundda qancha masofani bosib o'tadi?",
      "image": "no_image",
      "options": ["15 m", "20 m", "25 m"],
      "answer": 1
    },
    {
      "ticket": 2,
      "id": 19,
      "question": "Qaysi yo'nalishda harakatlanishni davom ettirishingiz mumkin?",
      "image": "no_image",
      "options": ["Faqat chapga", "Chapga va orqaga qayrilib olishga", "O'ngga, chapga va orqaga qayrilib olishga"],
      "answer": 2
    },
    {
      "ticket": 2,
      "id": 20,
      "question": "Yo'l-transport hodisasi sodir bo'lganda haydovchi birinchi navbatda nima qilishga majbur?",
      "image": "no_image",
      "options": ["Transport vositasini zudlik bilan to'xtatishi, avariya ishoratlarini yoqishi va avariya to'xtash belgisini o'rnatishi", "Zudlik bilan tez yordam yoki militsiya chaqirishi", "Yo'lovchilarni tushirishi va harakatni davom ettirishi"],
      "answer": 0
    }
  ],
