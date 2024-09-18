document.addEventListener('DOMContentLoaded', async function() {
    const logoSrc = '../images/logo.png'; // Ensure this is the correct path
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

    // Create and append the category dropdown icon (down arrow)
    const popupLi = document.createElement('li');
    const popupIcon = document.createElement('div');
    popupIcon.classList.add('category-toggle');
    popupIcon.id = 'popupIcon';

    // Create and add the down-arrow image
    const arrowImg = document.createElement('img');
    arrowImg.src = 'down-arrow.png'; // Make sure the path is correct
    arrowImg.alt = 'Dropdown Arrow';
    arrowImg.id = 'arrowIcon';
    arrowImg.style.width = '40px';
    arrowImg.style.height = '40px';
    popupIcon.appendChild(arrowImg);
    popupLi.appendChild(popupIcon);
    navList.appendChild(popupLi);

    // Position arrow to the left
    popupLi.style.position = 'absolute';
    popupLi.style.left = '0'; // Align to the left

    // Create and append the category dropdown container
    const dropdownLi = document.createElement('li');
    const categoryDropdown = document.createElement('div');
    categoryDropdown.classList.add('category-dropdown');
    categoryDropdown.id = 'categoryDropdown';
    categoryDropdown.style.display = 'none'; // Initially hidden
    dropdownLi.appendChild(categoryDropdown);
    navList.appendChild(dropdownLi);

    // Create the category list and append it to the dropdown
    const categoryList = document.createElement('ul');
    categoryList.id = 'categoryList';
    categoryDropdown.appendChild(categoryList);

    // Function to fetch categories from API and populate dropdown
    async function fetchCategories() {
        try {
            const res = await fetch(CATEGORY_API_URL);
            const data = await res.json();
            console.log('Category API response:', data);

            // Assuming the response is an array of category objects
            if (Array.isArray(data)) {
                categoryList.innerHTML = ''; // Clear previous categories

                // Append each category to the list
                data.forEach(category => {
                    const li = document.createElement('li');
                    const anchor = document.createElement('a');
                    anchor.href = category.url; // Use the category URL
                    anchor.textContent = category.name; // Category name
                    anchor.addEventListener('click', (event) => {
                        event.preventDefault(); // Prevent default link behavior
                        // Fetch and display the products for this category
                        window.location.href = `../product-listing/product-listing.html?category=${encodeURIComponent(category.slug)}`;
                    });
                    li.appendChild(anchor);
                    categoryList.appendChild(li);
                });
            } else {
                throw new Error('Invalid categories format.');
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    }

    // Fetch categories when the page loads
    fetchCategories();

    // Toggle dropdown visibility and rotate the arrow icon
    const popupIconElement = document.getElementById('popupIcon');
    const arrowImgElement = document.getElementById('arrowIcon');
    const categoryDropdownElement = document.getElementById('categoryDropdown');

    popupIconElement.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the window click event from triggering
        const isDropdownVisible = categoryDropdownElement.style.display === 'block';

        // Toggle dropdown visibility
        categoryDropdownElement.style.display = isDropdownVisible ? 'none' : 'block';

        // Rotate the arrow based on the dropdown visibility
        arrowImgElement.style.transform = isDropdownVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    // Close the dropdown when clicking anywhere else
    document.addEventListener('click', () => {
        categoryDropdownElement.style.display = 'none';
        arrowImgElement.style.transform = 'rotate(0deg)';
    });
    console.log('Category API response:', data);

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