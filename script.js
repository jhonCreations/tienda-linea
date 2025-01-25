let cart = [];
/*getElementById selecciona el id que esta en el HTML*/
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart"); /*cierra*/ 
const checkoutButton = document.getElementById("checkout");
const totalElement = document.getElementById("total");/*suma total*/
const purchaseModal = document.getElementById("purchase-modal");
const closePurchase = document.getElementById("close-purchase");
/*Se agrega cada producto seleccionado usando el foreach*/
document.querySelectorAll(".add-to-cart").forEach((button)=>{

    button.addEventListener("click", function (event){
        event.preventDefault();
        const productCard = button.closest(".card-product");
        const productName = productCard.querySelector("h3").textContent;
        const productPrice = parseFloat(productCard.querySelector(".price").textContent.replace("$",""));
        const product = {name: productName, price: productPrice};
        cart.push(product);
        updateCartCount();
        saveCart();
        updateTotal();
    });
});

/* Actualizar*/ 
function updateCartCount() {
    cartCount.textContent = cart.length;
}
/*almacena en el local storange se guarda para que no se pierda de aqui se puede enviar a una base de datos*/
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
/*crea los productos, los va enlistando */
function displayCart() {
    cartItems.innerHTML = ``;
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });
}
/* Total*/
function updateTotal(){
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`; //colocar decimales
}

document.getElementById("cart-icon").addEventListener("click", function(){
    
    cartModal.style.display = "flex";/* flex para  que aparezca el modal*/
    displayCart();
    updateTotal();

});

closeCart.addEventListener("click", function(){ /*al dar clic a a X se culta el modal*/
    cartModal.style.display = "none";
});

checkoutButton.addEventListener("click", function() {

    purchaseModal.style.display = "flex"; /* para que aparezca */
    cart = [];
    updateCartCount();
    saveCart();
    updateTotal();
    cartModal.style.display = "none";

});

closePurchase.addEventListener("click", function(){
    purchaseModal.style.display ="none";/*ocultar modal */
});

function loadCart() { /*La informacion se vuelve a recuperar y se envia al JSON*/ 
    const saveCart = localStorage.getItem("cart");
    if(saveCart){
        cart = JSON.parse(saveCart);
        updateCartCount();
        updateTotal();
    }
}

loadCart();