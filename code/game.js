class Game {
  constructor(questionArray, playerName) {
    this.questions = questionArray;
    console.log(questionArray);
    this.methods = new MethodCollection();
    this.answerArray = this.methods.createAnswerArray(this.questions);
    this.currentAnswers;
    this.methods.hideStart();
    this.player = new Player(playerName);
    this.quiz(
      this.methods,
      this.questions,
      this.answerArray,
      this.player,
      this.questions
    );
  }

  quiz(methods, questions, answerArray, player) {
    let counter = 0;
    let startButton = document.getElementById("start_button");
    startButton.classList.remove("hidden");
    let answerButton = document.getElementById("answer_button");
    let answersToOutput;
    let restart = document.getElementById("restart_button");
    let done = document.getElementById("done_button");
    let goodbyMessage = document.getElementById("question_output");

    startButton.addEventListener("click", function () {
      answerButton.classList.remove("hidden");
      startButton.classList.add("hidden");
      methods.resetPlayfield();
      answersToOutput = methods.createPlayfield(questions, answerArray, counter++);
    });

    answerButton.addEventListener("click", function () {
      answerButton.classList.add("hidden");
      methods.correctingAnswers(player, answersToOutput);
      if (counter === answerArray.length) {
        restart.classList.remove("hidden");
        done.classList.remove("hidden");
      } else {
        let startButton = document.getElementById("start_button");
        startButton.value = "Next question";
        startButton.classList.remove("hidden");
      }
    });
    restart.addEventListener("click", function () {
      restart.classList.add("hidden");
      done.classList.add("hidden");
      counter = 0;
      methods.resetPlayfield();
      fetch(
        `https://quizapi.io/api/v1/questions?apiKey=YTE8b9GiIfGRyRdeo3KsJa0owKtVmjiCic95wfq2&limit=${questions.length}`
      )
        .then((respons) => respons.json())
        .then((data) => (questions = data));
      startButton.value = "Start";
      startButton.classList.remove("hidden");
    });
    done.addEventListener("click", function () {
      done.classList.add("hidden");
      restart.classList.add("hidden");
      player.resetScore();
      methods.resetPlayfield();
      goodbyMessage.textContent = "Thank you for playing!";
    });
  }
}
