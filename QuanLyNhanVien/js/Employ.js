var mangNhanVien = [];

// them nhan vien
document.getElementById("btnThemNV").onclick = function () {
  var nv = new NhanVien();
  nv.account = document.getElementById("tknv").value;
  nv.name = document.getElementById("name").value;
  nv.email = document.getElementById("email").value;
  nv.password = document.getElementById("password").value;
  nv.dateOfWork = document.getElementById("datepicker").value;
  nv.salary = +document.getElementById("luongCB").value;
  nv.coefficientssalary = document.getElementById("chucvu").value;
  nv.timeWork = +document.getElementById("gioLam").value;

  var tagSelect = document.getElementById("chucvu");
  var viTriTheChon = tagSelect.selectedIndex;
  var competence = tagSelect.options[viTriTheChon].innerHTML;
  nv.competence = competence;

  let isValid = validate();
  if (!isValid) {
    return;
  }
  mangNhanVien.push(nv);
  renderTableThemNhanVien(mangNhanVien);
  luulocalStorage();
};

// hien thi nhan vien ra table
function renderTableThemNhanVien(arrNhanVien) {
  var htmlString = "";
  for (var i = 0; i < arrNhanVien.length; i++) {
    var nv = new NhanVien();
    nv = arrNhanVien[i];
    htmlString += `
        <tr>
        <td>${nv.account}</td>
        <td>${nv.name}</td>
        <td>${nv.email}</td>
        <td>${nv.dateOfWork}</td>
        <td>${nv.competence}</td>
        <td> ${nv.calcSalary()}</td>
        <td> ${nv.classification()}</td>
        <td>
                        <button
                        class="btn btn-primary"
                        onclick="deleteNhanVien('${nv.account}')"
                        >
                            Xóa
                        </button
                        >
                        <button
                        class="btn btn-danger mt-2"
                        onclick="fixNhanVien('${nv.account}')"
                        >
                            Chỉnh Sửa
                        </button>
                    </td>
        </tr>
        `;
  }
  document.querySelector("tbody").innerHTML = htmlString;
  return htmlString;
}
// xoa nhan vien
function deleteNhanVien(indelNV) {
  var indexDel = -1;
  for (var i = 0; i < mangNhanVien.length; i++) {
    if (mangNhanVien[i].account === indelNV) {
      indexDel = i;
      break;
    }
  }
  mangNhanVien.splice(indexDel, 1);
  renderTableThemNhanVien(mangNhanVien);
  //    alert(indelNV);
}
// chỉnh sửa nhân viên
function fixNhanVien(maSinhVienClick) {
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
  for (var index = 0; index < mangNhanVien.length; index++) {
    if (mangNhanVien[index].account === maSinhVienClick) {
      //in thông tin sinh viên tìm thấy lên giao diện
      document.getElementById("tknv").value = mangNhanVien[index].account;
      document.getElementById("name").value = mangNhanVien[index].name;
      document.getElementById("email").value = mangNhanVien[index].email;
      document.getElementById("password").value = mangNhanVien[index].password;
      document.getElementById("datepicker").value =
        mangNhanVien[index].dateOfWork;
      document.getElementById("luongCB").value = mangNhanVien[index].salary;
      document.getElementById("chucvu").value = mangNhanVien[index].competence;
      document.getElementById("gioLam").value = mangNhanVien[index].timeWork;
      break;
    }
  }
  let isValid = validate();
  if (!isValid) {
    return;
  }
}
// cập nhật thông tin nhân viên
document.getElementById("btnCapNhat").onclick = function () {
  var nhanVienEdit = new NhanVien();

  var tagSelect = document.getElementById("chucvu");
  var viTriTheChon = tagSelect.selectedIndex;
  var competence = tagSelect.options[viTriTheChon].innerHTML;
  nhanVienEdit .competence = competence;
  console.log(nhanVienEdit.competence);
  // log tới đây vẫn là trưởng phòng 
  nhanVienEdit.account = document.getElementById("tknv").value;
  nhanVienEdit.name = document.getElementById("name").value;
  nhanVienEdit.email = document.getElementById("email").value;
  nhanVienEdit.password = document.getElementById("password").value;
  nhanVienEdit.dateOfWork = document.getElementById("datepicker").value;
  nhanVienEdit.salary = +document.getElementById("luongCB").value;
  nhanVienEdit.competence = competence;
  nhanVienEdit.timeWork = +document.getElementById("gioLam").value;
  for (var index = 0; index < mangNhanVien.length; index++) {
    if (mangNhanVien[index].account === nhanVienEdit.account) {
      mangNhanVien[index].name = nhanVienEdit.name;
      mangNhanVien[index].email = nhanVienEdit.email;
      mangNhanVien[index].password = nhanVienEdit.password;
      mangNhanVien[index].dateOfWork = nhanVienEdit.dateOfWork;
      mangNhanVien[index].salary = nhanVienEdit.salary;
      mangNhanVien[index].competence = nhanVienEdit.competence;
      mangNhanVien[index].timeWork = nhanVienEdit.timeWork;
      break;
    }
  }

  renderTableThemNhanVien(mangNhanVien);
  luuLocalStrage();
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
};

