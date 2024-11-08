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
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(li);
    });

    // Actualizar el total
    document.getElementById('total').innerText = `Total: $${total}`;

}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Eliminar el producto del carrito por índice
    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar el carrito actualizado
    loadCart(); // Recargar el carrito para reflejar los cambios
}

function validatePaymentForm() {
    // Obtener los valores de los campos
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Limpiar mensajes de error anteriores
    document.getElementById('card-name-error').innerText = "";
    document.getElementById('card-number-error').innerText = "";
    document.getElementById('expiry-date-error').innerText = "";
    document.getElementById('cvv-error').innerText = "";

    let isValid = true;

    // Validación del nombre en la tarjeta (sin números)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(cardName)) {
        document.getElementById('card-name-error').innerText = "El nombre no debe contener números.";
        isValid = false;
    }

    // Validación del número de tarjeta (solo números y al menos 16 dígitos, permitiendo espacios)
    const cleanedCardNumber = cardNumber.replace(/\s+/g, ''); // Quitar espacios para la validación
    const cardNumberRegex = /^\d+$/;
    if (!cardNumberRegex.test(cleanedCardNumber) || cleanedCardNumber.length < 16) {
        document.getElementById('card-number-error').innerText = "El número de tarjeta debe tener al menos 16 dígitos y no debe contener letras.";
        isValid = false;
    }

    // Validación de la fecha de expiración en formato MM/AA
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(expiryDate)) {
        document.getElementById('expiry-date-error').innerText = "La fecha debe tener el formato MM/AA.";
        isValid = false;
    }

    // Validación del CVV (exactamente 3 dígitos y solo números)
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
        document.getElementById('cvv-error').innerText = "El CVV debe tener 3 dígitos y no debe contener letras.";
        isValid = false;
    }

    return isValid;
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    if (validatePaymentForm()) {
        let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        alert(`Compra completada. Total de la compra tralizada: $${total}`);
        localStorage.removeItem("cart");
        loadCart();
        window.location.href = "Carrito.html";
    }
}


