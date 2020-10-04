class Game {
  constructor(questionArray, playerName) {
    this.questions = questionArray;
    console.log(questionArray);
    this.methods = new MethodCollection();
    this.answerArray = this.methods.createAnswerArray(this.questions);
    this.currentAnswers;
    this.methods.hideStart();
    this.player = new Player(playerName);
    this.quiz(this.methods, this.questions, this.answerArray, this.player);
  }

  quiz(methods, questionArray, answerArray, player) {
    let counter = 0;
    let startButton = document.getElementById("start_button");
    startButton.classList.remove("hidden");
    let answerButton = document.getElementById("answer_button");
    let outputtedAnswers;
    let restart = document.getElementById("restart_button");

    startButton.addEventListener("click", function () {
      answerButton.classList.remove("hidden");
      startButton.classList.add("hidden");
      methods.resetPlayfield();
      //methods.createPlayfield
      outputtedAnswers = methods.createPlayfield(
        questionArray,
        answerArray,
        counter++,
        player,
        methods.correctingAnswers
      );
    });
    answerButton.addEventListener("click", function () {
      answerButton.classList.add("hidden");
      methods.correctingAnswers(player, outputtedAnswers);
      if (counter === answerArray.length) {
        restart.classList.remove("hidden");
        restart.addEventListener("click", function () {
          new Restart();
          methods.resetPlayfield();
          startButton.value = "Start";
          restart.classList.add("hidden");
        });
      } else {
        let startButton = document.getElementById("start_button");
        startButton.value = "Next question";
        startButton.classList.remove("hidden");
      }
    });
  }
}
