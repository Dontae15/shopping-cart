let cart = [];
const mainContent = document.querySelector('.main-content');

// Function to display the cart items and total cost
export function displayCart() {
    const cartContainer = document.getElementById('product-cart');
    cartContainer.innerHTML = '';  // Clear the current cart display

    let cartTotalCount = 0;

    // Cart count (total number of items in the cart)
    cart.forEach((item) => {
        cartTotalCount += item.quantity;
    });

    const cartCount = document.createElement('h2');
    cartCount.classList.add('cart-count', 'text-preset-2');
    cartCount.textContent = `Your Cart (${cartTotalCount})`; 
    cartContainer.appendChild(cartCount);

    // Check if the empty cart display already exists
    let emptyCartDisplay = document.querySelector('.empty-cart-display');
    
    if (!emptyCartDisplay) {
        // Create the empty cart display if it doesn't exist yet
        emptyCartDisplay = document.createElement('div');
        emptyCartDisplay.classList.add('empty-cart-display');
        cartContainer.appendChild(emptyCartDisplay);

        const emptyCartDisplayImg = document.createElement('img');
        emptyCartDisplayImg.classList.add('empty-cart-display-img');
        emptyCartDisplayImg.src = 'public/assets/images/illustration-empty-cart.svg';
        emptyCartDisplay.appendChild(emptyCartDisplayImg);

        const emptyCartDisplayText = document.createElement('p');
        emptyCartDisplayText.classList.add('text-preset-5');
        emptyCartDisplayText.textContent = 'Your added items will appear here';
        emptyCartDisplay.appendChild(emptyCartDisplayText);
    }

    // Check if the cart is empty
    if (cart.length === 0) {
        // Show the empty cart display if the cart is empty
        emptyCartDisplay.style.display = 'block';
        return;
    }

    // If the cart has items, hide the empty cart display
    emptyCartDisplay.style.display = 'none';

    // Loop through each item in the cart and display it
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartContainer.appendChild(cartItem);

        // Item info (name, quantity, price)
        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');
        cartItem.appendChild(itemInfo);

        const itemName = document.createElement('p');
        itemName.classList.add('itemName', 'text-preset-5');
        itemName.textContent = item.name;
        itemInfo.appendChild(itemName);  // Correctly appending itemInfo

        // Quantity and price display
        const itemPrice = document.createElement('div');
        itemPrice.classList.add('item-price');
        itemInfo.appendChild(itemPrice);

        const quantity = document.createElement('p');
        quantity.classList.add('text-preset-5');
        quantity.textContent = `${item.quantity}x`;
        itemPrice.appendChild(quantity);

        const price = document.createElement('p');
        price.classList.add('text-preset-4');
        price.textContent = `@ $${item.price.toFixed(2)}`;
        itemPrice.appendChild(price);

        const totalCost = document.createElement('p');
        totalCost.classList.add('text-preset-5');
        totalCost.textContent = `$${item.totalCost.toFixed(2)}`;
        itemPrice.appendChild(totalCost);

        // Remove cart item button
        const removeCartItemBtn = document.createElement('button');
        removeCartItemBtn.classList.add('remove-cart-item-btn');
        cartItem.appendChild(removeCartItemBtn);

        const cartBtnImg = document.createElement('img');
        cartBtnImg.src = 'public/assets/images/icon-remove-item.svg';
        removeCartItemBtn.appendChild(cartBtnImg);

        // Event listener for removing cart items
        removeCartItemBtn.addEventListener('click', () => {
            removeFromCart(item.id);
        });
    });

    // Submit order section
    const submitOrder = document.createElement('div');
    submitOrder.classList.add('submit-order');
    cartContainer.appendChild(submitOrder);

    // Total cost of the order
    let cartTotalCost = cart.reduce((total, item) => total + item.totalCost, 0);  // Sum of totalCost for all items

    const orderTotal = document.createElement('div');
    orderTotal.classList.add('order-total');
    submitOrder.appendChild(orderTotal);

    const orderTotalTitle = document.createElement('p');
    orderTotalTitle.classList.add('text-preset-4');
    orderTotalTitle.textContent = 'Order Total';
    orderTotal.appendChild(orderTotalTitle);

    const orderTotalCost = document.createElement('h2');
    orderTotalCost.classList.add('text-preset-2');
    orderTotalCost.textContent = `$${cartTotalCost.toFixed(2)}`;  // Display total cost
    orderTotal.appendChild(orderTotalCost);

    // Order message (carbon-neutral delivery)
    const orderMessage = document.createElement('div');
    orderMessage.classList.add('orderMessage');
    submitOrder.appendChild(orderMessage);

    const orderMessageImg = document.createElement('img');
    orderMessageImg.src = 'public/assets/images/icon-carbon-neutral.svg';
    orderMessage.appendChild(orderMessageImg);

    const orderMessageText = document.createElement('p');
    orderMessageText.classList.add('text-preset-5');
    orderMessageText.textContent = 'This is a carbon-neutral delivery';
    orderMessage.appendChild(orderMessageText);

    // Confirm order button
    const confirmOrder = document.createElement('button');
    confirmOrder.classList.add('text-preset-3', 'confirm-order-btn');
    confirmOrder.textContent = 'Confirm Order';
    submitOrder.appendChild(confirmOrder);

    // Event listener for confirm order

