const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async () => {
    const newUsername = usernameInput.value;
    const newPassword = passwordInput.value;
    const userData = {
        "username" : usernameInput.value,
        "password" : passwordInput.value
    };

    const response = await fetch(`https://ecommerce-full-stack-5pvu.onrender.com/auth/login`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(userData)
    });

    if (!response.ok)
    {
        console.log("bad");
        return;
    }

    console.log("good");
    const data = await response.json();
    localStorage.setItem("jwt", data.token);

    window.location.href = "index.html";
});

