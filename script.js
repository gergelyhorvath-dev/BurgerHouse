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
        content.innerHTML = getEmptyBasketTemplate();
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
    let total = 0;

    if (basket.length > 0) {
        total = subtotal + 4.99;
    }

    document.getElementById("subtotal").innerHTML =
        formatPrice(subtotal);

    document.getElementById("totalPrice").innerHTML =
        formatPrice(total);
}


function formatPrice(price) {
    return price.toFixed(2).replace(".", ",") + " €";
}


function increaseAmount(index) {
    basket[index].amount++;
    renderBasket();
    renderMobileBasket();
}


function decreaseAmount(index) {
    basket[index].amount--;

    if (basket[index].amount === 0) {
        basket.splice(index, 1);
    }

    renderBasket();
    renderMobileBasket();
}


function removeFromBasket(index) {
    basket.splice(index, 1);
    renderBasket();
    renderMobileBasket();
}


function orderFood() {
    if (basket.length === 0) {
        return;
    }
    closeMobileBasket();
    openConfirmation();
    basket = [];
    renderBasket();
    renderMobileBasket();
}


function openConfirmation() {
    let dialog = document.getElementById("orderDialog");
    dialog.showModal();
}


function closeConfirmation() {
    let dialog = document.getElementById("orderDialog");
    dialog.close();
}

function openMobileBasket() {
    renderMobileBasket();
    document.getElementById("mobileBasketDialog").showModal();
}


function closeMobileBasket() {
    document.getElementById("mobileBasketDialog").close();
}

function renderMobileBasket() {
    let content = document.getElementById("mobileBasketContent");

    content.innerHTML = "";

    if (basket.length === 0) {
        content.innerHTML = getEmptyBasketTemplate();
    } else {
        renderMobileBasketItems(content);
    }

    updateMobilePrice();
}

function renderMobileBasketItems(content) {
    for (let i = 0; i < basket.length; i++) {
        content.innerHTML += getBasketTemplate(basket[i], i);
    }
}

function updateMobilePrice() {
    let subtotal = calculateSubtotal();
    let total = 0;

    if (basket.length > 0) {
        total = subtotal + 4.99;
    }

    document.getElementById("mobileTotalPrice").innerHTML =
        formatPrice(total);
}