class Game {
  constructor(questionArray) {
    this.questions = questionArray;
    console.log(this.questions);
    this.answerArray = this.createAnswerArray(this.questions);
    console.log(this.answerArray);
    this.hideStart();
    this.quiz(this.questions, this.answerArray);
  }
  hideStart() {
    let start = document.getElementById("start_input");
    start.setAttribute("class", "hidden");
  }
  createAnswerArray(inputArray) {
    let answers = [];
    let correctAnswers = [];

    for (let element of inputArray) {
      let tempAnswers = Object.values(element.answers);
      answers.push(tempAnswers);
      let tempCorrectAnswers = Object.values(element.correct_answers);
      correctAnswers.push(tempCorrectAnswers);
    }
    let mergeArray = answers.map((element) => (element = new Array()));

    for (let i = 0; i < mergeArray.length; i++) {
      for (let j = 0; j < 6; j++) {
        let temp = [];
        temp.push(answers[i][j]);
        temp.push(correctAnswers[i][j]);
        mergeArray[i].push(temp);
      }
    }
    return mergeArray;
  }
  quiz(questionArray, answerArray) {
    let counter = 0;
    let questionOutput = document.getElementById("question_output");
    questionOutput.textContent = questionArray[counter].question;
    for (let i = 0; i < 6; i++) {
      if (answerArray[counter][i][0]) {
        let tempChoice = document.getElementById(`choice${i}`);
        tempChoice.classList.remove("hidden");
      }
    }

    let answerButton = document.getElementById("answerButton");
  }
}
