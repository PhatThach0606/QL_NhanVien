import { getId } from "../controls/main.js";

export default class Employee {
  constructor(
    _account,
    _fullName,
    _email,
    _password,
    _date,
    _basePay,
    _position,
    _workingHours
  ) {
    this.account = _account;
    this.fullName = _fullName;
    this.email = _email;
    this.password = _password;
    this.date = _date;
    this.basePay = _basePay;
    this.position = _position;
    this.workingHours = _workingHours;
    this.totalSalary = 0;
    this.ratings = "";
  }
  calctotalSalary() {
    const select = document.querySelector("#chucvu");
    const value = select.value;
    switch (value) {
      case "Giám đốc":
        this.totalSalary = this.basePay * 3;
        break;
      case "Trưởng phòng":
        this.totalSalary = this.basePay * 2;
        break;
      case "Nhân viên":
        this.totalSalary = this.basePay;
        break;
      default:
        this.totalSalary = 0;
    }
  }

  ratingsEmployee() {
    let time = this.workingHours;
    if (this.position === "Nhân viên") {
      if (time >= 192) {
        this.ratings = "Nhân viên xuất sắc";
      } else if (time >= 176) {
        this.ratings = "Nhân viên giỏi";
      } else if (time >= 160) {
        this.ratings = "Nhân viên khá";
      } else {
        this.ratings = "Nhân viên trung bình";
      }
    }
    return this.ratings;
  }
}
