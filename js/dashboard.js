
function renderProducts() {
    let eTbodyMain = document.querySelector("#tbodyMain");

    let str = "";
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].price * products[i].quantity;
        str += `
            <tr id='tr_${products[i].id}'>
            <td>${products[i].id}</td>
            <td>${products[i].name}</td>
            <td>${products[i].category.name}</td>
            <td>${products[i].quantity}</td>
            <td>${formatCurrency(parseInt(products[i].price))}</td>
            <td>${formatCurrency(parseInt(products[i].quantity * products[i].price))}</td>
            <td>
            <a  class="btn btn-edit" onclick="handleItemClick(${products[i].id})"
                ><i class="fa-solid fa-pen-to-square"></i
            ></a>
            <a class="btn btn-delete" onclick="handleRemoveItemClick(${products[i].id})"
                ><i class="fa-solid fa-trash"></i
            ></a>
            </td>
        </tr>
        `
    }

    str += `
        <tr>
        <td colspan="5" class="tb-last-row tb-last-row-total">
        Total amount
        </td>
        <td class="tb-last-row">${formatCurrency(parseInt(total))}</td>
        <td></td>
    </tr>
    `

    eTbodyMain.innerHTML = str;
}
renderProducts();

function handleBtnAdd() {
    let name = document.querySelector(".frmCreate input[name='txtName'").value;
    let price = document.querySelector(".frmCreate input[name='txtPrice'").value;
    let quantity = document.querySelector(".frmCreate input[name='txtQuantity'").value;
    let categoryId = document.querySelector(".frmCreate select[name='sCategory'").value;

    let cate = findCategoryById(categoryId);
    let pNew = new Product(findMaxId(), name, price, quantity, cate);

    if (validateProduct(pNew) == true) {
        products.push(pNew);
        localStorage.setItem("KEY_PRODUCTS", JSON.stringify(products));
        renderProducts();
    }
}
function findMaxId() {
    let productsCopy = [...products];
    productsCopy.sort((a, b) => a.id - b.id);
    return productsCopy[productsCopy.length - 1].id + 1;
}
function findCategoryById(categoryId) {
    let cate = null;
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id == categoryId) {
            cate = categories[i];
        }
    }
    return cate;

}
function validateProduct(product) {

    let errors = [];
    if (product.name == "") {
        errors.push("Please enter a name");
    }
    if (product.price == "") {
        errors.push("Price must be a number");
    }
    if (product.quantity == "") {
        errors.push("Price must be a number");
    }
    if (errors.length > 0) {
        let messages = "";
        for (let i = 0; i < errors.length; i++) {
            messages += errors[i] + "\n";
        }
        alert(messages);
        return false;
    }
    return true;
}

function handleItemClick(id) {

    if (isEditing == false) {
        isEditing = true;
        let product = findProductById(id);
        let tdName = document.querySelectorAll(`#tr_${id} td`)[1];
        let tdCategory = document.querySelectorAll(`#tr_${id} td`)[2];
        let tdQuantity = document.querySelectorAll(`#tr_${id} td`)[3];
        let tdPrice = document.querySelectorAll(`#tr_${id} td`)[4];
        let tdAction = document.querySelectorAll(`#tr_${id} td`)[6];

        tdName.innerHTML = `<input name="itemName" type='text' value='${product.name}' />`
        tdQuantity.innerHTML = `<input name="itemQuantity" type='number' value='${product.quantity}' />`;
        tdPrice.innerHTML = `<input name="itemPrice" type='number' value='${product.price}' />`;

        let strSelect = "";
        strSelect += '<select name="itemCategory">';
        for (let i = 0; i < categories.length; i++) {
            strSelect += `<option value="${categories[i].id}">${categories[i].name}</option>`;
        }
        strSelect += '</select>';
        tdCategory.innerHTML = strSelect;

        //<i class="fa-solid fa-check"></i>
        tdAction.innerHTML = `
        <a class="btn btn-edit" onclick="handleUpdate(${id})">
            
            <i class="fa-solid fa-pen-to-square"></i>
        </a>
        <a class="btn btn-delete" onclick='handleCancel(${id})'>
            <i class="fa-solid fa-xmark"></i>
        </a>
        `;

        let eInputQuantity = document.querySelector('input[name="itemQuantity"]');
        eInputQuantity.addEventListener('input', (evt) => {
            let eInputPrice = document.querySelector('input[name="itemPrice"]');
            let tdAmount = document.querySelectorAll(`#tr_${id} td`)[5];

            tdAmount.innerText = formatCurrency(parseInt(eInputPrice.value * evt.target.value));
        })

        let eInputPrice = document.querySelector('input[name="itemPrice"]');

        eInputPrice.addEventListener('input', (evt) => {
            let eInputQuantity = document.querySelector('input[name="itemQuantity"]');
            let tdAmount = document.querySelectorAll(`#tr_${id} td`)[5];

            tdAmount.innerText = formatCurrency(parseInt(eInputQuantity.value * evt.target.value));
        });
    }

}
function handleUpdate(id) {
    let name = document.querySelector(`input[name="itemName"]`).value;
    let price = document.querySelector(`input[name="itemPrice"]`).value;
    let quantity = document.querySelector(`input[name="itemQuantity"]`).value;
    let categoryId = document.querySelector(`select[name="itemCategory"]`).value;

    let cate = findCategoryById(categoryId);
    //constructor(id, name, price, quantity, category)
    let productUpdate = new Product(id, name, price, quantity, cate);
    if (validateProduct(productUpdate)) {
        updateProduct(id, productUpdate);
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
        renderProducts();
    }
}
function updateProduct(id, productUpdate) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].name = productUpdate.name;
            products[i].price = productUpdate.price;
            products[i].quantity = productUpdate.quantity;
            products[i].category = productUpdate.category;
            products[i].amount = products[i].price * products[i].quantity;
        }
    }
    isEditing = false;
}
function handleCancel(id) {
    isEditing = false;
    let product = findProductById(id);
    document.querySelectorAll(`#tr_${id} td`)[1].innerText = product.name;
    document.querySelectorAll(`#tr_${id} td`)[2].innerText = product.category.name;
    document.querySelectorAll(`#tr_${id} td`)[3].innerText = product.quantity;
    document.querySelectorAll(`#tr_${id} td`)[4].innerText = formatCurrency(parseInt(product.price));
    document.querySelectorAll(`#tr_${id} td`)[5].innerText = formatCurrency(parseInt(product.price * product.quantity));

    document.querySelectorAll(`#tr_${id} td`)[6].innerHTML = `
        <a  class="btn btn-edit" onclick="handleItemClick(${product.id})"
                ><i class="fa-solid fa-pen-to-square"></i>
        </a>
        <a class="btn btn-delete" onclick="handleRemoveItemClick(${product.id})"
                ><i class="fa-solid fa-trash"></i>
        </a>`;
}
function findProductById(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            return products[i];
        }
    }
    return null;
}
function handleRemoveItemClick(id) {
    let product = findProductById(id);
    let check = confirm(`Bạn chắc chắn muốn xóa  ${product.name}`);
    if (check) {
        deleteProductById(id);
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
        renderProducts();
    }
}
function deleteProductById(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products.splice(i, 1);
            break;
        }
    }
}