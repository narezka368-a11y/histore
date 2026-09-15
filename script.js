// Массивы данных (перенесены из Java-кода)
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

// Переменные состояния
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

// Запуск игры
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', showNextQuestion);

function startGame()
{
	startScreen.classList.add('hidden');
	gameScreen.classList.remove('hidden');
	loadQuestion();
}

function loadQuestion()
{
	resetState();
	const currentData = quizData[currentQuestionIndex];
	questionEl.innerText = currentData.question;
	scoreValue.innerText = score;

	currentData.options.forEach((option, index) => {
		const button = document.createElement('button');
		button.innerText = option;
		button.classList.add('option-btn');
		button.addEventListener('click', () => selectAnswer(index));
		optionsContainer.appendChild(button);
	});
}

function resetState()
{
	nextBtn.classList.add('hidden');
	feedbackEl.classList.add('hidden');
	while (optionsContainer.firstChild) {
		optionsContainer.removeChild(optionsContainer.firstChild);
	}
}

function selectAnswer(selectedIndex)
{
	const currentData = quizData[currentQuestionIndex];
	const buttons = optionsContainer.querySelectorAll('.option-btn');

	// Проверяем ответ
	if (selectedIndex === currentData.answer) {
		score++;
		feedbackEl.innerText = "Верно!";
		feedbackEl.classList.add('correct');
	} else {
		feedbackEl.innerText = "Неверно.";
		feedbackEl.classList.add('wrong');
		// Подсвечиваем правильный ответ
		buttons[currentData.answer].classList.add('correct');
	}

	// Показываем исторический факт
	alert(currentData.fact); // В реальном сайте лучше сделать красивый поп-ап внутри страницы

	feedbackEl.classList.remove('hidden');
	nextBtn.classList.remove('hidden');

	// Блокируем выбор других вариантов
	buttons.forEach(btn => btn.disabled = true);
}

function showNextQuestion()
{
	currentQuestionIndex++;
	feedbackEl.className = 'hidden';

	if (currentQuestionIndex < quizData.length) {
		loadQuestion();
	} else {
		endGame();
	}
}

function endGame()
{
	gameScreen.classList.add('hidden');
	endScreen.classList.remove('hidden');

	const percentage = (score / quizData.length) * 100;
	let resultText = `Вы ответили правильно на ${score} из ${quizData.length} вопросов.`;

	if (percentage == 100) {
		resultText += "\nОтличный результат! Вы настоящий знаток!";
	} else if (percentage >= 70) {
		resultText += "\nХороший результат! Вы отлично помните школьную программу.";
	} else if (percentage >= 40) {
		resultText += "\nНеплохо, но стоит повторить даты и события.";
	} else {
		resultText += "\nГлавное — желание учиться!";
	}

	finalResult.innerText = resultText;
}