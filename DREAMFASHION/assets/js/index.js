document.addEventListener('DOMContentLoaded', () => {
    // Update navigation based on authentication
    updateNavigation();
    
    // Load and display trending products
    displayTrendingProducts();
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

function displayTrendingProducts() {
    const trendingProductsContainer = document.getElementById('trending-products');
    const trendingProducts = STORE_DATA.products.filter(product => product.is_trending);

    const productsHTML = trendingProducts.map(product => {
        const finalPrice = STORE_DATA.calculateFinalPrice(product);
        const category = STORE_DATA.getProductCategory(product);
        
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image_path}" 
                         alt="${product.name}" 
                         class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                        <p class="text-gray-600 mb-2">${category.name}</p>
                        <div class="flex items-center justify-between">
                            <div>
                                ${product.is_discount ? `
                                    <span class="text-gray-400 line-through">
                                        Rp ${product.price.toLocaleString()}
                                    </span>
                                    <span class="text-red-500 font-semibold">
                                        Rp ${finalPrice.toLocaleString()}
                                    </span>
                                ` : `
                                    <span class="text-gray-900 font-semibold">
                                        Rp ${product.price.toLocaleString()}
                                    </span>
                                `}
                            </div>
                            ${product.is_trending ? `
                                <span class="inline-block px-2 py-1 text-xs text-red-600 bg-red-100 rounded-full">
                                    Trending
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </a>
            </div>
        `;
    }).join('');

    trendingProductsContainer.innerHTML = productsHTML;
}