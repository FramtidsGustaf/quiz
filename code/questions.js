class Question {
  constructor(questions) {
    this.questions = questions;
    this.answers;
  }
  getNewQuestions() {
    fetch(
      `https://quizapi.io/api/v1/questions?apiKey=YTE8b9GiIfGRyRdeo3KsJa0owKtVmjiCic95wfq2&limit=${this.questions.length}`
    )
      .then((respons) => respons.json())
      .then((data) => (this.questions = data))
      .then(() => (this.createAnswerArray()));
  }
  createAnswerArray() {
    /*answers becomes an array with as many elements as questions
    every element is an array with the current questions answers*/ 
    let answers = this.questions.map((element) => Object.values(element.answers)); 
    /*correctAnswers is the same as answers but with booleans instead of answers */
    let correctAnswers = this.questions.map((element) => Object.values(element.correct_answers));
    /*mergedArray is an array with as many elements as answers
    every element is an empty array*/
    let mergedArray = answers.map(() => new Array());

    /*here we are taking the answer and the corresponding boolean and
     pushes them in to an array wich we then pushes in to the merged array.
     this way we are gathering the answers and the boolean at the same place*/
    for (let i = 0; i < mergedArray.length; i++) {
      for (let j = 0; j < 6; j++) {
        let temp = [];
        temp.push(answers[i][j]);
        temp.push(correctAnswers[i][j]);
        mergedArray[i].push(temp);
      }
    }
    this.answers = mergedArray;
  }
}