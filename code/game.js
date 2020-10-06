class Game {
  constructor(questionArray, playerName) {
    this.questions = questionArray;
    this.playfield = new Playfield();
    this.playfield.hideStart();
    this.player = new Player(playerName); //creates an object of the class Player
    this.quiz(
      this.playfield,
      this.questions,
      this.player,
      this.correctingAnswers,
      this.createAnswerArray
    ); //calls the "main method"
  }
  //The whole quiz is controlled from this method
  quiz(playfield, questionsInput, player, correctingAnswers, createAnswerArray) {
    let counter = 0;
    let questions = questionsInput;
    let answerArray = createAnswerArray(questions);
    let startButton = document.getElementById("start_button");
    startButton.classList.remove("hidden");
    let answerButton = document.getElementById("answer_button");
    let answersToOutput;
    let restart = document.getElementById("restart_button");
    let done = document.getElementById("done_button");
    let message = document.getElementById("question_output");
    let resultButton = document.getElementById("result_button");
    let startMessage = document.getElementById("start_message");
    startMessage.classList.remove("hidden");
    let nameToOutput = document.getElementById("user_name");
    nameToOutput.textContent = player.name;

    startButton.addEventListener("click", function () {
      startMessage.classList.add("hidden");
      answerButton.classList.remove("hidden");
      startButton.classList.add("hidden");
      playfield.resetPlayfield();
      answersToOutput = playfield.createPlayfield(questions, answerArray, counter++);
    });

    answerButton.addEventListener("click", function () {
      answerButton.classList.add("hidden");
      correctingAnswers(player, answersToOutput);
      playfield.resultStartNextQuestionToggle(counter, answerArray, resultButton);
    });

    resultButton.addEventListener("click", function () {
      playfield.resultScreen(restart, done, resultButton, playfield, player, message);
    });

    restart.addEventListener("click", function () {
      startMessage.classList.remove("hidden");
      restart.classList.add("hidden");
      done.classList.add("hidden");
      counter = 0;
      playfield.resetPlayfield();
      fetch(
        `https://quizapi.io/api/v1/questions?apiKey=YTE8b9GiIfGRyRdeo3KsJa0owKtVmjiCic95wfq2&limit=${questions.length}`
      )
        .then((respons) => respons.json())
        .then((data) => (questions = data))
        .then((questions) => (answerArray = createAnswerArray(questions)));

      startButton.value = "Start";
      startButton.classList.remove("hidden");
      player.resetScore();
    });
    done.addEventListener("click", function () {
      playfield.quitScreen(done, restart, playfield, message);
    });
  }
  //method that checks if answer is correct
  correctingAnswers(player, answerdQuestion) {
    let amountCorrect = 0;
    let amountClicked = 0;
    let amountClickedAndCorrect = 0;
    for (let i = 0; i < answerdQuestion.length; i++) {
      let answerElement = document.getElementById(`answer${i}`);
      answerElement.classList.remove("answer_div");

      if (answerdQuestion[i].correct) {
        answerElement.classList.add("correct_div");
        amountCorrect++;
      } else {
        answerElement.classList.add("false_div");
      }
      if (answerdQuestion[i].correct && answerdQuestion[i].clicked) {
        amountClickedAndCorrect++;
      } else if (answerdQuestion[i].clicked) {
        amountClicked++;
      }
    }
    if (amountCorrect === (amountClickedAndCorrect + amountClicked) / 2) {
      player.changeScore(1);
      player.currentScoreOutput();
    }
  }
  /*Method that takes all the answers and the boolean that says whether they are correct or not and
  puts them in a multidimentional array*/
  createAnswerArray(inputArray) {
    let answers = [];
    let correctAnswers = [];

    for (let element of inputArray) {
      let tempAnswers = Object.values(element.answers);
      answers.push(tempAnswers);
      let tempCorrectAnswers = Object.values(element.correct_answers);
      correctAnswers.push(tempCorrectAnswers);
    }
    let mergeArray = answers.map(() => new Array());

    for (let i = 0; i < mergeArray.length; i++) {
      for (let j = 0; j < 6; j++) {
        let temp = [];
        temp.push(answers[i][j]);
        temp.push(correctAnswers[i][j]);
        mergeArray[i].push(temp);
      }
    }
    return mergeArray;
  }
}
