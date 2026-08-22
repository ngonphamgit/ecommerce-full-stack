const orderItemsContainer = document.getElementById("order-items-container");
const orderItemCardTemplate = document.getElementById("order-item-card-template");
const orderNumber = document.getElementById("order-number");

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
        console.log("bad order request");
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

async function loadUserOrder(jwt, orderId)
{
    const data = await getUserOrder(jwt, orderId);
    displayOrderDetails(data);
}