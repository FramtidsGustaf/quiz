class Start {
  constructor() {
    this.submitButton = document.getElementById("submit_button");
    this.start(this.questions, this.playerNameInput);
  }
  //method that calls two methods when startbutton is clicked
  start(questionMethod, playerNameInputMethod) {
    this.submitButton.addEventListener("click", function () {
      questionMethod(playerNameInputMethod());
    });
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
  /*Method that takes the players name and return it*/
  playerNameInput() {
    return document.getElementById("player_name").value;
  }
}
