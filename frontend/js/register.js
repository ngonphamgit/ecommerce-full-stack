const usernameInput = document.getElementById("username-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const registerButton = document.getElementById("register-button");

registerButton.addEventListener("click", async () => {
    const newUsername = usernameInput.value;
    const newPassword = passwordInput.value;
    const userData = {
        "username" : usernameInput.value,
        "email" : emailInput.value,
        "password" : passwordInput.value
    };

    const response = await fetch(`https://ecommerce-full-stack-5pvu.onrender.com/auth/register`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(userData)
        }
    );

    if (response.ok)
    {
        console.log("User created");
    }
    else
    {
        console.log("User already exists");
    }
})






/*
const token = localStorage.getItem("token");

fetch("/api/orders", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
*/