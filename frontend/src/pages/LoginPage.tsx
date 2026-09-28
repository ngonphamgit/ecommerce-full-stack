import { useEffect } from "react";
import "./Auth.css";

function LoginPage()
{
    useEffect(() => {
        document.body.classList.add("login-page");

        return () => {
            document.body.classList.remove("login-page");
        }
    }, [])

    return (
        <div id="auth-page">
            <div id="auth-box">
                <div className="auth-field" id="username-field">
                    <label htmlFor="username-input" className="form-label" id="username-label">
                        Username:
                    </label>
                    <input id="username-input" className="form-control"></input>
                </div>
                <div className="auth-field" id="password-field">
                    <label htmlFor="password-input" className="form-label">
                        Password:
                    </label>
                    <input id="password-input" className="form-control" type="password"></input>
                </div>

                <button id="login-button" type="button" className="btn btn-primary">Log In</button>
            </div>
        </div>
    )
}

export default LoginPage;