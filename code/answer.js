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
  show() {
    this.element.classList.remove("hidden");
  }
  isClicked(element) {
    element.addEventListener("click", function () {
      if (!this.clicked) {
        element.classList.add("clicked");
        this.clicked = true;
      } else {
        element.classList.remove("clicked");
        this.clicked = false;
      }
    });
  }
  output(inputText) {
    this.element.textContent = inputText;
  }
}
