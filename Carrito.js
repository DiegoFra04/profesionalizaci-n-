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
            ${item.name} (${item.quantity}) = $${itemTotal}
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
    // Obtener los valores de los campos del formulario
    const name = document.getElementById("card-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    let isValid = true;

    // Validar Nombre en la Tarjeta (no vacío, solo letras y espacios)
    if (name === "") {
        showError("card-name-error", "El nombre no puede estar vacío.");
        isValid = false;
    } else if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/.test(name)) {
        showError("card-name-error", "El nombre solo debe contener letras y espacios.");
        isValid = false;
    } else {
        clearError("card-name-error");
    }

    // Validar Número de Tarjeta (16 dígitos exactos)
    if (cardNumber === "") {
        showError("card-number-error", "El número de tarjeta no puede estar vacío.");
        isValid = false;
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ''))) {
        showError("card-number-error", "El número de tarjeta debe tener 16 dígitos.");
        isValid = false;
    } else {
        clearError("card-number-error");
    }

    // Validar Fecha de Expiración (formato MM/AA)
    if (expiryDate === "") {
        showError("expiry-date-error", "La fecha de expiración no puede estar vacía.");
        isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        showError("expiry-date-error", "La fecha debe tener el formato MM/AA.");
        isValid = false;
    } else {
        clearError("expiry-date-error");
    }

    // Validar CVV (3 dígitos exactos)
    if (cvv === "") {
        showError("cvv-error", "El CVV no puede estar vacío.");
        isValid = false;
    } else if (!/^\d{3}$/.test(cvv)) {
        showError("cvv-error", "El CVV debe tener 3 dígitos.");
        isValid = false;
    } else {
        clearError("cvv-error");
    }

    // Si todas las validaciones son correctas
    if (isValid) {
        alert("Pago confirmado");
    }


    return isValid;

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
    
    // Función para limpiar mensajes de error
    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }
}



function checkout() {
    // Obtener el carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verificar si el carrito está vacío
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    if (validatePaymentForm()) {
        // Calcular el total
        let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        
        alert(`Compra completada. El total de la compra realizada fue de: $${total}`);

        // Evitar limpiar el carrito si el pago fue exitoso.
        
        // Redirigir al ticket de compra
        window.location.href = "ticket.html";
        } else {
            alert("Por favor, complete la información de pago correctamente.");
        }
    }

    function checkCart() {
        // Obtener el carrito desde localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Verificar si el carrito está vacío
        if (cart.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        
        // Si hay productos en el carrito, redirigir a la página de pago
        window.location.href = "pago.html";
    }


