const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDesc = document.getElementById("product-desc");
const stockText = document.getElementById("stock-text");

const quantityInput = document.getElementById("quantity-input");
const addToCartButton = document.getElementById("add-to-cart-button");

let productId;

async function addProductToCart(jwt, quantity)
{
    const data = {
        "id" : productId,
        "quantity" : quantity
    }

    const fetchResponse = await fetch(`http://localhost:8080/orders/cart`, {
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

    const addResponse = await fetch(`http://localhost:8080/orders/addItem`, {
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

function displayProduct(product)
{
    productId = product.id;
    productImage.src = "https://picsum.photos/300";
    productName.textContent = product.name;
    productPrice.textContent = "$" + product.price;
    productDesc.textContent = product.description;
    stockText.textContent = "Current stock: " + product.quantity;
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
})