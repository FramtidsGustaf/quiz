class Start {
  constructor() {
    this.submitButton = document.getElementById("submit_button");
    this.quizTitle = document.getElementsByClassName("quiz_title")[0];
    this.startAnimation();
    this.start(this.questions, this.playerNameInput);
  }
  //method that calls two methods when startbutton is clicked
  start(question, playerNameInput) {
    this.submitButton.addEventListener("click", function () {
      question(playerNameInput());
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
    let playerName = document.getElementById("player_name").value;
    return playerName;
  }
  startAnimation() {
    this.quizTitle.classList.add("quiz_title_landing");
  }
}
