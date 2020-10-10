class Player {
  constructor(name) {
    this.name = name || "Mysterious Player";
    this.score = 0;
    this.questionFeedback = document.getElementById("question_feedback");
  }
  //changes the score of the player
  changeScore(questionPoints) {
    this.score += questionPoints;
  }
  //outputs the score
  currentScoreOutput() {
    this.questionFeedback.classList.remove("hidden");
    this.questionFeedback.textContent = `Score: ${this.score}`;
  }
  //hides the current score feedback that is visible meanwhile the quiz is on
  hideCurrentScore() {
    this.questionFeedback.classList.add("hidden");
  }
  //resets the playerscore to 0
  resetScore() {
    this.questionFeedback.textContent = "";
    this.score = 0;
  }
}
