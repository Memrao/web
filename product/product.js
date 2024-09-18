document.addEventListener('DOMContentLoaded', function() {

    const logoSrc = '../images/logo.png';
    const CATEGORY_API_URL = 'https://dummyjson.com/products/categories';

    // Navigation links
    const navLinks = [
        { href: 'index.html', text: 'HOME' },
        { href: 'index.html', text: 'SERVICES' },
        { href: '.index.html', text: 'ABOUT' },
        { href: '../product-listing/product-listing.html', text: 'SHOP' },
        { href: 'index.html', text: 'CONTACT' }
    ];

    // Get the navList element from the DOM
    const navList = document.getElementById('navList');

    // Create and append the logo dynamically
    const logoLi = document.createElement('li');
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('logo');
    const logoImg = document.createElement('img');
    logoImg.src = logoSrc;
    logoImg.alt = 'Logo Icon';
    logoDiv.appendChild(logoImg);
    logoLi.appendChild(logoDiv);
    navList.appendChild(logoLi);

    // Create and append the category dropdown icon
    const popupLi = document.createElement('li');
    const popupIcon = document.createElement('div');
    popupIcon.classList.add('category-toggle');
    popupIcon.innerHTML = '&#x25BC;'; // V-shaped arrow
    popupLi.appendChild(popupIcon);
    navList.appendChild(popupLi);

    // Create and append navigation links dynamically
    navLinks.forEach(link => {
        const navItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.text;
        navItem.appendChild(anchor);
        navList.appendChild(navItem);
    });

    // Create and append the shopping cart icon before the login button
    const cartLi = document.createElement('li');
    const cartIconDiv = document.createElement('div');
    cartIconDiv.classList.add('cart-icon');
    cartIconDiv.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
    cartLi.appendChild(cartIconDiv);
    navList.appendChild(cartLi);

    // Add the login button
    const loginLi = document.createElement('li');
    const loginDiv = document.createElement('div');
    loginDiv.classList.add('login');
    loginDiv.id = 'loginBtn';
    loginDiv.textContent = 'LOGIN';
    loginLi.appendChild(loginDiv);
    navList.appendChild(loginLi);

    // Create and append the category dropdown
    const dropdownLi = document.createElement('li');
    const categoryDropdown = document.createElement('div');
    categoryDropdown.classList.add('category-dropdown');
    categoryDropdown.id = 'categoryDropdown';
    categoryDropdown.style.display = 'none'; // Initially hidden
    dropdownLi.appendChild(categoryDropdown);
    navList.appendChild(dropdownLi);

    // Create and append the close button for the dropdown
    const closeButton = document.createElement('span');
    closeButton.id = 'closeDropdown';
    closeButton.textContent = 'X';
    closeButton.style.cursor = 'pointer';
    categoryDropdown.appendChild(closeButton);

    // Create and append the list for categories
    const categoryList = document.createElement('ul');
    categoryList.id = 'categoryList';
    categoryDropdown.appendChild(categoryList);

    // Function to fetch and populate categories in the dropdown
    async function fetchCategories() {
        try {
            const res = await fetch(CATEGORY_API_URL);
            const data = await res.json();
            const categories = data.categories; // Adjust if needed based on the response structure

            categoryList.innerHTML = ''; // Clear any existing categories

            categories.forEach(category => {
                const li = document.createElement('li');
                li.textContent = category; // Directly using category as response seems to be an array of strings
                categoryList.appendChild(li);
            });
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    }

    // Toggle dropdown and change icon
    const categoryIcon = document.querySelector('.category-toggle');

    // Event listener for category dropdown toggle
    categoryIcon.addEventListener('click', () => {
        const isDropdownVisible = categoryDropdown.style.display === 'block';
        if (isDropdownVisible) {
            categoryDropdown.style.display = 'none';
            categoryIcon.innerHTML = '&#x25BC;'; // Change back to V-shaped arrow
        } else {
            categoryDropdown.style.display = 'block';
            categoryIcon.innerHTML = '&#x25B2;'; // Change to A-shaped arrow
            fetchCategories(); // Fetch and display categories if not already done
        }
    });

    // Close the dropdown when the close button (X) is clicked
    closeButton.addEventListener('click', () => {
        categoryDropdown.style.display = 'none';
        categoryIcon.innerHTML = '&#x25BC;'; // Change back to V-shaped arrow
    });

    // Close the dropdown when clicking outside the dropdown content
    window.addEventListener('click', (event) => {
        if (!categoryDropdown.contains(event.target) && !categoryIcon.contains(event.target)) {
            categoryDropdown.style.display = 'none';
            categoryIcon.innerHTML = '&#x25BC;'; // Change back to V-shaped arrow
        }
    });

    // Initialize the page
    fetchCategories(); // Fetch and add categories to the dropdown
});



//product id
document.addEventListener('DOMContentLoaded', async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        try {
            const product = await fetchProductDetails(productId);
            displayProductDetails(product);
        } catch (error) {
            console.error('Error fetching product details:', error);
            document.getElementById('productDetails').innerHTML = '<p>Unable to load product details. Please try again later.</p>';
        }
    } else {
        document.getElementById('productDetails').innerHTML = '<p>No product selected.</p>';
    }
});

