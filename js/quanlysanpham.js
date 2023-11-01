// let product = [];
let product = [];

// đẩy  mảng product vào local
function save() {
    localStorage.setItem('listProduct', JSON.stringify(product));
}

function load() {
    product = JSON.parse(localStorage.getItem('listProduct'));
}
if (localStorage.getItem("listProduct") != null) {
    load();
}
let productAdmin = function () {
    let listProduct1 = "";
    for (let i in product) {
        let data = JSON.parse(JSON.stringify(product[i]))
        let listProduct1 = '<tr>'
        listProduct1 += '<td>' + data.id + '</td>'
        listProduct1 += '<td>' + data.name + '</td>'
        listProduct1 += '<td> <img src="img/' + data.img + '" width="50"></td>'
        listProduct1 += '<td> <img src="img/' + data.img2 + '" width="50"></td>'
        listProduct1 += '<td>' + data.price + '</td>'
        listProduct1 += '<td>' + data.pricea + '</td>'
        listProduct1 += '<td><button onclick="updateProduct(' + i + ')" class="btn-them-2" data-toggle="modal" data-target="#updateProduct"><i class="fas fa-cogs"></i></button></td>'
        listProduct1 += '<td><button onclick="deleteProduct(' + i + ')" class="btn-them-1"><i class="fas fa-trash"></i></button></td>'
        listProduct1 += '</tr>'
        document.getElementById("product-admin").innerHTML += listProduct1;
    } //save()
}
//// thêm sản phẩm
let addProduct = function () {
    let Product = {
        id: "SP" + parseInt(product.length + 1),
        name: document.getElementById("name").value,
        img: document.getElementById("img").value,
        img2: document.getElementById("img2").value,
        price: document.getElementById("price").value,
        pricea: document.getElementById("pricea").value,
        link: document.getElementById("link").value,
    }
    product.push(Product);
    localStorage.setItem('listProduct', JSON.stringify(product));
    window.location.reload();
}


///// sửa sản phẩm

let updateProduct = function (i) {
    let k = product[i];
    document.getElementById("idd").value = k.id;
    document.getElementById("named").value = k.name;
    document.getElementById("imgd").value = k.img;
    document.getElementById("imge").value = k.img2;
    document.getElementById("priced").value = k.price;
    document.getElementById("pricex").value = k.pricea;
    document.getElementById("linkk").value = k.link;
    document.getElementById("idd").setAttribute("disabled", "disabled");
    document.getElementById("submitUpdate").innerHTML = '<button class="btn btn-outline-danger mt-3" onclick="submitUpdate(' + i + ')">Đồng ý</button>';

}
let submitUpdate = function (i) {
    let k = product[i];
    k.id = document.getElementById("idd").value;
    k.name = document.getElementById("named").value;
    k.img = document.getElementById("imgd").value;
    k.img2 = document.getElementById("imge").value;
    k.price = document.getElementById("priced").value;
    k.pricea = document.getElementById("pricex").value;
    k.link = document.getElementById("linkk").value;
    localStorage.setItem('listProduct', JSON.stringify(product));
    window.location.reload();
}

///xóa

let deleteProduct = function (i) {
    let result = confirm("Bạn có muốn xóa sản phẩm này ?");
    if (result) {
        product.splice(i, 1);
        localStorage.setItem('listProduct', JSON.stringify(product));
        window.location.reload();
    }
}

productAdmin();
//    localStorage.clear();