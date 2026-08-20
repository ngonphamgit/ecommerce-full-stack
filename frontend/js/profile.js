const userUsername = document.getElementById("user-username");
const userEmail = document.getElementById("user-email");

const orderCardsContainer = document.getElementById("orders-container");
const favoriteCardsContainer = document.getElementById("favorites-container");

const orderCardTemplate = document.getElementById("order-card-template");
const favoriteCardTemplate = document.getElementById("favorite-card-template");

async function getUserProfile(jwt)
{
    const response =  await fetch(`http://localhost:8080/users/me`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    });
    
    if (!response.ok)
    {
        console.log("bad me");
        return;
    }

    const data = await response.json();
    return data;
}

function displayUserOrders(userOrders)
{
    for (const order of userOrders)
    {
        const newCard = orderCardTemplate.content.cloneNode(true);

        newCard.querySelector(".order-link").href = `order.html?id=${order.orderId}`
        newCard.querySelector(".order-number").textContent = "Order #" + order.orderId;
        newCard.querySelector(".order-status").textContent = "Status: " + order.status;
        newCard.querySelector(".order-items").textContent = "Items: " + order.orderItems.length;
        newCard.querySelector(".order-total").textContent = "Total: $" + order.total.toFixed(2);

        orderCardsContainer.appendChild(newCard);
    }
}

function displayUserFavorites(userFavorites)
{
    for (const favorite of userFavorites)
    {
        const product = favorite.product;
        const newCard = favoriteCardTemplate.content.cloneNode(true);

        newCard.querySelector(".favorite-name").textContent = product.name;
        newCard.querySelector(".favorite-price").textContent = "$ " + product.price;
        newCard.querySelector(".favorite-desc").textContent = product.description;

        favoriteCardsContainer.appendChild(newCard);
    }
}

async function loadUserProfile(jwt)
{
    const data = await getUserProfile(jwt);
    console.log(data);

    const userData = data.user;
    const ordersData = data.userOrders;
    const favoritesData = data.userFavorites;

    userUsername.textContent = "Username: " + userData.username;
    userEmail.textContent = "Email: " + userData.email;

    displayUserOrders(ordersData);
    displayUserFavorites(favoritesData);
}

loadUserProfile(localStorage.getItem("jwt"));