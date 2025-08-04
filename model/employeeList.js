import { getId } from "../controls/main.js";

export default class EmployeeList {
  constructor() {
    this.arr = [];
  }
  addEmployee(employee) {
    this.arr.push(employee);
  }
  findIndex(account) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      let employee = this.arr[i];
      if (employee.account === account) {
        index = i;
        break;
      }
    }
    return index;
  }
  findAcount(account) {
    let index = this.findIndex(account);
    return this.arr[index];
  }
  DeleteFood(account) {
    let employee = this.findAcount(account);
    this.arr.splice(employee, 1);
  }
  updateInfor(employee) {
    let index = this.findIndex(employee.account);
    if (index !== -1) {
      this.arr[index] = employee;
    }
  }
  searchTypeEmployee(keyword) {
    let typeEP = [];
    for (let i = 0; i < this.arr.length; i++) {
      let employee = this.arr[i];
      const keywordLowerCase = keyword.toLowerCase();
      const keyTypeEP = employee.ratings.toLowerCase();
      if (keyTypeEP.indexOf(keywordLowerCase) > -1) {
        typeEP.push(employee);
      }
    }
    return typeEP;
  }
}
