class Restart {
  constructor() {
    this.start(this.questions, this.previousNameInput);
  }
  //method that calls two methods when startbutton is clicked
  start(questionMethod, previousNameInputMethod) {
    questionMethod(previousNameInputMethod());
  }
  /*Method that takes the chosen amount of questions and fetch them from the api
  then creates an object from the Game class with the, from the api, given array and the playername as argument*/
  questions(playerName) {
    let amountOfQuestions = document.getElementById("amount_questions").value;
    fetch(
      `https://quizapi.io/api/v1/questions?apiKey=YTE8b9GiIfGRyRdeo3KsJa0owKtVmjiCic95wfq2&limit=${amountOfQuestions}`
    )
      .then((respons) => respons.json())
      .then((data) => new Game(data, playerName));
  }
  /*Method that takes the player name from the session storage and return it*/
  previousNameInput() {
    return sessionStorage.getItem("playerName");
  }
}
