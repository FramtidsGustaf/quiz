class Player {
  constructor(name) {
    this.name = name || "Mysterious Player";
    this.score = 0;
    this.questionFeedback = document.getElementById("question_feedback");
  }
  changeScore(questionPoints) {
    this.score += questionPoints;
  }
  currentScoreOutput() {
    this.questionFeedback.textContent = `Score: ${this.score}`;
  }
  resetScore() {
    this.questionFeedback.textContent = "";
    this.score = 0;
  }
}