confirmOrder.addEventListener('click', () => {
    confirmOrderHandler();  // Call the confirm order function

    // Toggle the 'active' class on the mainContent element
    mainContent.classList.toggle('active');
});

}

// Function to handle adding an item to the cart
export function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        // If the product is already in the cart, update its quantity
        existingItem.quantity += quantity;
        existingItem.totalCost = existingItem.quantity * existingItem.price;
    } else {
        // If it's a new product, add it to the cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            totalCost: quantity * product.price,
            image: product.image
        });
    }

    displayCart();  // Update the cart display with the new total cost
}

// Function to handle removing an item from the cart
export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);  // Remove the product from the cart
    displayCart();  // Update the cart display after removal
}

// Function to handle confirming the order
function confirmOrderHandler() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    orderConfirmedModal();
    cart = [];  // Clear the cart after order confirmation
    displayCart();  // Update the cart display to reflect the empty cart
}


function orderConfirmedModal () {
    const modal = document.createElement('div');
    modal.classList.add('modal');

// Modal heading
const modalHeading = document.createElement('div');
modalHeading.classList.add('modal-heading');
modal.appendChild(modalHeading);

const modalHeadingImg = document.createElement('img');
modalHeadingImg.src = 'public/assets/images/icon-order-confirmed.svg';
modalHeading.appendChild(modalHeadingImg);

const mainHeading = document.createElement('h1');
mainHeading.classList.add('text-preset-1');
mainHeading.textContent = 'Order Confirmed';
modalHeading.appendChild(mainHeading);

const subHeading = document.createElement('p');
subHeading.classList.add('text-preset-3');
subHeading.textContent = 'We hope you enjoy your food!';
modalHeading.appendChild(subHeading);

// Order summary container
const orderSummary = document.createElement('div');
orderSummary.classList.add('order-summary');
modal.appendChild(orderSummary);

// Loop through the cart to create order item entries
cart.forEach((item) => {
    const orderItem = document.createElement('div');
    orderItem.classList.add('order-item');
    orderSummary.appendChild(orderItem);

    // Product image
    const productImg = document.createElement('img');
    productImg.src = item.image;
    orderItem.appendChild(productImg);

    // Product information
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-summary-info');
    orderItem.appendChild(productInfo);

    // Product name
    const productName = document.createElement('p');
    productName.classList.add('text-preset-5');
    productName.textContent = item.name;
    productInfo.appendChild(productName);

    // Product quantity and price
    const productPrice = document.createElement('div');
    productPrice.classList.add('product-price');
    productInfo.appendChild(productPrice);

    const productQuantity = document.createElement('p');
    productQuantity.classList.add('text-preset-5', 'product-quantity');
    productQuantity.textContent = `${item.quantity}x`;
    productPrice.appendChild(productQuantity);

    const productPriceValue = document.createElement('p');
    productPriceValue.classList.add('text-preset-4', 'product-price');
    productPriceValue.textContent = `@ $${item.price.toFixed(2)}`;
    productPrice.appendChild(productPriceValue);

    // Product total cost
    const productTotalCost = document.createElement('p');
    productTotalCost.classList.add('text-preset-3', 'product-total-cost');
    productTotalCost.textContent = `$${item.totalCost.toFixed(2)}`;
    orderItem.appendChild(productTotalCost);
});

// Order total summary

let totalCost = cart.reduce((sum, item) => {
    return sum + (item.quantity * item.price);
}, 0); 

const productOrderTotal = document.createElement('div');
productOrderTotal.classList.add('product-order-total');
orderSummary.appendChild(productOrderTotal);

const productOrderTotalText = document.createElement('p');
productOrderTotalText.classList.add('text-preset-4');
productOrderTotalText.textContent = 'Order Total';  // Corrected missing quotation
productOrderTotal.appendChild(productOrderTotalText);

const productOrderTotalValue = document.createElement('p');
productOrderTotalValue.classList.add('text-preset-2');
productOrderTotalValue.textContent = `$${totalCost.toFixed(2)}`;  // Display total cost
productOrderTotal.appendChild(productOrderTotalValue);

// Start new order button
const startNewOrderBtn = document.createElement('button');
startNewOrderBtn.classList.add('start-new-order-btn', 'text-preset-3');
startNewOrderBtn.textContent = 'Start New Order';
modal.appendChild(startNewOrderBtn);

// Append modal to body
document.body.appendChild(modal);


startNewOrderBtn.addEventListener('click', function() {
    modal.style.display  = 'none'
    mainContent.classList.remove('active');
})

}

