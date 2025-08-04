import { getId } from "../controls/main.js";
export default class Validation {
  checkEmpty(value, spanId, mess) {
    if (value === "") {
      getId(spanId).innerHTML = mess;
      getId(spanId).style.display = "block";
      return false;
    }
    getId(spanId).innerHTML = "";
    getId(spanId).style.display = "none";
    return true;
  }
  checkAccout(value, spanId, mess) {
    const letter = /^\d{4,6}$/;
    if (value.match(letter)) {
      getId(spanId).innerHTML = "";
      getId(spanId).style.display = "none";
      return true;
    }
    getId(spanId).innerHTML = mess;
    getId(spanId).style.display = "block";
    return false;
  }
  checkName(value, spanId, mess) {
    let letter = /^[a-zA-ZÀ-Ỵà-ỵ\s]{2,}$/;
    if (value.match(letter)) {
      getId(spanId).innerHTML = "";
      getId(spanId).style.display = "none";
      return true;
    }
    getId(spanId).innerHTML = mess;
    getId(spanId).style.display = "block";
    return false;
  }
  checkEmail(value, spanId, mess) {
    let letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (value.match(letter)) {
      getId(spanId).innerHTML = "";
      getId(spanId).style.display = "none";
      return true;
    }
    getId(spanId).innerHTML = mess;
    getId(spanId).style.display = "block";
    return false;
  }
  checkPassword(value, spanId, mess) {
    let letter =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%^&*()_+-={\[\]}\|:;"',<\./?]).{6,10}$/;
    if (value.match(letter)) {
      getId(spanId).innerHTML = "";
      getId(spanId).style.display = "none";
      return true;
    }
    getId(spanId).innerHTML = mess;
    getId(spanId).style.display = "block";
    return false;
  }
  checkDate(value, spanId, mess) {
    let letter = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (value.match(letter)) {
      getId(spanId).innerHTML = "";
      getId(spanId).style.display = "none";
      return true;
    }
    getId(spanId).innerHTML = mess;
    getId(spanId).style.display = "block";
    return false;
  }
  // check salary
  checksalary(value, spanId, mess) {
    if (value >= 1000000 && value <= 20000000) {
      getId(spanId).innerHTML = "";
      getId(spanId).style.display = "none";
      return true;
    }
    getId(spanId).innerHTML = mess;
    getId(spanId).style.display = "block";
    return false;
  }
  // check giờ làm
  checkWorkingHours(value, spanId, mess) {
    if (value >= 80 && value <= 200) {
      getId(spanId).innerHTML = "";
      getId(spanId).style.display = "none";
      return true;
    }
    getId(spanId).innerHTML = mess;
    getId(spanId).style.display = "block";
    return false;
  }

  // check selectOption
  checkselectOption(idSelect, spanId, mess) {
    const element = getId(idSelect);
    if (element.selectedIndex !== 0) {
      getId(spanId).innerHTML = "";
      getId(spanId).style.display = "none";
      return true;
    }
    getId(spanId).innerHTML = mess;
    getId(spanId).style.display = "block";
    return false;
  }
  // check exist
  checkExistAccout(value, spanId, mess, listEmployee) {
    let exist = false;
    for (let i = 0; i < listEmployee.length; i++) {
      let employee = listEmployee[i];
      if (employee.account === value) {
        exist = true;
        break;
      }
    }
    if (exist) {
      getId(spanId).innerHTML = mess;
      getId(spanId).style.display = "block";
      return false;
    }
    getId(spanId).innerHTML = "";
    getId(spanId).style.display = "none";
    return true;
  }
  checkExistEmail(value, spanId, mess, listEmployee) {
    let exist = false;
    for (let i = 0; i < listEmployee.length; i++) {
      let employee = listEmployee[i];
      if (employee.email === value) {
        exist = true;
        break;
      }
    }
    if (exist) {
      getId(spanId).innerHTML = mess;
      getId(spanId).style.display = "block";
      return false;
    }
    getId(spanId).innerHTML = "";
    getId(spanId).style.display = "none";
    return true;
  }
}
