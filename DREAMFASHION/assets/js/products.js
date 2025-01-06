document.addEventListener('DOMContentLoaded', () => {
    // Update navigation
    updateNavigation();
    
    // Display products
    displayProducts();
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

function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    // Sort products by creation date (newest first)
    const sortedProducts = [...STORE_DATA.products].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
    );

    const productsHTML = sortedProducts.map(product => {
        const finalPrice = STORE_DATA.calculateFinalPrice(product);
        const category = STORE_DATA.getProductCategory(product);
        
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <a href="product.html?id=${product.id}" class="block">
                    <img src="${product.image_path}" 
                         alt="${product.name}" 
                         class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="font-semibold">${product.name}</h3>
                        <p class="text-sm text-gray-600">${product.description}</p>
                        ${product.is_discount && product.discount_percentage ? `
                            <p class="mt-2 text-gray-500 line-through">
                                Rp ${product.price.toLocaleString()}
                            </p>
                            <p class="text-red-400">
                                Rp ${finalPrice.toLocaleString()}
                                <span class="ml-2 text-sm text-red-500">-${product.discount_percentage}%</span>
                            </p>
                        ` : `
                            <p class="mt-2 text-red-400">Rp ${product.price.toLocaleString()}</p>
                        `}
                        ${product.is_trending ? `
                            <span class="inline-block mt-2 px-2 py-1 text-xs text-red-600 bg-red-100 rounded-full">
                                Trending
                            </span>
                        ` : ''}
                    </div>
                </a>
            </div>
        `;
    }).join('');

    productsGrid.innerHTML = productsHTML;
}