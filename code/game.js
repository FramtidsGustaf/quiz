class Game {
  constructor(questionArray, playerName) {
    this.questions = questionArray;
    this.player = new Player(playerName); //creates an object of the class Player
    this.playfield = new Playfield(this.player);
    this.playfield.hideStart();
    //calling the "main-method"
    this.quiz(
      this.playfield,
      this.questions,
      this.player,
      this.correctingAnswers,
      this.createAnswerArray
    );
  }
  //The whole quiz is controlled from this method
  quiz(playfield, questionsInput, player, correctingAnswers, createAnswerArray) {
    let questions = questionsInput;
    playfield.questionArray = questions;
    let answerArray = createAnswerArray(questions);
    playfield.answerArray = answerArray;
    let startButton = document.getElementById("start_button");
    startButton.classList.remove("hidden");
    let answerButton = document.getElementById("answer_button");
    let answersToOutput;
    let restart = document.getElementById("restart_button");
    let done = document.getElementById("done_button");
    let resultButton = document.getElementById("result_button");
    let welcomeMessage = document.getElementById("welcome_message");
    welcomeMessage.classList.remove("hidden");
    let nameToOutput = document.getElementById("user_name");
    nameToOutput.textContent = player.name;

    startButton.addEventListener("click", function () {
      welcomeMessage.classList.add("hidden");
      answerButton.classList.remove("hidden");
      startButton.classList.add("hidden");
      playfield.resetPlayfield();
      answersToOutput = playfield.createPlayfield();
    });

    answerButton.addEventListener("click", function () {
      answerButton.classList.add("hidden");
      correctingAnswers(player, answersToOutput);
      playfield.resultStartNextQuestionToggle();
    });

    resultButton.addEventListener("click", function () {
      playfield.resetPlayfield();
      playfield.resultScreen();
    });

    restart.addEventListener("click", function () {
      welcomeMessage.classList.remove("hidden");
      restart.classList.add("hidden");
      done.classList.add("hidden");
      playfield.resetCounter();
      playfield.resetPlayfield();
      fetch(
        `https://quizapi.io/api/v1/questions?apiKey=YTE8b9GiIfGRyRdeo3KsJa0owKtVmjiCic95wfq2&limit=${questions.length}`
      )
        .then((respons) => respons.json())
        .then((data) => (questions = data))
        .then((questions) => (playfield.questionArray = questions))
        .then((questions) => (answerArray = createAnswerArray(questions)))
        .then((answerArray) => (playfield.answerArray = answerArray));

      startButton.value = "Start";
      startButton.classList.remove("hidden");
      player.resetScore();
    });

    done.addEventListener("click", function () {
      playfield.resetPlayfield();
      playfield.quitScreen();
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
      }
      if (answerdQuestion[i].clicked) {
        amountClicked++;
      }
    }
    if (amountCorrect === amountClickedAndCorrect && amountClicked === amountCorrect) {
      player.changeScore(1);
      player.currentScoreOutput();
    }
  }
  /*Method that takes all the answers and the boolean that says whether they are correct or not and
  puts them in a multidimentional array*/
  createAnswerArray(inputArray) {
    let answers = inputArray.map((element) => Object.values(element.answers));
    let correctAnswers = inputArray.map((element) => Object.values(element.correct_answers));
    let mergedArray = answers.map(() => new Array());

    /*here we are taking the question and the corresponding boolean and
     pushes them in to an array wich we then pushes in to the merged array.
     this way we are gathering the answers and the boolean at the same place*/
    for (let i = 0; i < mergedArray.length; i++) {
      for (let j = 0; j < 6; j++) {
        let temp = [];
        temp.push(answers[i][j]);
        temp.push(correctAnswers[i][j]);
        mergedArray[i].push(temp);
      }
    }
    return mergedArray;
  }
}
