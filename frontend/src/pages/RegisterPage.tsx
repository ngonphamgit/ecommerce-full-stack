import { useEffect } from 'react';
import './Auth.css'

function RegisterPage()
{
    useEffect(() => {
        document.body.classList.add("register-page");

        return () => {
            document.body.classList.remove("register-page");
        }
    }, [])

    return (
        <div id="auth-page">
            <div id="auth-box">
                <div className="auth-field" id="username-field">
                    <label htmlFor="username-input" className="form-label" id="username-label">
                        New Username:
                    </label>
                    <input id="username-input" className="form-control"></input>
                </div>
                <div className="auth-field" id="email-field">
                    <label htmlFor="email-input" className="form-label">
                        New Email:
                    </label>
                    <input id="email-input" className="form-control" type="email"></input>
                </div>
                <div className="auth-field" id="password-field">
                    <label htmlFor="password-input" className="form-label">
                        New Password:
                    </label>
                    <input id="password-input" className="form-control" type="password"></input>
                </div>

                <button id="register-button" type="button" className="btn btn-primary">Register</button>
            </div>
        </div>
    )
}

export default RegisterPage;