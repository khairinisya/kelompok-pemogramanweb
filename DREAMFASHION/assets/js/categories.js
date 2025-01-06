document.addEventListener('DOMContentLoaded', () => {
    // Update navigation
    updateNavigation();
    
    // Display categories
    displayCategories();
});

function updateNavigation() {
    const userNav = document.getElementById('user-nav');
    const user = SessionManager.getUser();

    if (user) {
        userNav.innerHTML = `
            <div class="relative" x-data="{ open: false }">
                <button @click="open = !open" class="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                    <span>${user.name}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                <div x-show="open" 
                     @click.away="open = false"
                     class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <a href="cart.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Keranjang
                    </a>
                    ${user.role === 'admin' ? `
                        <a href="admin/dashboard.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Dashboard Admin
                        </a>
                    ` : ''}
                    <button onclick="SessionManager.logout()" 
                            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Logout
                    </button>
                </div>
            </div>
        `;
    } else {
        userNav.innerHTML = `
            <a href="login.html" class="text-gray-700 hover:text-gray-900">
                Login
            </a>
        `;
    }
}

function displayCategories() {
    const womenCategoriesContainer = document.getElementById('women-categories');
    const menCategoriesContainer = document.getElementById('men-categories');
    
    // Filter categories by type
    const womenCategories = STORE_DATA.categories.filter(category => category.type === 'women');
    const menCategories = STORE_DATA.categories.filter(category => category.type === 'men');

    // Display women categories
    womenCategoriesContainer.innerHTML = womenCategories.map(category => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <a href="category.html?id=${category.id}" class="block">
                <img src="${category.image_path}" 
                     alt="${category.name}" 
                     class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="font-semibold text-center">${category.name}</h3>
                </div>
            </a>
        </div>
    `).join('');

    // Display men categories
    menCategoriesContainer.innerHTML = menCategories.map(category => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <a href="category.html?id=${category.id}" class="block">
                <img src="${category.image_path}" 
                     alt="${category.name}" 
                     class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="font-semibold text-center">${category.name}</h3>
                </div>
            </a>
        </div>
    `).join('');
}