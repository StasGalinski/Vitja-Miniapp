class App {
  peopleNumInput;
  totalTimeInput;

  peopleCounterEl;
  timerEl;
  peronalTimerEl;

  addPersonButton;
  nextPersonButton;
  controlButton;
  resetButton;
  initializeButton;

  numOfPeopleLeft;
  timeLeft;
  personalTime;

  timer;
  constructor() {
    this.peopleNumInput = document.getElementById("people-num");
    this.totalTimeInput = document.getElementById("total-time");

    this.peopleCounterEl = document.getElementById("people-counter");
    this.timerEl = document.getElementById("timer");
    this.peronalTimerEl = document.getElementById("personal-timer");

    this.addPersonButton = document.getElementById("add-person-button");
    this.nextPersonButton = document.getElementById("next-person-button");
    this.initializeButton = document.getElementById("initialize-button");
    this.controlButton = document.getElementById("control-button");
    this.resetButton = document.getElementById("reset-button");
    this.configure();
  }
  configure = () => {
    this.controlButton.addEventListener("click", this.controlHandler);
    this.nextPersonButton.addEventListener("click", this.reducePersons);
    this.initializeButton.addEventListener("click", this.initialisation);
    this.addPersonButton.addEventListener('click',this.addPersons)
    this.resetButton.addEventListener("click", this.reset);
  };
  initialisation = () => {
    this.numOfPeopleLeft = this.peopleNumInput.value;
    this.timeLeft = this.totalTimeInput.value * 60; // in seconds
    this.calculateTimePerPerson();
    this.displayValues();
  };
  reducePersons = () => {
    if (this.numOfPeopleLeft > 1) {
      this.numOfPeopleLeft--;
    }
    this.calculateTimePerPerson();
    this.displayValues();
  };
  addPersons=()=>{
    this.numOfPeopleLeft++;
    this.calculateTimePerPerson();
    this.displayValues();
  }
  controlHandler = () => {
    if (this.timer) {
      this.stopCount();
    } else {
      this.startCount();
    }
  };
  startCount = () => {
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.personalTime--;
      this.displayValues();
    }, 1000);
  };
  stopCount = () => {
    console.log(this.timer);
    clearInterval(this.timer);
    this.timer = 0;
    console.log(this.timer);
  };
  calculateTimePerPerson() {
    this.personalTime = Math.floor(this.timeLeft / this.numOfPeopleLeft);
  }
  displayValues = () => {
    this.peopleCounterEl.innerHTML = `${this.numOfPeopleLeft} persons left`;
    this.timerEl.innerHTML = this.formatTime(this.timeLeft);
    this.peronalTimerEl.innerHTML = this.formatTime(this.personalTime);
  };
  formatTime(time) {
    if (time <= 0) {
      time = Math.abs(time);
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return `Overtime - ${Math.abs(minutes)}: ${Math.abs(seconds)}`;
    } else {
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return `${minutes} min : ${seconds} sec`;
    }
  }
  reset = () => {
    this.peopleCounterEl.innerHTML = "";
    this.timerEl.innerHTML = "";
    this.peronalTimerEl.innerHTML = "";
    this.peopleNumInput.value = "";
    this.totalTimeInput.value = "";
    this.numOfPeopleLeft = 0;
    this.timeLeft = 0;
    this.personalTime = 0;
    if (this.timer) {
      this.stopCount();
    }
  };
}
const app = new App();
