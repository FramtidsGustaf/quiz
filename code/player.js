class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  changeScore(questionPoints) {
    this.score += questionPoints;
  }
}
