const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDesc = document.getElementById("product-desc");
const stockText = document.getElementById("stock-text");

const quantityInput = document.getElementById("quantity-input");
const addToCartButton = document.getElementById("add-to-cart-button");
const favoriteButton = document.getElementById("favorite-button");

let productId;

async function addProductToCart(jwt, quantity)
{
    const data = {
        "id" : productId,
        "quantity" : quantity
    }

    const fetchResponse = await fetch(`https://ecommerce-full-stack-5pvu.onrender.com/orders/cart`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt}`
        },
    });
    
    if (!fetchResponse.ok)
    {
        console.log("bad cart fetch");
        return;
    }

    const fetchData = await fetchResponse.json();

    const addResponse = await fetch(`https://ecommerce-full-stack-5pvu.onrender.com/orders/addItem`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt}`
        },
        body : JSON.stringify(data)
    });

    if (!addResponse.ok)
    {
        console.log("bad add to cart");
        return
    }

    window.location.href = `order.html?id=${fetchData.orderId}`;
}

async function addFavorite(jwt)
{
    const response = await fetch(`https://ecommerce-full-stack-5pvu.onrender.com/favorites/add?productId=${productId}`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    });

    if (!response.ok)
    {
        console.log("bad add favorite");
        return;
    }

    window.location.reload();
}

async function removeFavorite(jwt)
{
    const response = await fetch(`https://ecommerce-full-stack-5pvu.onrender.com/favorites/remove?productId=${productId}`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    });

    if (!response.ok)
    {
        console.log("bad remove favorite");
        return;
    }

    window.location.reload();
}

async function checkFavoriteExists(jwt)
{
    const response = await fetch(`https://ecommerce-full-stack-5pvu.onrender.com/favorites/check?productId=${productId}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt}`
        },
    });

    if (!response.ok)
    {
        console.log("bad check favorite exists");
        return;
    }

    const data = await response.json();
    console.log(data);
    return data;
}

async function displayProduct(product)
{
    productId = product.id;
    productImage.src = "https://picsum.photos/300";
    productName.textContent = product.name;
    productPrice.textContent = "$" + product.price;
    productDesc.textContent = product.description;
    stockText.textContent = "Current stock: " + product.quantity;

    const jwt = localStorage.getItem("jwt");

    if (jwt === "") {return;}

    if (await checkFavoriteExists(jwt) === true)
    {
        console.log("has favorite");
        favoriteButton.textContent = "Remove from Favorites";
    }
    else
    {
        console.log("does not have favorite");
        favoriteButton.textContent = "Add to Favorites";
    }
}

addToCartButton.addEventListener("click", async () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt === "")
    {
        window.location.href = "login.html";
    }

    const quantity = Number(quantityInput.value);
    if (!Number.isInteger(quantity) || quantity <= 0)
    {
        console.log("bad quantity");
        return;
    }

    await addProductToCart(jwt, quantity);
});

favoriteButton.addEventListener("click", async () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt === "")
    {
        window.location.href = "login.html";
    }

    if (await checkFavoriteExists(jwt) === true)
    {
        await removeFavorite(jwt);
    }
    else
    {
        await addFavorite(jwt);
    }
})