import Employee from "../model/employee.js";
import EmployeeList from "../model/employeeList.js";
import Validation from "../model/validation.js";
export function getId(id) {
  return document.getElementById(id);
}
const validation = new Validation();
const employeeList = new EmployeeList();
getLocalStorange();
/** Lấy thông tin nhân viên */
function getInforEmployee(isAdd) {
  const account = getId("tknv").value;
  const fullName = getId("name").value;
  const email = getId("email").value;
  const password = getId("password").value;
  const date = getId("datepicker").value;
  const basePay = getId("luongCB").value;
  const postion = getId("chucvu").value;
  const workingHours = getId("gioLam").value;
  /**
   * Check validation
   */
  let isvalid = true;
  // check account
  if (isAdd) {
    isvalid &=
      validation.checkEmpty(account, "tbTKNV", "Vui lòng nhập Account") &&
      validation.checkAccout(account, "tbTKNV", "Chỉ chấp nhận 4-6 số") &&
      validation.checkExistAccout(
        account,
        "tbTKNV",
        "Tài khoản đã tồn tại",
        employeeList.arr
      );

    // Check email
    isvalid &=
      validation.checkEmpty(email, "tbEmail", "Vui lòng nhập Email") &&
      validation.checkEmail(
        email,
        "tbEmail",
        "Vui lòng nhập Email theo đúng chuẩn"
      ) &&
      validation.checkExistEmail(
        email,
        "tbEmail",
        "Email đã tồn tại",
        employeeList.arr
      );
  }
  // check Name
  isvalid &=
    validation.checkEmpty(fullName, "tbTen", "Vui lòng nhập tên") &&
    validation.checkName(
      fullName,
      "tbTen",
      `. Vui lòng không nhập kí tự đặt biêt <br>
       . Tên có ít nhất 2 kí tự `
    );
  // check password
  isvalid &=
    validation.checkEmpty(
      password,
      "tbMatKhau",
      "Vui lòng không bỏ trống mật khẩu"
    ) &&
    validation.checkPassword(
      password,
      "tbMatKhau",
      `Mật khẩu <br> - Có ít nhất 1 chữ số <br>
              - Có ít nhất 1 ký tự đặt biệt  <br>  
              - Có ít nhất 1 ký tự in hoa  <br>
              - Có từ 6-10 kí tự`
    );
  // check dateWork
  isvalid &=
    validation.checkEmpty(date, "tbNgay", "Không được để trống") &&
    validation.checkDate(date, "tbNgay", "Định dạng date mm/dd/yy");
  // check salary
  isvalid &=
    validation.checkEmpty(basePay, "tbLuongCB", "Không được để trống") &&
    validation.checksalary(basePay, "tbLuongCB", "Lương từ 1000000-20000000");
  // check chức vụ
  isvalid &= validation.checkselectOption(
    "chucvu",
    "tbChucVu",
    "Vui lòng chọn chức vụ phù hợp"
  );
  // check số giờ làm
  isvalid &=
    validation.checkEmpty(workingHours, "tbGiolam", "Không được để trống") &&
    validation.checkWorkingHours(
      workingHours,
      "tbGiolam",
      "Số giờ làm từ 80-200"
    );
  if (!isvalid) return;
  // Tạo đối tượng nhân viên
  const employee = new Employee(
    account,
    fullName,
    email,
    password,
    date,
    basePay,
    postion,
    workingHours
  );
  employee.calctotalSalary();
  employee.ratingsEmployee();
  return employee;
}
/** Xuất thông tin ra display */
function renderEmployee(data) {
  let contenHTML = "";
  for (let i = 0; i < data.length; i++) {
    let employee = data[i];
    contenHTML += `
    <tr>
    <td>${employee.account}</td>
    <td>${employee.fullName}</td>
    <td>${employee.email}</td>
    <td>${employee.date}</td>
    <td>${employee.position}</td>
    <td>${employee.totalSalary}</td>
    <td>${employee.ratings}</td>
    <td>
        <button onclick="handleEdit('${employee.account}')" class="btn btn-info" data-toggle="modal" data-target="#myModal">Edit</button>
        <button onclick="handleDelete('${employee.account}')" class="btn btn-danger">Delete</button>
    </td>
    </tr>
    `;
  }
  getId("tableDanhSach").innerHTML = contenHTML;
}
/** Thêm nhân viên */
getId("btnThemNV").addEventListener("click", function () {
  const employee = getInforEmployee(true);
  if (!employee) return;
  employeeList.addEmployee(employee);
  renderEmployee(employeeList.arr);
  setLocalStorange();
  document.getElementById("btnDong").click();
  reserFormModal();
});
/** Cập nhật và xóa Employee */
function handleDelete(account) {
  employeeList.DeleteFood(account);
  renderEmployee(employeeList.arr);
  setLocalStorange();
}
function handleEdit(account) {
  // Fix display
  getId("btnCapNhat").style.display = "block";
  getId("btnThemNV").style.display = "none";
  getId("header-title").innerHTML = "Sửa thông tin";
  //-----------
  let employee = employeeList.findAcount(account);
  getId("tknv").value = `${employee.account}`;
  getId("tknv").disabled = true;
  getId("name").value = `${employee.fullName}`;
  getId("email").value = `${employee.email}`;
  getId("password").value = `${employee.password}`;
  getId("datepicker").value = `${employee.date}`;
  getId("luongCB").value = `${employee.basePay}`;
  getId("chucvu").value = `${employee.position}`;
  getId("gioLam").value = `${employee.workingHours}`;
}
// fix display thêm nhân viên
getId("btnThem").addEventListener("click", function () {
  getId("btnCapNhat").style.display = "none";
  getId("btnThemNV").style.display = "block";
  getId("header-title").innerHTML = "Thêm nhân viên";
  getId("tknv").disabled = false;
});
window.handleEdit = handleEdit;
window.handleDelete = handleDelete;
/** Cập nhật Thông tin*/
getId("btnCapNhat").addEventListener("click", function () {
  const employee = getInforEmployee(false);
  employeeList.updateInfor(employee);
  renderEmployee(employeeList.arr);
  setLocalStorange();
  document.getElementById("btnDong").click();
  reserFormModal();
});
/** Xếp loại nhân viên */
getId("searchName").addEventListener("keyup", function () {
  let keyword = getId("searchName").value;
  const searchTypeEmployee = employeeList.searchTypeEmployee(keyword);
  renderEmployee(searchTypeEmployee);
});
/** set,get loco storange */
function setLocalStorange() {
  // convert to string
  let datastring = JSON.stringify(employeeList.arr);
  localStorage.setItem("EMPLOYEE_LIST", datastring);
}
function getLocalStorange() {
  let datastring = localStorage.getItem("EMPLOYEE_LIST");
  // conver to Json
  if (!datastring) return;
  const dataJson = JSON.parse(datastring);
  employeeList.arr = dataJson;
  renderEmployee(employeeList.arr);
}
/** reset form */
function reserFormModal() {
  getId("form_modal").reset();
}
