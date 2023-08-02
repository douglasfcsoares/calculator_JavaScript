class CalcController {
  constructor() {
    this.displayCal = "0";
    this._currentDate;
  }

  get displayCalc() {
    return this._displayCalc;
  }

  set displayCalc(value) {
    this._displayCal = value;
  }
}
