function init() {
    renderDishes();
    renderBasket();
}


function renderDishes() {
    let content = document.getElementById("dishContent");

    content.innerHTML = "";

    for (let i = 0; i < dishes.length; i++) {
        content.innerHTML += getDishTemplate(dishes[i], i);
    }
}


function addToBasket(index) {
    let basketIndex = findDishInBasket(dishes[index].name);

    if (basketIndex === -1) {
        addNewDish(index);
    } else {
        basket[basketIndex].amount++;
    }

    renderBasket();
}


function findDishInBasket(name) {
    for (let i = 0; i < basket.length; i++) {

        if (basket[i].name === name) {
            return i;
        }
    }

    return -1;
}


function addNewDish(index) {
    let dish = dishes[index];

    basket.push({
        name: dish.name,
        price: dish.price,
        amount: 1
    });
}


function renderBasket() {
    let content = document.getElementById("basketContent");

    content.innerHTML = "";

    if (basket.length === 0) {
        content.innerHTML = `
            <p class="empty-basket">
                Your basket is empty.
            </p>
        `;
    } else {
        renderBasketItems(content);
    }

    updatePrice();
}


function renderBasketItems(content) {
    for (let i = 0; i < basket.length; i++) {
        content.innerHTML += getBasketTemplate(basket[i], i);
    }
}


function calculateSubtotal() {
    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].amount;
    }

    return subtotal;
}


function updatePrice() {
    let subtotal = calculateSubtotal();

    document.getElementById("subtotal").innerHTML =
        formatPrice(subtotal);

    document.getElementById("totalPrice").innerHTML =
        formatPrice(subtotal + 4.99);
}


function formatPrice(price) {
    return price.toFixed(2).replace(".", ",") + " €";
}






function increaseAmount(index) {
    basket[index].amount++;
    renderBasket();

}
function decreaseAmount(index) {
    basket[index].amount--;

    if (basket[index].amount === 0) {
        basket.splice(index, 1);
    }

    renderBasket();
}

function removeFromBasket(index) {
    basket.splice(index, 1);
    renderBasket();
}

/*


function orderFood() {

}


function openConfirmation() {

}


function closeConfirmation() {

}

*/