let userrrr = [
    {
        id: "U1",
        username: "admin",
        mmail: "phu1999@gmail.com",
        password: "0123456789",
        role: "admin"
    },
    {
        id: "U2",
        username: "phu",
        mmail: "phu1998@gmail.com",
        password: "01234567",
        role: 'user'
    }
];
let saveUser = function () {
    localStorage.setItem('llistUserr', JSON.stringify(userrrr));
}
//lấy list user
let loadUser = function () {
    userrrr = JSON.parse(localStorage.getItem('llistUserr'));
}
if (localStorage.getItem("llistUserr") != null) {
    loadUser();
}
saveUser();

function validate() {
    let u = document.getElementById("username").value;
    let m = document.getElementById("mail").value;
    let p1 = document.getElementById("password").value;
    let p2 = document.getElementById("password-repeat").value;

    if(!validatedn() || !validateEmail() || !validateMk()){
        k =0;
        if (u == "") {
            alert("vui lòng nhập tên!");
            return false;
        }
        if ((p1 == "") || (p1.length < 8)) {
            alert("vui lòng nhập mật khẩu!");
            return false;
        }
        if (p2 == "") {
            alert("vui lòng xác minh mật khẩu!");
            return false;
        }
        if ((u != "") && (p1 == p2)) {
            let k = 0;
            for (let i in userrrr) {
                let data = JSON.parse(JSON.stringify(userrrr[i]))
    
                if (u === data.username) {
                    k++;
                    break;
                }
            }
            if (k != 0) {
                alert("tài khoản đã tồn tại");
                window.Location.reload();
                return false;
            } else {
                let Userrr = {
                    id: "U" + parseInt(userrrr.length + 1),
                    username: u,
                    password: p1,
                    mmail: m,
                    role: "userr"
                }
                userrrr.push(Userrr);
                localStorage.setItem('llistUserr', JSON.stringify(userrrr));
                alert("Đăng kí thành công");
                location.assign("trangchu.html");
                return true;
            }
        }
    }
}
let nameDk = document.getElementById('name');
let emailDk = document.getElementById('email');

function validatedn() {
    let u = document.getElementById("username").value;

    if (u.length == 0) {
        nameDk.innerHTML = 'Vui lòng nhập tên';
        return false;
    }
    if (!u.match(/^[A-Za-z]*\s{0}[A-Za-z]*$/)) {
        nameDk.innerHTML = ''
        return false;
    }
    nameDk.innerHTML = '';
    return true;
}

function validateEmail() {
    var m = document.getElementById("mail").value;
    if (m.length == 0) {
        emailDk.innerHTML = 'Email của bạn không được để trống';
        return false;
    }
    if (!m.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailDk.innerHTML = 'Email của bạn nhập sai định dạng';
        return false;
    }
    emailDk.innerHTML = '';
    return true;
}

function validateMk() {
    let p1 = document.getElementById("password").value;
    let yeu = document.getElementById("yeu");
    let binhthuong = document.getElementById("binhthuong");
    let manh = document.getElementById("manh");

    let chu = /[a-z]/;
    let so = /\d+/;
    let kyhieu = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;


    if (p1.length <= 1 &&
        (p1.match(chu) ||
            p1.match(so) ||
            p1.match(kyhieu))) no = 1;
    if (p1.length >= 2 &&
        ((p1.match(chu) &&
                p1.match(so)) ||
            (p1.match(so) &&
                p1.match(kyhieu)) ||
            (p1.match(chu) &&
                p1.match(kyhieu)))) no = 2;
    if (p1.length >= 2 &&
        p1.match(chu) &&
        p1.match(so) &&
        p1.match(kyhieu)) no = 3;
    if(no==1){
        yeu.innerHTML ="Mật khẩu của bạn yếu";
        return false;        
    }
    if (no==2){
        yeu.style.display = "none";
        binhthuong.innerHTML="Mật khẩu bình thường";
        return false;
    } 
    if (no==3){
        binhthuong.style.display = "none";
        manh.innerHTML=""
        return true;
    }
}
