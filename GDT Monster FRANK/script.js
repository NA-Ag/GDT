// script.js

const quizData = [
    {
        question: "Guillermo tiene una casa donde solo guarda su colección de monstruos, utilería de otras películas, figuras, posters, etc. ¿Cómo se llama esa casa?",
        options: ["El Laberinto del Fauno", "Bleak House", "La Cumbre Escarlata", "El Gabinete"],
        answer: "Bleak House",
        explanation: "Se llama \"Bleak House\", inspirada en la novela de Charles Dickens. Está estructurada en secciones dedicadas al horror y los cuentos de hadas.",
        image: "images/bleak.png"
    },
    {
        question: "Guillermo tiene un cuarto donde escribe que le llama el \"rain room\". ¿De qué película está inspirado ese cuarto?",
        options: ["Pacific Rim", "Hellboy", "Blade Runner", "El Espinazo del Diablo"],
        answer: "Blade Runner",
        explanation: "El \"rain room\" está inspirado en la atmósfera de la película Blade Runner (1982). Es un rincón donde escribe bajo una lluvia artificial constante.",
        image: "images/blade.png"
    },
    {
        question: "Dentro de su colección, ¿cuál objeto le pertenecía a Bram Stoker?",
        options: ["Un bastón con cabeza de lobo", "Una primera edición de Drácula", "Un retrato del autor", "Un servicio de mesa"],
        answer: "Un servicio de mesa",
        explanation: "Entre su vasta colección se encuentra un servicio de mesa que perteneció al célebre autor de Drácula, Bram Stoker.",
        image: "images/drac.png"
    },
    {
        question: "Los visitantes de Bleak House tienen prohibido tocar su colección a excepción de un objeto. ¿Cuál es ese objeto?",
        options: ["El traje del Hombre Anfibio", "Una estatua de Cthulhu", "El mecanismo del Cronos", "Un boceto original de Pan"],
        answer: "Una estatua de Cthulhu",
        explanation: "Está prohibido tocar casi todo, salvo una estatua de bronce del enigmático Cthulhu (creado por H.P. Lovecraft), que anima a frotar para atraer la buena fortuna.",
        image: "images/cthulu.png"
    }
];

// DOM Elements
const welcomeArea = document.getElementById('welcome-area');
const enterQuizButton = document.getElementById('enter-quiz-button');
const showWelcomeVideoButton = document.getElementById('show-welcome-video-button');
const quizSection = document.getElementById('quiz-section');

const startArea = document.getElementById('start-area');
const welcomeVideo = document.getElementById('welcome-video');
const startQuizFromVideoButton = document.getElementById('start-quiz-from-video-button');

const questionArea = document.getElementById('question-area');
const resultsArea = document.getElementById('results-area');

const questionImage = document.getElementById('question-image');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-button');
const backgroundVideo = document.getElementById('bg-video');

let currentQuestionIndex = 0;
let score = 0;

// --- Event Listeners ---
enterQuizButton.addEventListener('click', handleStartQuizDirectly);
showWelcomeVideoButton.addEventListener('click', handleShowWelcomeVideo);
startQuizFromVideoButton.addEventListener('click', handleStartQuizFromVideo);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuizFromWelcome);

// Prevent right-click context menu on videos
function preventContextMenu(event) {
    event.preventDefault();
}

if (backgroundVideo) {
    backgroundVideo.addEventListener('contextmenu', preventContextMenu);
}
if (welcomeVideo) {
    welcomeVideo.addEventListener('contextmenu', preventContextMenu);
}

// --- Functions ---

function handleStartQuizDirectly() {
    console.log("Starting quiz directly...");
    welcomeArea.classList.add('hidden');
    quizSection.classList.remove('hidden');
    quizSection.classList.add('fade-in');
    startQuiz();
}

function handleShowWelcomeVideo() {
    console.log("Showing welcome video...");
    welcomeArea.classList.add('hidden');
    quizSection.classList.remove('hidden');
    quizSection.classList.add('fade-in');
    startArea.classList.remove('hidden');
    startArea.classList.add('fade-in');
    questionArea.classList.add('hidden');
    resultsArea.classList.add('hidden');
}

function handleStartQuizFromVideo() {
    console.log("Starting quiz from video area...");
    if (welcomeVideo && !welcomeVideo.paused) {
        welcomeVideo.pause();
    }
    startArea.classList.add('hidden');
    startQuiz();
}

