// Mostrar botón de carrito si existe en localStorage
showButtonCart();

async function addToCart(pid) {
  let cartId = localStorage.getItem('cartId');

  // Si no existe carrito, crear uno nuevo
  if (!cartId) {
    const createCartResponse = await fetch('/api/carts', {
      method: 'POST'
    });

    const createCart = await createCartResponse.json();

    if (createCart.status === 'error') {
      return alert(createCart.message);
    }

    console.log(createCart);

    cartId = createCart.data._id; // ✅ usar "data" en lugar de "payload"
    localStorage.setItem('cartId', cartId);
  }

  // Agregar producto al carrito
  const addProductResponse = await fetch(`/api/carts/${cartId}/products/${pid}`, { // ✅ plural
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: 1 }) // opcional, si tu backend lo requiere
  });

  const addProduct = await addProductResponse.json();

  if (addProduct.status === 'error') {
    return alert(addProduct.message);
  }

  showButtonCart();

  alert('Producto añadido satisfactoriamente!');
}

function showButtonCart() {
  const cartId = localStorage.getItem('cartId'); // ✅ usar const

  if (cartId) {
    document.querySelector('#button-cart').setAttribute("href", `/cart/${cartId}`);
    document.querySelector('.view-cart').style.display = "block";
  }
}

// Finalizar compra
async function finalizeCartPurchase(cartId) {
  try {
    if (!cartId) {
      return alert('No hay carrito activo');
    }

    const response = await fetch(`/api/carts/${cartId}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();

    if (result.status === 'error') {
      return alert(result.message);
    }

    // Ticket generado
    if (result.ticket) {
      alert(`Compra finalizada!\nCódigo: ${result.ticket.code}\nMonto: $${result.ticket.amount}`);
    }

    // Productos no cumplidos
    if (result.unfulfilledItems && result.unfulfilledItems.length > 0) {
      const items = result.unfulfilledItems.map(p => p.title).join(', ');
      alert(`Los siguientes productos no pudieron procesarse: ${items}`);
    }

    // Redirigir al carrito para mostrar ticket y productos no disponibles
    window.location.href = `/cart/${cartId}`;

  } catch (error) {
    console.error('Error al finalizar compra:', error);
    alert('Error al finalizar la compra. Intenta nuevamente.');
  }
}