class CalcController {
  // #displayCalc1 = "value";

  constructor() {
    this._operation = [];
    this._localeBr = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#date");
    this._timeEl = document.querySelector("#hour");
    this._currentDate;
    this.initialize();
    this.initButtonsEvents();
  }

  initialize() {
    this.setDisplayDateTime();
    // o setInterval aparece depois do tempo que definimos,
    // para a data e hora aparecer de imediato chamamos o método fora do setInterval
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach(event => {
      element.addEventListener(event, fn, false);
    });
  }

  clearAll() {
    this._operation = [];
  }
  clearEntry() {
    this._operation.pop();
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  addOperation(value) {
    console.log("A" + this.getLastOperation());
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        //Torcar o operador
        this.setLastOperation(value);
      } else if (isNaN(value)) {
        //Outra coisa
        console.log(value);
      } else {
        this._operation.push(value);
      }
    } else {
      let newValue = this.getLastOperation().toString() + value.toString();
      this.setLastOperation(parseInt(newValue));
    }
    console.log(this._operation);
  }

  setError() {
    return (this.displayCalc = "ERROR");
  }

  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;

      case "ce":
        this.clearEntry();
        break;

      case "percent":
        this.addOperation("%");

        break;

      case "division":
        this.addOperation("/");

        break;

      case "multiplication":
        this.addOperation("*");

        break;

      case "subtraction":
        this.addOperation("-");

        break;

      case "sum":
        this.addOperation("+");
        break;

      case "equal":
        this.addOperation("=");

        break;

      case "dot":
        this.addOperation(".");

        break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;

      default:
        this.setError();
        break;
    }
  }

  initButtonsEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", e => {
        let textBtn = btn.className.baseVal.replace("btn-", "");

        this.execBtn(textBtn);
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
        btn.style.cursor = "pointer";
      });
    });
  }

  //para todo código que for re-utilizado criamos um método para chama-lo onde precisamos.

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._localeBr, {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._localeBr);
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(value) {
    return (this._timeEl.innerHTML = value);
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(value) {
    return (this._dateEl.innerHTML = value);
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc(value) {
    return (this._displayCalcEl.innerHTML = value);
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    return (this._currentDate.innerHTML = value);
  }
}
