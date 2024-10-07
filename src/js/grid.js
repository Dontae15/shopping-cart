import { addToCart } from './cart.js';

export function renderGrid(data) {
    const grid = document.getElementById('product-grid')
    data.forEach((item) => {

        const productId = item.id;  

        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

    //Product img div
     const productImg = document.createElement('div')
     productImg.classList.add('product-img') 
     gridItem.appendChild(productImg)

     // Create the img element
     const img = document.createElement('img');
     img.classList.add('item-img')
     img.src = `/assets/images/${item.image.desktop.replace('./assets/images/', '')}`; // Use desktop image
     img.alt = item.name; // Add alt text for accessibility
     productImg.appendChild(img);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('add-to-cart-btn');

    const btnImg = document.createElement('img');
    btnImg.src = 'public/assets/images/icon-add-to-cart.svg'
    btnImg.classList.add('btn-img');
    addToCartBtn.appendChild(btnImg);

    const btnText = document.createElement('p');
    btnText.classList.add('btn-text')
    btnText.classList.add('text-preset-5')
    btnText.textContent = 'Add to Cart'
    addToCartBtn.appendChild(btnText);

    const cartProductBtn = document.createElement('div');
    cartProductBtn.classList.add('cart-product-btn');
    cartProductBtn.style.display = 'none';
    
    
    const quantityControls = document.createElement('div')
    quantityControls.classList.add('quantity-controls');
    cartProductBtn.appendChild(quantityControls);

    const decrementBtn = document.createElement('button');
    decrementBtn.classList.add('decrementBtn');
    quantityControls.appendChild(decrementBtn);

    const decrementImg = document.createElement('img');
    decrementImg.classList.add('decrementImg');
    decrementImg.src = 'public/assets/images/icon-decrement-quantity.svg';
    decrementBtn.appendChild(decrementImg);

    const quantityDisplay = document.createElement('span');
    quantityDisplay.classList.add('text-preset-5');
    quantityDisplay.classList.add('quantity-display')
    quantityDisplay.textContent = '1';
    quantityControls.appendChild(quantityDisplay);

    const incrementBtn = document.createElement('button');
    incrementBtn.classList.add('incrementBtn');
    quantityControls.appendChild(incrementBtn);

    const incrementImg = document.createElement('img');
    incrementImg.classList.add('incrementImg');
    incrementImg.src = 'public/assets/images/icon-increment-quantity.svg';
    incrementBtn.appendChild(incrementImg);

    const submitToCartBtn = document.createElement('button');
    submitToCartBtn.classList.add('submit-to-cart-btn');
    cartProductBtn.appendChild(submitToCartBtn);

    const cartImg = document.createElement('img');
    cartImg.classList.add('cart-img');
    cartImg.src = 'public/assets/images/icon-add-to-cart.svg';
    submitToCartBtn.appendChild(cartImg);
   
   

    productImg.appendChild(addToCartBtn);
    productImg.appendChild(cartProductBtn);
    

    // Product info div
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    gridItem.appendChild(productInfo);

    // Category
    const itemCategory = document.createElement('p');
    itemCategory.classList.add('item-category')
    itemCategory.classList.add('text-preset-4');
    itemCategory.textContent = item.category;  // Correctly setting category text
    productInfo.appendChild(itemCategory);

    // Name
    const itemName = document.createElement('p');
    itemName.classList.add('item-name');
    itemName.classList.add('text-preset-3');  // Correctly adding class to itemName
    itemName.textContent = item.name;  // Correctly setting name text
    productInfo.appendChild(itemName);

    // Price
    const itemPrice = document.createElement('p');
    itemPrice.classList.add('item-price')
    itemPrice.classList.add('text-preset-4');  // Correctly adding class to itemPrice
    itemPrice.textContent = `$${item.price.toFixed(2)}`;  // Correctly setting price text
    productInfo.appendChild(itemPrice);


    addToCartBtn.addEventListener('click', () => {
        addToCartBtn.style.display = 'none';
        cartProductBtn.style.display = 'flex';
        img.classList.toggle('active');

    })


    // Event listener for increment button
    incrementBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityDisplay.textContent, 10);
    quantity += 1;  // Increment the quantity
    quantityDisplay.textContent = quantity;
    });

    // Event listener for decrement button
    decrementBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityDisplay.textContent, 10);
    if (quantity > 1) {  // Ensure quantity doesn't go below 1
        quantity -= 1;
        quantityDisplay.textContent = quantity;
    }
});

submitToCartBtn.setAttribute('data-id', productId)
submitToCartBtn.addEventListener('click', () => {

    const quantity = parseInt(quantityDisplay.textContent, 10);  // Get the current quantity
    const product = {
        id: productId,
        name: item.name,
        price: item.price,
        image: item.image.desktop,
    };
    quantityDisplay.textContent = 1;
    cartProductBtn.style.display = 'none';
    addToCartBtn.style.display = 'flex';


    addToCart(product, quantity);  // Add product with quantity to cart
});



   
    



     
        grid.appendChild(gridItem)
    })
}
  

