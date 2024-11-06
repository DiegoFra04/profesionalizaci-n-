window.onload = function() {
    loadCart();
};

function loadCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    // Obtener el carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Mostrar cada producto en el carrito
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}
                        <button onclick="removeFromCart('${item.name}')">Eliminar</button>`;
        cartItems.appendChild(li);
    });

    document.getElementById('total').innerText = `Total: $${total}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Función para finalizar la compra
function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
        let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        alert(`Compra completada. Total a pagar: $${total}`);
        localStorage.removeItem("cart");
        loadCart();
    } else {
        alert("El carrito está vacío.");
    }
}