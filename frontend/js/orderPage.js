const orderItemsContainer = document.getElementById("order-items-container");
const orderItemCardTemplate = document.getElementById("order-item-card-template");
const orderNumber = document.getElementById("order-number");

const checkoutButton = document.getElementById("checkout-button");

async function checkoutCart(jwt)
{
    const response = await fetch(`http://localhost:8080/orders/checkout`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    });

    if (!response.ok)
    {
        console.log("bad checkout");
        return;
    }

    const data = await response.json();
    
    window.location.href = "profile.html";
}

async function getUserOrder(jwt, orderId)
{
    const response =  await fetch(`http://localhost:8080/orders/order?id=${orderId}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    });

    if (!response.ok)
    {
        console.log("bad checkout request");
        return;
    }

    const data = await response.json();
    return data;
}

function displayOrderDetails(data)
{
    orderNumber.textContent = "Order " + data.orderId;
    console.log(data)
    for (const orderItem of data.orderItems)
    {
        const newCard = orderItemCardTemplate.content.cloneNode(true);

        newCard.querySelector(".order-item-link").href = `productPage.html?id=${orderItem.productId}`
        newCard.querySelector(".order-item-name").textContent = orderItem.name;
        newCard.querySelector(".order-item-desc").textContent = orderItem.desc;
        newCard.querySelector(".order-item-price").textContent = "$" + orderItem.unitPrice;
        newCard.querySelector(".order-item-quantity").textContent = "Quantity: " + orderItem.quantity;

        orderItemsContainer.appendChild(newCard);
    }
}

async function loadUserOrder(orderId)
{
    const jwt = localStorage.getItem("jwt");
    const data = await getUserOrder(jwt, orderId);
    displayOrderDetails(data);

    if (data.status !== "CART")
    {
        const checkoutContainer = document.getElementById("checkout-container");
        checkoutContainer.hidden = true;
    }
}

checkoutButton.addEventListener("click", async () => {
    const jwt = localStorage.getItem("jwt");
    const data = await checkoutCart(jwt);
});