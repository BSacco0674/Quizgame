/*----- constants -----*/
const startButton = document.getElementById("startButton");
const questionContentElement = document.getElementById("question-content");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answerButtons");
const restartButtonElement = document.getElementById("restartButton");
const gameMusic = new Audio("../Audio/Undertaletrack2.mp3");
const gameScoreElement = document.getElementById("gameScore");
const startGameContentElement = document.getElementById("startGame-Content");
const wows = new Audio("Audio/wows.mp3");
const pain = new Audio("Audio/mariopain.mp3");
const background = document.getElementById("background");
const twoHearts = document.getElementById("twoHearts");
const oneHearts = document.getElementById("oneHeart");
const zeroHearts = document.getElementById("zeroHearts");
const loseMessage = document.getElementById("loseMessage");
/*----- app's state (variables) -----*/

let shuffledQuestions, currentQuestionIndex;
let gameScore = 0;
let wrongAnswer = 0;

/*----- cached element references -----*/
const backgroundimg = document.getElementById("background");

/*----- event listeners -----*/
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
restartButtonElement.addEventListener("click", startGame);

/*----- functions -----*/

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");

  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

function startGame() {
  startButton.classList.add("hide");
  startGameContentElement.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random(questions.length));
  currentQuestionIndex = 0;
  gameScore = 0;
  gameScoreElement.innerText = gameScore;
  questionContentElement.classList.remove("hide");
  gameMusic.volume = 0.2;
  gameMusic.play();
  gameMusic.loop;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  if (question.img) {
    let tempimg = question.img;
    tempimg.src = question.img;
    backgroundimg.src = tempimg;
  }
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonElement.appendChild(button);
  });
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    gameScore++;
    wows.volume = 0.5;
    wows.play();
  } else {
    wrongAnswer++;
    pain.play();
    displayHearts();
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    restartButtonElement.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  gameScoreElement.innerText = gameScore;
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

//once the 1st wrong answer happenes, we need the 3 hearts to go to 2 hearts
// the 2nd wrong answer happenes, we need it to go from 2-1 hearts
// at the 3rd wrong answer we need to go zero hearts, and end the game

function displayHearts() {
  if (wrongAnswer === 0) {
    background.classList.remove("hide");
    oneHearts.classList.add("hide");
    twoHearts.classList.add("hide");
    zeroHearts.classList.add("hide");
  }
  if (wrongAnswer === 1) {
    background.classList.add("hide");
    oneHearts.classList.add("hide");
    twoHearts.classList.remove("hide");
    setTimeout(() => {
      background.classList.add("hide");
      twoHearts.classList.remove("hide");
    }, 200);
    setTimeout(() => {
      twoHearts.classList.add("hide");
      background.classList.remove("hide");
    }, 400);
    setTimeout(() => {
      background.classList.add("hide");
      twoHearts.classList.remove("hide");
    }, 600);
    setTimeout(() => {
      twoHearts.classList.add("hide");
      background.classList.remove("hide");
    }, 800);
    setTimeout(() => {
      background.classList.add("hide");
      twoHearts.classList.remove("hide");
    }, 1000);
    setTimeout(() => {
      twoHearts.classList.add("hide");
      background.classList.remove("hide");
    }, 1200);
    setTimeout(() => {
      background.classList.add("hide");
      twoHearts.classList.remove("hide");
    }, 1400);
    zeroHearts.classList.add("hide");
  }

  if (wrongAnswer === 2) {
    background.classList.add("hide");
    oneHearts.classList.remove("hide");
    twoHearts.classList.add("hide");
    setTimeout(() => {
      twoHearts.classList.add("hide");
      oneHearts.classList.remove("hide");
    }, 200);
    setTimeout(() => {
      oneHearts.classList.add("hide");
      twoHearts.classList.remove("hide");
    }, 400);
    setTimeout(() => {
      twoHearts.classList.add("hide");
      oneHearts.classList.remove("hide");
    }, 600);
    setTimeout(() => {
      oneHearts.classList.add("hide");
      twoHearts.classList.remove("hide");
    }, 800);
    setTimeout(() => {
      twoHearts.classList.add("hide");
      oneHearts.classList.remove("hide");
    }, 1000);
    setTimeout(() => {
      oneHearts.classList.add("hide");
      twoHearts.classList.remove("hide");
    }, 1200);
    setTimeout(() => {
      twoHearts.classList.add("hide");
      oneHearts.classList.remove("hide");
    }, 1400);
    zeroHearts.classList.add("hide");
  }
  if (wrongAnswer === 3) {
    background.classList.add("hide");
    oneHearts.classList.add("hide");
    twoHearts.classList.add("hide");
    loseMessage.classList.remove("hide");
  }
}

/*----- Question references -----*/
const questions = [
  {
    question: "What does NES stand for??",
    img: false,
    answers: [
      { text: "Nashville Electric Service", correct: false },
      { text: "National Evaluation Series", correct: false },
      { text: "Nuverra Environmental Solutions", correct: false },
      { text: "Nintendo Entertainment System", correct: true },
    ],
  },
  {
    question: "Who is The Legend of Zelda protagonist?",
    img: false,
    answers: [
      { text: "Zelda", correct: false },
      { text: "Link", correct: true },
      { text: "Kirby", correct: false },
      { text: "Jill Valentine", correct: false },
    ],
  },

  {
    question: 'What popular Nintendo game is also known as "Pocket Monsters"?',
    img: false,
    answers: [
      { text: "Digimon", correct: false },
      { text: "Yokai Watch", correct: false },
      { text: "Monster Hunter Stories", correct: false },
      { text: "Pokemon", correct: true },
    ],
  },

  {
    question: 'What Game is famous for the line "Fatality"?',
    img: false,
    answers: [
      { text: "Street Fighter", correct: false },
      { text: "Tekken", correct: false },
      { text: "Mortal Kombat", correct: true },
      { text: "Soul Calibur", correct: false },
    ],
  },

  {
    question: "Konami game where you play as Simon Belmont?",
    img: false,
    answers: [
      { text: "Castlevania", correct: true },
      { text: "Contra", correct: false },
      { text: "Journey to the Center of the Earth", correct: false },
      { text: "Dragon Ball Z", correct: false },
    ],
  },

  {
    question: "Lara Croft is the Protagonist of what popular Playstation game?",
    img: false,
    answers: [
      { text: "Silent Hill", correct: false },
      { text: "Tomb Raider", correct: true },
      { text: "Dark Souls", correct: false },
      { text: "Mario Kart", correct: false },
    ],
  },

  {
    question: "Who is this famous bounty hunter?",
    img: "../Assets/Samus.png",
    answers: [
      { text: "Zero Suit Samus", correct: true },
      { text: "Daisy", correct: false },
      { text: "Chung-Li", correct: false },
      { text: "Morganna", correct: false },
    ],
  },

  {
    question: "Which of these is the name of this pokemon?",
    img: "../Assets/jigglypuff.png",
    answers: [
      { text: "Gegar", correct: false },
      { text: "Charizard", correct: false },
      { text: "Ludicolo", correct: false },
      { text: "Jigglypuff", correct: true },
    ],
  },

  {
    question: "Blinky, Pinky, Inky, & _____?",
    img: false,
    answers: [
      { text: "Minkey", correct: false },
      { text: "Chuck", correct: false },
      { text: "Cylde", correct: true },
      { text: "Eddy", correct: false },
    ],
  },

  {
    question: "What was Marios orginal name?",
    img: false,
    answers: [
      { text: "Jumpman", correct: true },
      { text: "Plumberdude", correct: false },
      { text: "Wreck-It-Ralph", correct: false },
      { text: "RocketMan", correct: false },
    ],
  },

  {
    question:
      "What is the name of this small purple dragon with a dragonfly partner?",
    img: "../Assets/Spyro.png",
    answers: [
      { text: "Shenron", correct: false },
      { text: "Smaug", correct: false },
      { text: "Spyro", correct: true },
      { text: "Toothless", correct: false },
    ],
  },

  {
    question: "Who is the richest fictional character?",
    img: false,
    answers: [
      { text: "Tywin Lannister", correct: false },
      { text: "Jed Clampett", correct: false },
      { text: "Bruce Wayne", correct: false },
      { text: "Scoorge McDuck", correct: true },
    ],
  },

  {
    question:
      "Famous Skateboarder that inspired over 17 different Skateboard that cover many different gaming platforms?",
    img: false,
    answers: [
      { text: "Tony Hawk", correct: true },
      { text: "Rodney Mullen", correct: false },
      { text: "Bam Margera", correct: false },
      { text: "Oksana Baiul", correct: false },
    ],
  },

  {
    question: "This Arwing is from what game series??",
    img: "../Assets/Arwing.png",
    answers: [
      { text: "Star Wars", correct: false },
      { text: "Star Fox", correct: true },
      { text: "Battlestar Galactica", correct: false },
      { text: "Firefly", correct: false },
    ],
  },

  {
    question: "Segas first handheld game console released worldwide?",
    img: false,
    answers: [
      { text: "Switch", correct: false },
      { text: "PS Pro", correct: false },
      { text: "Game Gear", correct: true },
      { text: "Sega Genesis Arcade Ultimate Portable", correct: false },
    ],
  },

  {
    question: "Who is the doctor that created Mega Man?",
    img: false,
    answers: [
      { text: "Dr. Robotnik", correct: false },
      { text: "Dr. Eggman", correct: false },
      { text: "Dr. Light", correct: true },
      { text: "Dr. Gero", correct: false },
    ],
  },

  {
    question:
      "Atari 2600 has a released a game that is considered one of the worst game ever?",
    img: false,
    answers: [
      { text: "Pong", correct: false },
      { text: "E.T. the Extra-Terrestrial", correct: true },
      { text: "Space Invaders", correct: false },
      { text: "Asteroids", correct: false },
    ],
  },

  {
    question: "The damsel in distress from the original Donkey Kong?",
    img: false,
    answers: [
      { text: "Pauline", correct: true },
      { text: "Peach", correct: false },
      { text: "Daisy", correct: false },
      { text: "Amy Rose", correct: false },
    ],
  },

  {
    question: "What type of animal is Sonics companion Knuckles?",
    img: "../Assets/Knuckles.png",
    answers: [
      { text: "Echidna", correct: true },
      { text: "Headgehog", correct: false },
      { text: "Possum", correct: false },
      { text: "Red Fox", correct: false },
    ],
  },
];