async function fetchProductDetails(productId) {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Create background video container
document.addEventListener('DOMContentLoaded', () => {

    const videoContainer = document.createElement('div');
    videoContainer.id = 'backgroundVideoContainer';
    videoContainer.classList.add('background-video');

    // Create video element
    const videoElement = document.createElement('video');
    videoElement.id = 'backgroundVideo';
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = true;

    // Create source element for the video
    const sourceElement = document.createElement('source');
    sourceElement.src = 'cart.mp4'; // Replace with the path to your video
    sourceElement.type = 'video/mp4';

    // Append source to video element
    videoElement.appendChild(sourceElement);

    // Append video element to video container
    videoContainer.appendChild(videoElement);

    // Append video container to body
    document.body.insertBefore(videoContainer, document.getElementById('productDetails'));
});

// Display Product Details Function
function displayProductDetails(product) {
    const productDetails = document.getElementById('productDetails');

    // Generate star rating HTML
    const rating = product.rating || 0;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const starsHTML = `
        ${'<span class="star full">&#9733;</span>'.repeat(fullStars)}
        ${halfStar ? '<span class="star half">&#9733;</span>' : ''}
        ${'<span class="star empty">&#9734;</span>'.repeat(emptyStars)}
    `;

    // Generate reviews HTML with images
    const reviewsHTML = product.reviews ? product.reviews.map(review => `
        <div class="review">
            ${review.image ? `<img src="${review.image}" alt="Review Image">` : ''}
            <strong>${review.reviewerName}</strong> (${review.rating} stars)
            <p>${review.comment}</p>
            <small>${new Date(review.date).toLocaleDateString()}</small>
        </div>
    `).join('') : '';

    // Add "Add to Cart" button
    const addToCartButtonHTML = `
        <button id="addToCartButton" class="add-to-cart-button">Add to Cart</button>
    `;

    productDetails.innerHTML = `
        <img src="${product.thumbnail || 'default-thumbnail.png'}" alt="${product.title || 'Product Image'}" class="product-image">
        <div class="product-info">
            <h1 class="product-title"><span>${product.title || 'Product Title'}</span></h1>
            <p class="product-description">${product.description || 'No description available'}</p>
            <p class="product-price">$${product.price || 'N/A'}</p>
            <p class="product-rating">${starsHTML} (${rating.toFixed(1) || 'No rating available'})</p>
            ${addToCartButtonHTML}
        </div>
        <div class="product-additional-info">
            <div class="product-details">
                <p><strong>Stock:</strong> ${product.stock || 'N/A'}</p>
                <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
                <p><strong>Brand:</strong> ${product.brand || 'N/A'}</p>
                <p><strong>SKU:</strong> ${product.sku || 'N/A'}</p>
                <p><strong>Warranty:</strong> ${product.warrantyInformation || 'N/A'}</p>
                <p><strong>Shipping Info:</strong> ${product.shippingInformation || 'N/A'}</p>
                <p><strong>Return Policy:</strong> ${product.returnPolicy || 'N/A'}</p>
            </div>
            <div class="product-reviews">
                <h2>Reviews</h2>
                ${reviewsHTML}
            </div>
        </div>
    `;

    // Add event listener for the "Add to Cart" button
    const addToCartButton = document.getElementById('addToCartButton');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
        });
    }
}


// Function to add a product to the cart
function addToCart(product) {
    console.log('Product added to cart:', product);

    // Initialize cart if it does not exist
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = { products: [] };
    }

    // Add the product to the cart
    cart.products.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show popup message
    showPopup('Product added to cart!');

    // Update the cart sidebar with the latest cart contents
    updateCart();
}
let cart = [];

// Get elements
const cartCountElement = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsElement = document.getElementById('cart-items');
const closeSidebarButton = document.getElementById('close-sidebar');
const cartIcon = document.querySelector('.cart-icon');

// Add to Cart Button Click Handler
function addToCart(product) {
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // If exists, update the quantity
        existingProduct.quantity += 1;
    } else {
        // If not exists, add new product with quantity 1
        cart.push({ ...product, quantity: 1 });
    }

    // Update cart count
    cartCountElement.innerText = cart.reduce((total, item) => total + item.quantity, 0);

    // Store updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update sidebar and open it
    updateCartSidebar();
    openCartSidebar();

    // Show popup message
    showPopup(`${product.title} has been added to the cart!`);
}

