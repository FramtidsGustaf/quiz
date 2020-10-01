class Start {
  constructor() {
    this.startButton = document.getElementById("start_button");
    this.questions();
  }
  questions() {
    this.startButton.addEventListener("click", function () {
      let amountOfQuestions = document.getElementById("amount_questions").value;
      fetch(
        `https://quizapi.io/api/v1/questions?apiKey=YTE8b9GiIfGRyRdeo3KsJa0owKtVmjiCic95wfq2&limit=${amountOfQuestions} `
      )
        .then((respons) => respons.json())
        .then((data) => new Game(data));
    });
    this.playerName();
  }
  playerName() {
    let playerNameInput = document.getElementById("player_name").value;
    new Player(playerNameInput);
  }
}
