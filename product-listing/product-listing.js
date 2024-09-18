//header
document.addEventListener('DOMContentLoaded', function() {

    const logoSrc = '../images/logo.png';
    const CATEGORY_API_URL = 'https://dummyjson.com/products/categories';

    // Navigation links
    const navLinks = [
        { href: 'index.html', text: 'HOME' },
        { href: 'index.html', text: 'SERVICES' },
        { href: 'index.html', text: 'ABOUT' },
        { href: '../category/category.html', text: 'CATEGORY' },
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

    // Modal Popup functionality for category modal (if needed)
    const categoryModal = document.getElementById('categoryModal');
    const closeModal = document.getElementById('closeModal');

    // Show the modal when the popup icon is clicked (if you want to keep the old modal functionality)
    if (popupIcon) {
        popupIcon.addEventListener('click', () => {
            if (categoryModal) {
                categoryModal.style.display = 'block';
            }
        });
    }

    // Close the modal when the close button (X) is clicked
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (categoryModal) {
                categoryModal.style.display = 'none';
            }
        });
    }

    // Close the modal when clicking outside the modal content
    if (categoryModal) {
        window.addEventListener('click', (event) => {
            if (event.target === categoryModal) {
                categoryModal.style.display = 'none';
            }
        });
    }

    // Initialize the page
    fetchCategories(); // Fetch and add categories to the dropdown
});







//products fetching
document.addEventListener("DOMContentLoaded", async() => {
    const productGrid = document.getElementById("productGrid");
    const pagination = document.getElementById("pagination");

    let currentPage = 1;
    const productsPerPage = 12;
    const totalProducts = 194; // Total number of products from API
    const maxPageButtons = 5; // Number of pagination buttons to show

    // Function to fetch products from API
    async function fetchProducts(page) {
        try {
            const res = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${(page - 1) * productsPerPage}`);
            const data = await res.json();
            return data.products || [];
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }
    // Function to render products to the page
    function renderProducts(products) {
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = ''; // Clear previous products

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.id = product.id; // Add product ID to the card

            // Generate star rating
            const rating = product.rating || 0;
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;

            // Create star elements
            const starsHTML = `
            ${'<span class="star full">&#9733;</span>'.repeat(fullStars)}
            ${halfStar ? '<span class="star half">&#9733;</span>' : ''}
            ${'<span class="star empty">&#9734;</span>'.repeat(emptyStars)}
        `;

            // Append product details including description
            productCard.innerHTML = `
            <img src="${product.thumbnail || 'default-thumbnail.png'}" alt="${product.title || 'Product Image'}">
            <h3>${product.title || 'Product Title'}</h3>
             <p class="description">${product.description || 'No description available'}</p> 
            <p class="price">$${product.price || 'N/A'}</p>
            <div class="rating">
                ${starsHTML} (${rating.toFixed(1) || 'No rating available'})
            </div>
           
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

            productGrid.appendChild(productCard);

            // Add event listener for product click
            productCard.addEventListener('click', () => {
                window.location.href = `../product/product.html?id=${product.id}`;
            });
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent click from bubbling to productCard
                const productId = event.target.dataset.id;
                addToCart(productId);
            });

            // Add event listener for product click
            productCard.addEventListener('click', () => {
                window.location.href = `../product/product.html?id=${product.id}`;
            });
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent click from bubbling to productCard
                const productId = event.target.dataset.id;
                addToCart(productId);
            });
        });


        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent click from bubbling to productCard
                const productId = event.target.dataset.id;
                addToCart(productId);
            });
        });






        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                addToCart(productId);
            });
        });
    }

    // Function to render pagination buttons
    function renderPagination(totalProducts) {
        pagination.innerHTML = ''; // Clear previous pagination
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        // Previous page button
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Prev';
            prevButton.addEventListener('click', () => {
                currentPage--;
                loadProducts();
            });
            pagination.appendChild(prevButton);
        }

        // Page buttons
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === currentPage) {
                button.classList.add('active'); // Add 'active' class only if it's the current page
            }
            button.addEventListener('click', () => {
                currentPage = i;
                loadProducts();
            });
            pagination.appendChild(button);
        }

        // Next page button
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => {
                currentPage++;
                loadProducts();
            });
            pagination.appendChild(nextButton);
        }
    }

    // Function to load products for the current page
    async function loadProducts() {
        const products = await fetchProducts(currentPage);
        renderProducts(products);
        renderPagination(totalProducts); // Proper pagination based on total products
    }

    // Function to add products to the cart and redirect to product page
    function addToCart(productId) {
        // Retrieve existing cart from local storage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Add the new product to the cart
        if (!cart.some(item => item.id === productId)) {
            cart.push({ id: productId, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart!');
        } else {
            alert('Product already in cart.');
        }

        // Redirect to product page
        window.location.href = `/product.html?id=${productId}`;
    }

    // Load initial products
    loadProducts();
});







//footer

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
                <div style="text-align: center; color: #fff; padding: 10px; background-color: #222;">
                   
                </div>
            `;
            footerContent.innerHTML = footerHTML;
        }
    }
    loadFooterContent(); // Load footer content initially
});