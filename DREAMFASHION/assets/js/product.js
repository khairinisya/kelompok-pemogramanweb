document.addEventListener('DOMContentLoaded', () => {
    // Update navigation
    updateNavigation();
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
        window.location.href = 'products.html';
        return;
    }

    // Display product details
    displayProductDetails(productId);
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

function displayProductDetails(productId) {
    const productDetailContainer = document.getElementById('product-detail');
    const product = STORE_DATA.getProductById(productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    const category = STORE_DATA.getProductCategory(product);
    const finalPrice = STORE_DATA.calculateFinalPrice(product);
    
    const productDetails = {
        'Kategori': category.name,
        'Bahan': 'Premium quality',
        'Stok': `${product.stock} pcs`,
        'Kondisi': 'Baru'
    };

    productDetailContainer.innerHTML = `
        <!-- Product Image -->
        <div class="bg-white rounded-lg overflow-hidden">
            <img src="${product.image_path}" 
                 alt="${product.name}" 
                 class="w-full h-[600px] object-cover">
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
            <h1 class="text-3xl font-semibold">${product.name}</h1>
            
            <div class="text-2xl text-red-400 font-bold">
                ${product.is_discount && product.discount_percentage ? `
                    <p class="text-gray-500 line-through text-xl">
                        Rp ${product.price.toLocaleString()}
                    </p>
                    <p>
                        Rp ${finalPrice.toLocaleString()}
                        <span class="ml-2 text-sm text-red-500">-${product.discount_percentage}%</span>
                    </p>
                ` : `
                    Rp ${product.price.toLocaleString()}
                `}
            </div>

            <!-- Size Selection -->
            <div class="space-y-2">
                <label class="block text-gray-700">Ukuran:</label>
                <div class="flex space-x-2">
                    ${['S', 'M', 'L', 'XL'].map(size => `
                        <button onclick="selectSize('${size}')" 
                                class="size-button px-4 py-2 border border-gray-300 rounded hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400">
                            ${size}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Quantity -->
            <div class="space-y-2">
                <label class="block text-gray-700">Jumlah:</label>
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity(-1)" class="px-3 py-1 border border-gray-300 rounded-l hover:bg-gray-100">-</button>
                    <input type="number" id="quantity" value="1" min="1" max="${product.stock}" 
                           class="w-20 px-3 py-1 border-t border-b border-gray-300 text-center focus:outline-none">
                    <button onclick="updateQuantity(1)" class="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-100">+</button>
                </div>
            </div>

            <!-- Add to Cart Button -->
            <button onclick="addToCart(${productId})" 
                    class="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600">
                Add to Cart
            </button>

            <!-- Product Details -->
            <div class="border-t pt-6 mt-6">
                <h2 class="text-lg font-semibold mb-4">Deskripsi Produk</h2>
                <div class="prose text-gray-600">
                    <p class="mb-4">${product.description}</p>
                    <ul class="list-disc pl-5 space-y-2">
                        ${Object.entries(productDetails).map(([key, value]) => `
                            <li><span class="font-medium">${key}:</span> ${value}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

let selectedSize = null;

function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-button').forEach(button => {
        if (button.textContent.trim() === size) {
            button.classList.add('border-red-400', 'ring-2', 'ring-red-400');
        } else {
            button.classList.remove('border-red-400', 'ring-2', 'ring-red-400');
        }
    });
}

function updateQuantity(change) {
    const input = document.getElementById('quantity');
    const newValue = parseInt(input.value) + change;
    const max = parseInt(input.getAttribute('max'));
    if (newValue >= 1 && newValue <= max) {
        input.value = newValue;
    }
}

const CART_KEY = 'shopping_cart';

function addToCart(productId) {
    if (!SessionManager.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    if (!selectedSize) {
        alert('Please select a size');
        return;
    }

    const quantity = parseInt(document.getElementById('quantity').value);
    const product = STORE_DATA.getProductById(productId);
    
    // Get existing cart or initialize new one
    let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    
    // Create cart item
    const cartItem = {
        id: Date.now(), // unique ID for cart item
        productId: product.id,
        name: product.name,
        price: STORE_DATA.calculateFinalPrice(product),
        quantity: quantity,
        size: selectedSize,
        image: product.image_path
    };

    // Add to cart
    cart.push(cartItem);
    
    // Save cart
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    // Redirect to cart page
    window.location.href = 'cart.html';
}