// lưu thông tin
function luulocalStorage() {
  var stringMangNhanVien = JSON.stringify(mangNhanVien);

  localStorage.setItem("mangNhanVien", stringMangNhanVien);
}
// lấy thông tin
function laylocalStorage() {
  if (localStorage.getItem("mangNhanVien")) {
    var stringMangNhanVien = localStorage.getItem("mangNhanVien");

    //Chuyển dữ string liệu về dạng object
    var mang = JSON.parse(stringMangNhanVien);
    console.log(mang);
    for (var i = 0; i < mang.length; i++) {
      var nv = new NhanVien();
      console.log(nv);
      nv.account = mang[i].account;
      nv.name = mang[i].name;
      nv.email = mang[i].email;
      nv.password = mang[i].password;
      nv.dateOfWork = mang[i].dateOfWork;
      nv.salary = mang[i].salary;
      nv.competence = mang[i].competence;
      nv.timeWork = mang[i].timeWork;
      nv.coefficientssalary = mang[i].coefficientssalary;
      mangNhanVien.push(nv);
    }
    console.log(mangNhanVien);
    //Gọi hàm tạo giao diện từ mảng
    renderTableThemNhanVien(mangNhanVien);
  }
}
laylocalStorage();


// tìm kiếm
document.getElementById('searchName').oninput = function() {
    searchNhanVien(mangNhanVien);   
    // searchAccount(mangNhanVien);
    // searchName(mangNhanVien);
}
// Hàm tìm kiếm nhân viên theo xếp loại
function searchNhanVien() {
  let search = document.querySelector("#searchName").value;
  let newNhanVien = mangNhanVien.filter((nv) => {
    let xepLoai = nv.classification().toLowerCase();
    search = search.toLowerCase();

    return xepLoai.indexOf(search) !== -1;
  });
  renderTableThemNhanVien(newNhanVien);
}
// Hàm tìm nhân viên theo account 
// function searchAccount() {
//   var account = document.getElementById('searchName').value;
//   // ouput: mangNhanVienTimKiem = [];
//   mangNhanVienTimKiem = [];
//   for(var i=0;i<mangNhanVien.length;i++) {
//     // lấy ra acount so sánh
//     if(mangNhanVien[i].account.search(account) !== -1) {
//       // tìm thấy
//       mangNhanVienTimKiem.push(mangNhanVien[i]);
//     }
//   }
//   renderTableThemNhanVien(mangNhanVienTimKiem);
// }

// Hàm tìm kiếm nhân viên theo name
// function searchName() {
//   var name = document.getElementById('searchName').value;
//   // ouput: mangNhanVienTimKiem = [];
//   mangNhanVienTimKiemName = [];
//   for(var i=0;i<mangNhanVien.length;i++) {
//     // lấy ra acount so sánh
//     if(mangNhanVien[i].name.search(name) !== -1) {
//       // tìm thấy
//       mangNhanVienTimKiemName.push(mangNhanVien[i]);
//     }
//   }
//   renderTableThemNhanVien( mangNhanVienTimKiemName);
// }