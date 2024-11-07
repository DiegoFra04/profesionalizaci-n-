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

function validatePaymentForm() {
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Verificar si todos los campos están completos
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
        alert("Debe ingresar todos los datos de información de pago.");
        return false;
    }

    // Validación del nombre en la tarjeta (sin números)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(cardName)) {
        alert("El nombre en la tarjeta no debe contener números.");
        return false;
    }

    // Validación del número de tarjeta (solo números y al menos 10 dígitos, permitiendo espacios)
    const cleanedCardNumber = cardNumber.replace(/\s+/g, ''); // Quitar espacios para la validación
    const cardNumberRegex = /^\d+$/;
    if (!cardNumberRegex.test(cleanedCardNumber) || cleanedCardNumber.length < 16) {
        alert("El número de tarjeta debe tener al menos 16 dígitos y no debe contener letras.");
        return false;
    }


    // Validación de la fecha de expiración en formato MM/AA
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(expiryDate)) {
        alert("La fecha de expiración debe tener el formato MM/AA.");
        return false;
    }

    // Validación del CVV (exactamente 3 dígitos y solo números)
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
        alert("El CVV debe contener 3 dígitos y no debe tener letras.");
        return false;
    }

    return true;
}

function checkout() {
    // Verificar si hay productos en el carrito
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Validar el formulario de pago antes de procesar la compra
    if (validatePaymentForm()) {
        let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        alert(`Compra completada. Total a pagar: $${total}`);
        localStorage.removeItem("cart");
        loadCart();

        // Redirigir al usuario de vuelta a la página del carrito
        window.location.href = "Carrito.html";
    }
}


