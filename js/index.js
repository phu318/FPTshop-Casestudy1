function renderProductsIndexPage() {
    let eMainProducts = document.querySelector(".main-product");

    let str = "";
    for (let i = 0; i < products.length; i++) {
        str += `
        <div class="product">
        <img
          src="./image/macbook-air-m1-2020-gray-600x600.jpg"
          alt=""
          srcset=""
        />
        <h4>${products[i].name}</h4>
            <p>${formatCurrency(products[i].price)}</p>
          <button class="btn btn-primary">Mua Hàng</button>
        
      </div>
        `;
    }
    eMainProducts.innerHTML = str;
}
renderProductsIndexPage();

function handleProfileClick() {
    document.querySelector(".cart").classList.toggle('show');
}
let modal = document.querySelector(".cart");
let profile = document.querySelector(".icon-profile");

window.onclick = function (event) {
    if (event.target !== modal && event.target !== profile) {
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    }
}