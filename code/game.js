class Game {
  constructor(questionArray, playerName) {
    this.questions = questionArray;
    this.playfield = new Playfield();
    this.currentAnswers;
    this.playfield.hideStart();
    this.player = new Player(playerName);
    this.quiz(this.playfield, this.questions, this.player);
  }

  quiz(playfield, questionsInput, player) {
    let counter = 0;
    let questions = questionsInput;
    let answerArray = playfield.createAnswerArray(questions);
    let startButton = document.getElementById("start_button");
    startButton.classList.remove("hidden");
    let answerButton = document.getElementById("answer_button");
    let answersToOutput;
    let restart = document.getElementById("restart_button");
    let done = document.getElementById("done_button");
    let message = document.getElementById("question_output");
    let startMessage = document.getElementById("start_message");
    startMessage.classList.remove("hidden");
    let nameToOutput = document.getElementById("user_name");
    nameToOutput.textContent = player.name;
    let resultButton = document.getElementById("result_button");

    startButton.addEventListener("click", function () {
      console.log(answerArray);
      startMessage.classList.add("hidden");
      answerButton.classList.remove("hidden");
      startButton.classList.add("hidden");
      playfield.resetPlayfield();
      answersToOutput = playfield.createPlayfield(questions, answerArray, counter++);
    });

    answerButton.addEventListener("click", function () {
      answerButton.classList.add("hidden");
      playfield.correctingAnswers(player, answersToOutput);
      if (counter === answerArray.length) {
        resultButton.classList.remove("hidden");
      } else {
        let startButton = document.getElementById("start_button");
        startButton.value = "Next question";
        startButton.classList.remove("hidden");
      }
    });

    resultButton.addEventListener("click", function () {
      restart.classList.remove("hidden");
      done.classList.remove("hidden");
      resultButton.classList.add("hidden");
      playfield.resetPlayfield();
      if (player.score === 1) {
        message.textContent = `Congrats, ${player.name}! You got ${player.score} point!`;
      } else {
        message.textContent = `Congrats, ${player.name}! You got ${player.score} points!`;
      }
      message.classList.remove("hidden");
    });

    restart.addEventListener("click", function () {
      this.answerArray = playfield.createAnswerArray(questions);
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
        .then((questions) => (answerArray = playfield.createAnswerArray(questions)));

      startButton.value = "Start";
      startButton.classList.remove("hidden");
      player.resetScore();
    });
    done.addEventListener("click", function () {
      done.classList.add("hidden");
      restart.classList.add("hidden");
      playfield.resetPlayfield();
      message.textContent = "Thank you for playing!";
    });
  }
}
