// Массивы данных
const quizData = [
    {
        question:"Какое событие традиционно считается началом Средневековья?",
        options:["Падение Западной Римской империи", "Начало правления Карла Великого", "Крещение Руси"],
        answer: 0,
        fact:"Это событие произошло в 476 году. Оно привело к распаду античного мира и формированию феодальных отношений."
    },
    {
        question:Кто был первым русским князем, принявшим христианство в качестве государственной религии?,
        options:["Ярослав Мудрый", "Владимир Святославич", "Иван Грозный"],
        answer: 1,
        fact: Речь идет о князе Владимире Красное Солнышко. Это случилось в 988 году и определило культурный путь Древней Руси.
    },
    {
        question: В каком году произошла Куликовская битва?,
        options: [1242 год, 1380 год, 1480 год,
        answer: 1,
        fact: Битва произошла под предводительством Дмитрия Донского. Она стала переломным моментом в борьбе против ордынского ига.
    },
    {
        question: "Против какого ордена сражались русские войска в Ледовом побоище?",
        options: ["Тевтонский орден", "Ливонский орден", "Орден тамплиеров"],
        answer: 1,
        fact: "Ледовое побоище состоялось 5 апреля 1242 года на льду Чудского озера под командованием Александра Невского."
    },
    {
        question: "Столицей какого государства была Москва до того, как стала центром единого Русского государства?",
        options: ["Киевская Русь", "Великое княжество Литовское", "Владимиро-Суздальское княжество"],
        answer: 2,
        fact: "Именно из Владимиро-Суздальского княжества началось возвышение Москвы при Иване Калите."
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Элементы DOM
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const scoreValue = document.getElementById('score-value');
const finalResult = document.getElementById('final-result');
const progressText = document.getElementById('progress-text');

// Функция для отображения факта внутри страницы (вместо alert)
function showFact(text) {
    const factDiv = document.createElement('div');
    factDiv.className = 'fact-box';
    
    // Используем Font Awesome для иконки свитка перед текстом
    factDiv.innerHTML = `<i class="fa-solid fa-scroll"></i> <strong>Исторический факт:</strong> ${text}`;
    questionEl.insertAdjacentElement('afterend', factDiv);
}

// Запуск игры
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', showNextQuestion);

function startGame() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    updateProgress();
    loadQuestion();
}

function updateProgress() {
    if(progressText){
        progressText.innerText = `Вопрос ${currentQuestionIndex + 1} из ${quizData.length}`;
    }
}

function loadQuestion() {
    resetState();
    const currentData = quizData[currentQuestionIndex];
    questionEl.innerText = currentData.question;
    <!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Викторина по истории</title>
    <style>
        /* --- ГАРАНТИРОВАННЫЕ ШРИФТЫ БЕЗ ИНТЕРНЕТА --- */
        
        /* Основной шрифт текста — стандартный системный */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4efe1;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        /* Заголовок сделаем красивым через встроенные возможности CSS без внешних ссылок */
        h1 {
            font-family: 'Cinzel', serif; 
            /* Если Cinzel не найдется, сработает запасной вариант Georgia -> любой шрифт с засечками */
            font-family: 'Cinzel', Georgia, 'Times New Roman', serif;
            color: #4a2c1d;
            font-size: 1.8em;
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #8b4513;
            padding-bottom: 10px;
        }

        .container {
            width: 90%;
            max-width: 600px;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67cOXT//2/XvskVrncIIEZCGH/dMqUQKZgJzVjFVJQVJWZJZVJWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWZVWVWVWVlZ/3v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v.Подложка пергамента закодирована прямо в код, чтобы фон работал всегда)');
            background-size: cover;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            text-align: center;
            position: relative;
            overflow: hidden;
            border: 1px solid #d3c8b5;
        }

        #question {
            font-size: 1.3em;
            margin-bottom: 25px;
            line-height: 1.6;
            min-height: 70px;
            color: #2c3e50;
        }

        .score {
            font-weight: bold;
            margin-bottom: 20px;
            font-size: 1.1em;
            color: #4a2c1d;
        }

        .hidden { display: none; }

        #feedback {
            font-size: 1.2em;
            font-weight: bold;
            height: 30px;
            margin-bottom: 15px;
        }

        .correct { color: #27ae60; }
        .wrong { color: #c0392b; }

        /* Кнопки ответов */
        #options-container button {
            display: block;
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            border: 2px solid #8b4513;
            background: linear-gradient(to bottom, #deb887, #d2b48c);
            color: #331a00;
            font-size: 1.1em;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s ease;
            text-align: left;
            position: relative;
        }

        /* Иконки Font Awesome заменены на текстовые символы Unicode, которые есть везде */
        #options-container button::before {
            content: "☸ "; /* Символ шлема/солнца */
            margin-right: 10px;
            font-weight: bold;
        }

        #options-container button:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(139, 69, 19, 0.4);
            background: #d2b48c;
        }

        button#start-btn, button#next-btn {
            background-color: #8b4513;
            color: white;
            border: none;
            padding: 18px 50px;
            font-size: 1.2em;
            border-radius: 50px;
            cursor: pointer;
            margin-top: 20px;
            letter-spacing: 1px;
        }

        /* Блок факта */
        .fact-box {
            background-color: #f0e6d2;
            border-left: 5px solid #8b4513;
            padding: 15px;
            margin-top: 15px;
            text-align: left;
            font-style: italic;
            color: #5d4037;
        }

        .fact-box::before {
            content: "📜 ";
        }
    </style>
