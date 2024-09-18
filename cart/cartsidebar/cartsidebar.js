// cartSidebar.js

// Fetch cart data from the API
function fetchCartData() {
    fetch('https://dummyjson.com/carts/1')
        .then(res => res.json())
        .then(data => {
            // Pass the fetched data to the updateCartSidebar function
            updateCartSidebar(data);
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
        });
}

// Update the cart sidebar with the data received from the API
function updateCartSidebar(cartData) {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Clear current cart items
    cartItems.innerHTML = '';

    // Loop through each product in the cart and create list items
    cartData.products.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');

        // Product details
        cartItem.innerHTML = `
          <div>
              <img src="${product.thumbnail}" alt="${product.title}" style="width: 50px; height: auto;">
              <span>${product.title}</span>
              <span>Qty: ${product.quantity}</span>
          </div>
          <div>
              <span>${product.price} €</span>
          </div>
      `;

        cartItems.appendChild(cartItem);
    });

    // Update the total price
    cartTotal.textContent = `${cartData.discountedTotal} €`;

    // Show the sidebar
    document.getElementById('cartSidebar').style.display = 'block';
}

// Call the fetchCartData function when the page loads or when needed
fetchCartData();