const questions = [
    {
        question: 'What is the largest animal on Earth?',
        answers: [
            { text: 'Blue Whale', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Shark', correct: false },
            { text: 'Giraffe', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Venus', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for water?',
        answers: [
            { text: 'O2', correct: false },
            { text: 'H2O', correct: true },
            { text: 'CO2', correct: false },
            { text: 'HO', correct: false }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Saturn', correct: false },
            { text: 'Mars', correct: false }
        ]
    },
    {
        question: 'Which is the fastest land animal?',
        answers: [
            { text: 'Cheetah', correct: true },
            { text: 'Lion', correct: false },
            { text: 'Horse', correct: false },
            { text: 'Leopard', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const userInfoForm = document.getElementById('user-info-form');
const quizSection = document.getElementById('quiz-section');
const restartSection = document.getElementById('restart-section');
const displayName = document.getElementById('display-name');
const displayRoll = document.getElementById('display-roll');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const finalScore = document.getElementById('final-score');

document.getElementById('start-btn').addEventListener('click', function () {
    const userName = document.getElementById('user-name').value.trim();
    const rollNumber = document.getElementById('roll-number').value.trim();

    if (userName === '' || rollNumber === '') {
        alert('Please enter both Name and Roll Number!');
        return;
    }

    userInfoForm.style.display = 'none';
    quizSection.style.display = 'block';
    displayName.textContent = userName;
    displayRoll.textContent = rollNumber;
    showQuestion();
});

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn', 'btn-outline-primary');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        selectedButton.classList.add('btn-success');
        score++;
    } else {
        selectedButton.classList.add('btn-danger');
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('btn-success');
        }
    });

    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    quizSection.style.display = 'none';
    restartSection.style.display = 'block';
    finalScore.textContent = `You scored ${score} out of ${questions.length}!`;
}

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;

    // Clear input fields for new user details
    document.getElementById('user-name').value = '';
    document.getElementById('roll-number').value = '';

    // Reset UI elements
    userInfoForm.style.display = 'block';
    quizSection.style.display = 'none';
    restartSection.style.display = 'none';
});