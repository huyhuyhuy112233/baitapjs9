function NhanVien() {
    this.account = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.dateOfWork = "";
    this.salary = "";
    this.timeWork = "";
    this.coefficientssalary = "";
    this.competence = "";
    // this.tinhLuong =  function () {
    //     var tongLuong = this.salary * this.competence;
    //     return tongLuong;
    // }
}

NhanVien.prototype.calcSalary = function(){
    if(this.competence === "Sếp"){
        return this.salary * 3;
    }else if(this.competence === "Trưởng phòng"){
        return this.salary * 2;
    }else{
        return this.salary;
    }
}

NhanVien.prototype.classification = function(){
    if(this.timeWork >= 192){
        return "nhân viên xuất sắc";
    }else if(this.timeWork >= 176 && this.timeWork < 192){
        return "nhân viên giỏi";
    }else if(this.timeWork >= 160 && this.timeWork < 176){
        return "nhân viên khá";
    }else{
        return "nhân viên trung bình";
    }
}