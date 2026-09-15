// Массивы данных
const quizData = [
    {
        question: "Какое событие традиционно считается началом Средневековья?",
        options: ["Падение Западной Римской империи", "Начало правления Карла Великого", "Крещение Руси"],
        answer: 0,
        fact: "Это событие произошло в 476 году. Оно привело к распаду античного мира и формированию феодальных отношений."
    },
    {
        question: "Кто был первым русским князем, принявшим христианство в качестве государственной религии?",
        options: ["Ярослав Мудрый", "Владимир Святославич", "Иван Грозный"],
        answer: 1,
        fact: "Речь идет о князе Владимире Красное Солнышко. Это случилось в 988 году и определило культурный путь Древней Руси."
    },
    {
        question: "В каком году произошла Куликовская битва?",
        options: ["1242 год", "1380 год", "1480 год"],
        answer: 1,
        fact: "Битва произошла под предводительством Дмитрия Донского. Она стала переломным моментом в борьбе против ордынского ига."
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
