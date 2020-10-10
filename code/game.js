class Game {
  constructor(questionArray, playerName) {
    this.questions = new Question(questionArray);
    this.player = new Player(playerName); //creates an object of the class Player
    this.playfield = new Playfield(this.player);
    this.playfield.hideStart();
    //calling the "main-method"
    this.quiz(
      this.playfield,
      this.player,
      this.correctingAnswers,
      this.done,
      this.result,
      this.questions
    );
  }
  //The whole quiz is controlled from this method
  quiz(playfield, player, correctingAnswers, done, result, questions) {
    let startButton = document.getElementById("start_button");
    let answersToOutput;
    startButton.classList.remove("hidden");
    let answerButton = document.getElementById("answer_button");
    let restartButton = document.getElementById("restart_button");
    let doneButton = document.getElementById("done_button");
    let resultButton = document.getElementById("result_button");
    let welcomeMessage = document.getElementById("welcome_message");
    welcomeMessage.classList.remove("hidden");
    let nameToOutput = document.getElementById("user_name");
    nameToOutput.textContent = player.name;
    questions.createAnswerArray();
    
    startButton.addEventListener("click", function () {
      playfield.questionArray = questions.questions;
      playfield.answerArray = questions.answers;
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

    result(resultButton, player, playfield);

    restartButton.addEventListener("click", function () {
      welcomeMessage.classList.remove("hidden");
      restartButton.classList.add("hidden");
      doneButton.classList.add("hidden");
      playfield.resetCounter();
      playfield.resetPlayfield();
      questions.getNewQuestions();
      startButton.value = "Start";
      startButton.classList.remove("hidden");
      player.resetScore();
    });

    done(doneButton, player, playfield);
  }
  //lets the player know the score, 
  result(resultButton, player, playfield) {
    resultButton.addEventListener("click", function () {
      player.hideCurrentScore();
      playfield.resetPlayfield();
      playfield.resultScreen();
    });
  }
  //farewell message when player is done
  done(doneButton, player, playfield) {
    doneButton.addEventListener("click", function () {
      player.hideCurrentScore();
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
}
