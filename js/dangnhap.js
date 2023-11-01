let userrrr =[];
let loadUser = function(){
    userrrr =  JSON.parse(localStorage.getItem('llistUserr'))
}
//if(localStorage.getItem("listUser")!=null){

    loadUser();
//}
let nameF = document.getElementById('name');
let pass = document.getElementById('pass');
function validatedn(){
    let uu = document.getElementById("username1").value;

    if(uu.length == 0){
        nameF.innerHTML ='Vui lòng nhập tên';
        return false;
    }
    if(!uu.match(/^[A-Za-z]*\s{0}[A-Za-z]*$/)){
        nameF.innerHTML = ''
        return false;
    }
    nameF.innerHTML = '';
    // return true;
}

function validatepass(){
        let pu1 = document.getElementById("password1").value;
        let required = 9;
        let left = required - pu1.length;
        if(left > 0){
            pass.innerHTML ='Bạn nhập mật khẩu nhiều hơn' + left;
            return false;
        }
        pass.innerHTML = '';
        return true;
}

function validate(){
    let uu = document.getElementById("username1").value;
    let pu1 = document.getElementById("password1").value;

    if(!validatedn() || !validatepass()){ 
        let k = 0;
        for(let i in userrrr){
            k++;
            let data = JSON.parse(JSON.stringify(userrrr[i]))
            if(
                ((uu == data.username)&&
                (pu1 == data.password)
                &&(data.role == "admin")   ))
                {
                    alert("Đăng nhập thành công");
                    location.assign("admin.html");
                    return true;
                }
                if(
                    ((uu == data.username)&&
                    (pu1 == data.password)
                    && (data.role=="userr")) )
                {
                    alert("Đăng nhập thành công");
                    k=i;
                    window.location.href='trangchu.html';
                    return true;
                }
        }
        if(k==userrrr.length){
            alert("Tài khoản không có !!!");
            document.getElementById("username1").value="";
            document.getElementById("password1").value="";
            return true;
        }
    }
}
