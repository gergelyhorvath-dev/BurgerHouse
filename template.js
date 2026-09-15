function getDishTemplate(dish, index) {
    return `
        <div class="dish">

            <img
                class="dish-image"
                src="${dish.image}"
                alt="${dish.name}"
            >

            <div class="dish-info">

                <h3>
                    ${dish.name}
                </h3>

                <p>
                    ${dish.description}
                </p>

            </div>


            <div class="dish-right">

                <strong>
                    ${formatPrice(dish.price)}
                </strong>

                <button
                    class="add-button"
                    onclick="addToBasket(${index})"
                >
                    Add to basket
                </button>

            </div>

        </div>
    `;
}


function getBasketTemplate(item) {
    return `
        <div class="basket-item">

            <div>
                <strong>
                    ${item.amount} x ${item.name}
                </strong>
            </div>

            <div class="basket-item-bottom">

                <span>
                    ${item.amount}
                </span>

                <span>
                    ${formatPrice(item.price * item.amount)}
                </span>

            </div>

        </div>
    `;
}