function startQuiz() {
    console.log("Starting quiz questions...");
    currentQuestionIndex = 0;
    score = 0;
    startArea.classList.add('hidden');
    resultsArea.classList.add('hidden');
    questionArea.classList.remove('hidden');
    questionArea.classList.add('fade-in');
    feedback.textContent = '';
    feedback.className = '';
    nextButton.classList.add('hidden');
    questionImage.classList.add('hidden');
    questionImage.src = '';

    showQuestion();
}

function restartQuizFromWelcome() {
    console.log("Restarting quiz from welcome...");
    if (welcomeVideo && !welcomeVideo.paused) {
        welcomeVideo.pause();
    }
    resultsArea.classList.add('hidden');
    startArea.classList.add('hidden');
    questionArea.classList.add('hidden');
    quizSection.classList.add('hidden');
    welcomeArea.classList.remove('hidden');
    welcomeArea.classList.add('fade-in');
}

function showQuestion() {
    console.log(`Showing question ${currentQuestionIndex + 1}`);
    resetQuestionState();
    const currentQuestion = quizData[currentQuestionIndex];

    if (currentQuestion.image) {
        questionImage.src = currentQuestion.image;
        questionImage.alt = `Referencia visual para: ${currentQuestion.answer}`;
    } else {
        questionImage.src = '';
    }
    questionImage.classList.add('hidden');

    questionText.textContent = currentQuestion.question;

    currentQuestion.options.forEach(optionText => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option-button');
        button.addEventListener('click', () => selectAnswer(optionText, button));
        optionsContainer.appendChild(button);
    });
}

function resetQuestionState() {
    feedback.textContent = '';
    feedback.className = '';
    nextButton.classList.add('hidden');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
    questionImage.classList.add('hidden');
    questionImage.classList.remove('fade-in');
}

function selectAnswer(selectedOption, selectedButton) {
    console.log(`Answer selected: ${selectedOption}`);
    const currentQuestion = quizData[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;
    const explanationText = currentQuestion.explanation;

    const optionButtons = optionsContainer.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct-answer');
        }
        if (button === selectedButton && selectedOption !== correctAnswer) {
            button.classList.add('incorrect-answer');
        }
    });

    if (selectedOption === correctAnswer) {
        feedback.textContent = `¡Correcto! ${explanationText}`;
        feedback.className = 'correct';
        score++;
        console.log("Correct! Score:", score);
    } else {
        feedback.textContent = `Incorrecto. ${explanationText}`;
        feedback.className = 'incorrect';
        console.log("Incorrect. Correct answer:", correctAnswer);
    }

    if (currentQuestion.image) {
        questionImage.classList.remove('hidden');
        questionImage.classList.add('fade-in');
    }

    feedback.classList.add('fade-in');
    nextButton.classList.remove('hidden');
    nextButton.classList.add('fade-in');
}

function nextQuestion() {
    console.log("Moving to next question...");
    currentQuestionIndex++;
    feedback.classList.remove('fade-in');
    nextButton.classList.remove('fade-in');
    nextButton.classList.add('hidden');

    if (currentQuestionIndex < quizData.length) {
        questionArea.classList.remove('fade-in');
        void questionArea.offsetWidth;
        questionArea.classList.add('fade-in');
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    console.log("Showing results...");
    questionArea.classList.add('hidden');
    startArea.classList.add('hidden');
    questionImage.classList.add('hidden');
    resultsArea.classList.remove('hidden');
    resultsArea.classList.add('fade-in');

    scoreDisplay.textContent = `Tu puntuación: ${score} de ${quizData.length}`;

    let message = '';
    if (score === quizData.length) {
        message = "¡Felicidades! Conoces los secretos de Del Toro como si fueras un morador de Bleak House.";
    } else if (score >= quizData.length / 2) {
        message = "¡Buen trabajo! Has explorado bien el gabinete, pero aún quedan misterios por descubrir.";
    } else {
        message = "Necesitas pasar más tiempo en el mundo de Del Toro. ¡Sigue explorando sus maravillas y horrores!";
    }
    resultMessage.textContent = message;
}

// Initial setup: Welcome area is visible by default
// Quiz section (and areas within it like start-area, question-area) are hidden

// Note: The simplified answers ("Bleak House", "Blade Runner", etc.) are used for matching.
// The full explanation is shown after answering. 