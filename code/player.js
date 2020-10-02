class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  changeScore(questionPoints) {
    this.score += questionPoints;
  }
  currentScoreOutput() {
    let questionFeedback = document.getElementById("question_feedback");
    questionFeedback.textContent = `Score: ${this.score}`;
  }
}