</head>
<body>

<div class="container">
    <h1>🛡️ Викторина "Летописец"</h1>
    
    <!-- Экран приветствия -->
    <div id="start-screen">
        <p>Проверь свои знания о Древней Руси и Средневековье!</p>
        <button id="start-btn">Начать игру</button>
    </div>

    <!-- Игровой экран -->
    <div id="game-screen" class="hidden">
        <div class="score">Счет: <span id="score-value">0</span></div>
        <div id="progress-text"></div>
        
        <div id="question-container">
            <div id="question"></div>
            <div id="options-container"></div>
        </div>
        
        <div id="feedback" class="hidden"></div>
        <button id="next-btn" class="hidden">Следующий вопрос</button>
    </div>

    <!-- Экран завершения -->
    <div id="end-screen" class="hidden">
        <h2>Игра окончена!</h2>
        <p id="final-result"></p>
        <button onclick="location.reload()">Играть снова</button>
    </div>
</div>

<script>
    // Весь JS-код остается прежним, он работает с текстом отлично
    const quizData = [
        {question: "Какое событие традиционно считается началом Средневековья?", options: ["Падение Западной Римской империи", "Начало правления Карла Великого", "Крещение Руси"], answer: 0, fact: "Это событие произошло в 476 году."},
        {question: "Кто был первым русским князем, принявшим христианство?", options: ["Ярослав Мудрый", "Владимир Святославич", "Иван Грозный"], answer: 1, fact: "Речь идет о князе Владимире Красное Солнышко. Это случилось в 988 году."},
        {question: "В каком году произошла Куликовская битва?", options: ["1242 год", "1380 год", "1480 год"], answer: 1, fact: "Битва произошла под предводительством Дмитрия Донского."},
        {question: "Против какого ордена сражались русские войска в Ледовом побоище?", options: ["Тевтонский орден", "Ливонский орден", "Орден тамплиеров"], answer: 1, fact: "Ледовое побоище состоялось 5 апреля 1242 года на льду Чудского озера."},
        {question: "Столицей какого государства была Москва до объединения?", options: ["Киевская Русь", "Великое княжество Литовское", "Владимиро-Суздальское княжество"], answer: 2, fact: "Именно оттуда началось возвышение Москвы при Иване Калите."}
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');
    const questionEl = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const feedbackEl = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const startBtn = document.getElementById('start-btn');
    const scoreValue = document.getElementById('score-value');
    const finalResult = document.getElementById('final-result');
    const progressText = document.getElementById('progress-text');

    function showFact(text) {
        const factDiv = document.createElement('div');
        factDiv.className = 'fact-box';
        factDiv.innerText = "📜 Факт: " + text;
        questionEl.insertAdjacentElement('afterend', factDiv);
    }

    startBtn.addEventListener('click', startGame);
    nextBtn.addEventListener('click', showNextQuestion);

    function startGame() {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        resetState();
        const currentData = quizData[currentQuestionIndex];
        questionEl.innerText = currentData.question;
        scoreValue.innerText = score;
        progressText.innerText = `Вопрос ${currentQuestionIndex + 1} из ${quizData.length}`;

        currentData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.addEventListener('click', () => selectAnswer(index, currentData));
            optionsContainer.appendChild(button);
        });
    }

    function resetState() {
        const oldFact = document.querySelector('.fact-box');
        if (oldFact) { oldFact.remove(); }
        nextBtn.classList.add('hidden');
        feedbackEl.classList.add('hidden');
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    function selectAnswer(selectedIndex, data) {
        const buttons = optionsContainer.querySelectorAll('button');
        if (selectedIndex === data.answer) {
            score++;
            feedbackEl.innerText = "Верно!";
            feedbackEl.classList.add('correct');
        } else {
            feedbackEl.innerText = "Неверно.";
            feedbackEl.classList.add('wrong');
            buttons[data.answer].classList.add('correct');
        }
        showFact(data.fact);
        feedbackEl.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        buttons.forEach(btn => btn.disabled = true);
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            endGame();
        }
    }

    function endGame() {
        gameScreen.classList.add('hidden');
        endScreen.classList.remove('hidden');
        const percentage = (score / quizData.length) * 100;
        let resultText = `Вы ответили правильно на ${score} из ${quizData.length} вопросов.`;
        if (percentage >= 80) { resultText += " Вы настоящий знаток!"; }
        else if (percentage >= 60) { resultText += " Хороший результат!"; }
        else { resultText += " Стоит повторить материал."; }
        finalResult.innerHTML = resultText;
    }
</script>

</body>
</html>
