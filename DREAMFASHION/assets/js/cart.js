const CART_KEY = 'shopping_cart';

document.addEventListener('DOMContentLoaded', () => {
    // Update navigation
    updateNavigation();
    
    // Check authentication
    if (!SessionManager.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // Display cart
    displayCart();
});

function updateNavigation() {
    // Same as other pages
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummaryContainer = document.getElementById('cart-summary');
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="p-6 text-center">
                <p class="text-gray-500">Your cart is empty</p>
                <a href="products.html" class="mt-4 inline-block text-red-500 hover:text-red-600">
                    Continue Shopping
                </a>
            </div>
        `;
        cartSummaryContainer.innerHTML = '';
        return;
    }

    // Display cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="p-6 border-b last:border-b-0">
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                <div class="flex-1">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-gray-500">Size: ${item.size}</p>
                    <p class="text-red-500">Rp ${item.price.toLocaleString()}</p>
                    <div class="mt-2 flex items-center space-x-2">
                        <button onclick="updateCartQuantity(${item.id}, -1)" 
                                class="px-2 py-1 border rounded">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, 1)" 
                                class="px-2 py-1 border rounded">+</button>
                        <button onclick="removeFromCart(${item.id})" 
                                class="ml-4 text-red-500 hover:text-red-600">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Display summary
    cartSummaryContainer.innerHTML = `
        <div class="flex justify-between">
            <span>Subtotal</span>
            <span>Rp ${total.toLocaleString()}</span>
        </div>
        <div class="border-t pt-4">
            <button onclick="checkout()" 
                    class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Proceed to Checkout
            </button>
        </div>
    `;
}

function updateCartQuantity(itemId, change) {
    let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        const newQuantity = cart[itemIndex].quantity + change;
        if (newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            displayCart();
        }
    }
}

function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    displayCart();
}

function checkout() {
    // Implement checkout functionality
    alert('Checkout functionality will be implemented here');
}