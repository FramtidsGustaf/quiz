class Answer {
  constructor(index, answers, correct) {
    this.answers = answers;
    this.index = index;
    this.element = document.getElementById(`answer${this.index}`);
    this.output(this.answers);
    this.correct = correct === "true" ? true : false;
    this.clicked = false;
  }
  //outputs this answer
  output(inputText) {
    this.element.classList.remove("hidden");
    this.element.textContent = inputText;
  }
}