// Update Cart Sidebar with Products
function updateCartSidebar() {
    cartItemsElement.innerHTML = ''; // Clear existing cart items
    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        
        productDiv.innerHTML = `
            <img src="${item.thumbnail || 'default-thumbnail.png'}" alt="${item.title || 'Product Image'}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price} x ${item.quantity}</p>
                <div class="cart-item-actions">
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
        `;
        cartItemsElement.appendChild(productDiv);
    });

    // Add event listeners for remove and quantity buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            changeQuantity(productId, 1);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            changeQuantity(productId, -1);
        });
    });
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSidebar();
}

// Function to change the quantity of a product in the cart
function changeQuantity(productId, delta) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += delta;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSidebar();
        }
    }
}

// Open the cart sidebar
function openCartSidebar() {
    cartSidebar.classList.add('open');
}

// Close the cart sidebar
closeSidebarButton.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Toggle the cart sidebar when the cart icon is clicked
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
});

// Sample product add function (Assuming you have multiple products)
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = {
            id: e.target.getAttribute('data-id'),
            title: e.target.getAttribute('data-title'),
            price: parseFloat(e.target.getAttribute('data-price')),
            thumbnail: e.target.getAttribute('data-thumbnail')
        };

        addToCart(product);
        showPopup('Product added to cart!');
    });
});

// Function to show a popup message
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000); // Hide popup after 3 seconds
}

// Function to update the cart with items from an external API (Optional)
async function updateCart() {
    try {
        const response = await fetch('https://dummyjson.com/carts/1');
        const fetchedCart = await response.json();

        if (fetchedCart && fetchedCart.products) {
            fetchedCart.products.forEach(fetchedProduct => {
                const localProduct = cart.find(item => item.id === fetchedProduct.id);
                if (localProduct) {
                    localProduct.quantity += fetchedProduct.quantity;
                } else {
                    cart.push(fetchedProduct);
                }
            });

            // Store merged cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSidebar(); // Update the sidebar with merged cart data
        }
    } catch (error) {
        console.error('Failed to update cart:', error);
    }
}

// Load cart from localStorage on page load
window.addEventListener('load', () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        cartCountElement.innerText = cart.reduce((total, item) => total + item.quantity, 0);
        updateCartSidebar();
    }
});




document.addEventListener('DOMContentLoaded', function() {
    // Function to load footer content
    function loadFooterContent() {
        const footerContent = document.getElementById('footerContent');
        if (footerContent) {
            const footerHTML = `
                <div class="container" style="display: flex; justify-content: space-around; gap: 20px; flex-wrap: wrap; background-color: #333; color: #fff; padding: 20px;">
                    <div class="footer-section" style="text-align: left; max-width: 200px;">
                        <h3 style="color: #fff;">INFORMATION</h3>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by.</p>
                    </div>
                    <div class="footer-section" style="text-align: left; max-width: 200px;">
                        <h3 style="color: #fff;">LET US HELP YOU</h3>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by.</p>
                    </div>
                    <div class="footer-section" style="text-align: left; max-width: 200px;">
                        <h3 style="color: #fff;">USEFUL LINKS</h3>
                        <ul style="list-style-type: none; padding: 0;">
                            <li><a href="#" style="text-decoration: none; color: #fff;">About Us</a></li>
                            <li><a href="#" style="text-decoration: none; color: #fff;">Careers</a></li>
                            <li><a href="#" style="text-decoration: none; color: #fff;">Sell on Shopee</a></li>
                            <li><a href="#" style="text-decoration: none; color: #fff;">Press & News</a></li>
                            <li><a href="#" style="text-decoration: none; color: #fff;">Competitions</a></li>
                            <li><a href="#" style="text-decoration: none; color: #fff;">Terms & Conditions</a></li>
                        </ul>
                        <div style="margin-top: 10px;">
                            <input type="email" placeholder="Enter your email" style="padding: 5px; width: 70%; margin-right: 5px;">
                            <button class="btn" style="padding: 5px 10px;">SUBSCRIBE</button>
                        </div>
                    </div>
                    <div class="footer-section" style="text-align: left; max-width: 200px;">
                        <h3 style="color: #fff;">OUR DESIGN</h3>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by.</p>
                    </div>
                </div>
              
            `;
            footerContent.innerHTML = footerHTML;
        } else {
            console.error('Footer content container not found.');
        }
    }
    loadFooterContent(); // Load footer content initially
});