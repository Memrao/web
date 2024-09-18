document.addEventListener('DOMContentLoaded', function() {

    const logoSrc = '../images/logo.png';
    const CATEGORY_API_URL = 'https://dummyjson.com/products/categories';

    // Navigation links
    const navLinks = [
        { href: '#home-section', text: 'HOME' },
        { href: '#services-section', text: 'SERVICES' },
        { href: '#about-section', text: 'ABOUT' },
        { href: '../product-listing/product-listing.html', text: 'SHOP' },
        { href: '#contact-section', text: 'CONTACT' }
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
    // fetchProducts(); // Uncomment if you have a function for fetching products

});
document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('category-list');
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');

    // Fetch categories and populate category list
    async function fetchCategories() {
        try {
            const response = await fetch('https://dummyjson.com/products/categories');
            const categories = await response.json();
            categories.forEach(category => {
                const categoryItem = document.createElement('div');
                categoryItem.classList.add('category-item');
                categoryItem.textContent = category.name;
                categoryItem.dataset.url = `https://dummyjson.com/products/category/${category.slug}`;
                categoryItem.addEventListener('click', () => {
                    fetchProducts(categoryItem.dataset.url);
                });
                categoryList.appendChild(categoryItem);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    // Fetch products for a specific category
    async function fetchProducts(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            productList.innerHTML = ''; // Clear previous products
            data.products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                // Create image element if product has image
                const productImage = product.image ? `<img src="${product.image}" alt="${product.title}">` : '';

                productItem.innerHTML = `
                ${productImage}
                <div>
                    <h3>${product.title}</h3>
                    <p>${product.category}</p>
                </div>
            `;

                productList.appendChild(productItem);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Search products
    async function searchProducts(query) {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
            const data = await response.json();
            productList.innerHTML = ''; // Clear previous products
            data.products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                // Create image element if product has image
                const productImage = product.image ? `<img src="${product.image}" alt="${product.title}">` : '';

                productItem.innerHTML = `
                ${productImage}
                <div>
                    <h3>${product.title}</h3>
                    <p>${product.category}</p>
                </div>
            `;

                productList.appendChild(productItem);
            });
        } catch (error) {
            console.error('Error searching products:', error);
        }
    }

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            searchProducts(query);
        } else {
            productList.innerHTML = ''; // Clear products if search query is empty
        }
    });

    // Initialize by fetching categories
    fetchCategories();
});


document.addEventListener('DOMContentLoaded', function() {
    // Function to load footer content
    function loadFooterContent() {
        const footerContent = document.getElementById('footerContent');
        if (footerContent) {
            const footerHTML = `
              <div class="container" style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                  <div class="footer-section" style="text-align: center;">
                      <h3>INFORMATION</h3>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                  </div>
                  <div class="footer-section" style="text-align: center;">
                      <h3>LET US HELP YOU</h3>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                  </div>
                  <div class="footer-section" style="text-align: center;">
                      <h3>USEFUL LINKS</h3>
                      <ul style="list-style-type: none; padding: 0;">
      <li><a href="#" style="text-decoration: none; display: block;">About Us</a></li>
      <li><a href="#" style="text-decoration: none; display: block;">Careers Us</a></li>
      <li><a href="#" style="text-decoration: none; display: block;">Sell on Shopee</a></li>
  </ul>
                      <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
                          <input type="email" placeholder="Enter your email" style="padding: 5px; margin-right: 10px;">
                          <button class="btn" style="padding: 5px 10px;">SUBSCRIBE</button>
                      </div>
                  </div>
                  <div class="footer-section" style="text-align: center;">
                      <h3>OUR DESIGN</h3>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                  </div>
              </div>
          `;
            footerContent.innerHTML = footerHTML;
        }
    }
    loadFooterContent(); // Load footer content initially
});