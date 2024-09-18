document.addEventListener('DOMContentLoaded', () => {
    const cartSidebar = document.getElementById('cartSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const showCartSidebarBtn = document.getElementById('showCartSidebarBtn');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalsContainer = document.getElementById('cartTotals');

    // Function to show the cart sidebar
    function showCartSidebar() {
        fetchCartData(); // Fetch data when showing the sidebar
        cartSidebar.style.display = 'block';
    }

    // Function to hide the cart sidebar
    function hideCartSidebar() {
        cartSidebar.style.display = 'none';
    }

    // Event listener to close the sidebar
    closeSidebar.addEventListener('click', hideCartSidebar);

    // Show cart sidebar when the button is clicked
    showCartSidebarBtn.addEventListener('click', showCartSidebar);

    // Fetch cart data from the API and update the sidebar
    function fetchCartData() {
        fetch('https://dummyjson.com/carts')
            .then(res => res.json())
            .then(data => {
                updateCartSidebar(data.carts[0]); // Assuming you want to show the first cart
            })
            .catch(error => console.error('Error fetching cart data:', error));
    }

    // Function to update the cart sidebar with cart items and totals
    function updateCartSidebar(cart) {
        // Clear existing items
        cartItemsContainer.innerHTML = '';
        cartTotalsContainer.innerHTML = '';

        // Add cart items to the sidebar
        cart.products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'cart-item';
            productDiv.innerHTML = `
              <img src="${product.thumbnail}" alt="${product.title}" />
              <h4>${product.title}</h4>
              <p>Price: $${product.price.toFixed(2)}</p>
              <p>Quantity: ${product.quantity}</p>
              <p>Total: $${product.total.toFixed(2)}</p>
          `;
            cartItemsContainer.appendChild(productDiv);
        });

        // Add cart totals to the sidebar
        const totalsDiv = document.createElement('div');
        totalsDiv.className = 'cart-totals';
        totalsDiv.innerHTML = `
          <h4>Cart Totals</h4>
          <p>Total Quantity: ${cart.totalQuantity}</p>
          <p>Total Price: $${cart.total.toFixed(2)}</p>
          <p>Discounted Total: $${cart.discountedTotal.toFixed(2)}</p>
      `;
        cartTotalsContainer.appendChild(totalsDiv);
    }
});