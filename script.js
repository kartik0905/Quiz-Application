document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What does CSS stand for?",
      choices: [
        "Computer Style Sheet",
        "Cascading Style Sheet",
        "Creative Style System",
        "Colorful Style Sheet",
      ],
      answer: "Cascading Style Sheet",
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      choices: ["<a>", "<link>", "<href>", "<url>"],
      answer: "<a>",
    },
    {
      question: "Which of the following is a JavaScript data type?",
      choices: ["float", "decimal", "number", "double"],
      answer: "number",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  // Start Quiz
  startBtn.addEventListener("click", startQuiz);

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }

  // Display a question
  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";

    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.classList.add("choice-item");
      li.style.cursor = "pointer";
      li.style.padding = "10px";
      li.style.border = "1px solid #ccc";
      li.style.borderRadius = "8px";
      li.style.margin = "5px 0";
      li.style.backgroundColor = "#f7f7f7";

      li.addEventListener("click", () => selectAnswer(li, choice));
      choicesList.appendChild(li);
    });
  }

  // Handle answer selection
  function selectAnswer(selectedLi, selectedChoice) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    Array.from(choicesList.children).forEach((li) => {
      li.style.pointerEvents = "none";
      if (li.textContent === correctAnswer) {
        li.style.backgroundColor = "#c8e6c9"; // green
      } else if (li === selectedLi) {
        li.style.backgroundColor = "#ffcdd2"; // red
      }
    });

    if (selectedChoice === correctAnswer) {
      score++;
    }

    nextBtn.classList.remove("hidden");
  }

  // Next Question
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  });

  // End Quiz
  function endQuiz() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} / ${questions.length}`;
  }

  // Restart Quiz
  restartBtn.addEventListener("click", () => {
    startQuiz();
  });
});
