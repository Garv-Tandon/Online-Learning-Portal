const restaurants = [
    {
        id: 1,
        name: 'Pizza Palace',
        image: 'https://via.placeholder.com/200x150',
        menu: [
            { name: 'Pepperoni Pizza', price: 12.99 },
            { name: 'Veggie Pizza', price: 10.99 },
            { name: 'Cheese Pizza', price: 9.99 }
        ]
    },
    {
        id: 2,
        name: 'Burger House',
        image: 'https://via.placeholder.com/200x150',
        menu: [
            { name: 'Cheeseburger', price: 8.99 },
            { name: 'Bacon Burger', price: 9.99 },
            { name: 'Veggie Burger', price: 7.99 }
        ]
    },
    {
        id: 3,
        name: 'Sushi World',
        image: 'https://via.placeholder.com/200x150',
        menu: [
            { name: 'California Roll', price: 11.99 },
            { name: 'Spicy Tuna Roll', price: 13.99 },
            { name: 'Salmon Nigiri', price: 15.99 }
        ]
    }
];

let cart = [];

function loadRestaurants() {
    const restaurantList = document.getElementById('restaurant-list');
    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('restaurant-card');
        restaurantCard.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <h3>${restaurant.name}</h3>
            <div class="menu-items">
                ${restaurant.menu.map(item => `
                    <p>${item.name} - $${item.price.toFixed(2)}</p>
                    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                `).join('')}
            </div>
        `;
        restaurantList.appendChild(restaurantCard);
    });
}

function addToCart(itemName, itemPrice) {
    cart.push({ itemName, itemPrice });
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.itemName} - $${item.itemPrice.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.itemPrice;
    });

    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    cartCount.innerText = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert(`Thank you for your order! Your total is $${cart.reduce((sum, item) => sum + item.itemPrice, 0).toFixed(2)}`);
    cart = [];
    updateCart();
});

// Initialize
loadRestaurants();
