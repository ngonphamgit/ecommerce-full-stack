let homeButton;
let authButtons;
let profileButtons;
let logoutButton;
let cartButton;

async function getUserCartId(jwt)
{
    const response = await fetch(`http://localhost:8080/orders/cart`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    });
    const data = await response.json();
    return data.orderId;
}

async function initialize()
{
    await window.headerLoaded;

    homeButton = document.getElementById("home-button");
    authButtons = document.getElementById("auth-buttons");
    profileButtons = document.getElementById("profile-buttons");
    logoutButton = document.getElementById("logout-button");
    cartButton = document.getElementById("cart-button");

    const jwt = localStorage.getItem("jwt");

    if (localStorage.getItem("jwt") === "") //if user is not logged in, hide user profile buttons
    {
        console.log("signed out")
        profileButtons.classList.toggle("hidden");
    }
    else
    {
        console.log("logged in")
        authButtons.classList.toggle("hidden");

        logoutButton.addEventListener("click", () => {
        localStorage.setItem("jwt", "");
        window.location.href = "index.html";
        })

        cartButton.dataset.orderId = await getUserCartId(jwt);
        cartButton.addEventListener("click", () => {
            window.location.href = `order.html?id=${cartButton.dataset.orderId}`;
        })
    }

    homeButton.addEventListener("click", () => {
        window.location.href = "index.html";
    })
}

async function loadHeader() {
    const response = await fetch("header.html");
    const html = await response.text();

    document.getElementById("header").innerHTML = html;
    document.dispatchEvent(new Event("headerLoaded"));
}

window.headerLoaded = loadHeader();

initialize();