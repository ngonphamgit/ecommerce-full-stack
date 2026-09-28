import "./Header.css"

function Header()
{
    const token = localStorage.getItem("jwt");
    const isLoggedIn = token !== null;

    const handleHomeClick = () => {
        
    }

    const handleProfileClick = () => {

    }

    const handleCartClick = () => {

    }

    const handleLogoutClick = () => {

    }

    const handleSignupClick = () => {

    }

    const handleLoginClick = () => {

    }

    return (
        <header>
            <div id="header-top-bar">
                <button type="button" id="home-button" className="btn btn-primary header-button">Home</button>
                <h1 id="header-title">Clamp Commerce</h1>
                <div id="header-top-right-buttons">
                    {(!isLoggedIn) ?
                    (<>
                    <button type="button" id="profile-button" className="btn btn-primary header-button">Profile</button>
                    <button type="button" id="cart-button" className="btn btn-primary header-button">Cart</button>
                    <button type="button" id="logout-button" className="btn btn-danger header-button">Log Out</button>
                    </>)
                    :
                    (<>
                    <button type="button" id="signup-button" className="btn btn-success header-button">Sign Up</button>
                    <button type="button" id="login-button" className="btn btn-primary header-button">Log In</button>
                    </>)
                    }
                    
                </div>
            </div>

            <div id="search-container">
                <input id="search-bar "type="search" className="form-control" placeholder="Search products..."></input>
                <button id="search-button" type="button" className="btn btn-primary">Search</button>
            </div>
        </header>
    )
}

export default Header;