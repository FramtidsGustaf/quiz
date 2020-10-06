class Answer {
  constructor(index, answers, correct) {
    this.answers = answers;
    this.index = index;
    this.element = document.getElementById(`answer${this.index}`);
    this.show();
    this.output(this.answers);
    this.correct = correct === "true" ? true : false;
    this.clicked = false;
  }
  //shows this answer
  show() {
    this.element.classList.remove("hidden");
  }
  //outputs this answer
  output(inputText) {
    this.element.textContent = inputText;
  }
}
