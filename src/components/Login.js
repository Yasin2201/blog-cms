import { useState } from 'react';
import '../styles/Login.css'

const Login = ({ setUserAuthorised }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [message, setMessage] = useState()

    const onLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const userInput = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        try {
            const response = await fetch(`${API_URL}/sign-in`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInput)
            })
            const data = await response.json()
            if (data.message) {
                setMessage(data.message)
            } else {
                setMessage()
            }
            if (response.status !== 401) {
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('userAuth', data.userAuth)
                setUserAuthorised(true)
            } else {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('userAuth')
                setUserAuthorised(false)
            }
        } catch (err) {
            console.error(err)
        }
        e.target.reset()
    }

    return (
        <div className="login-div">
            <h2>Login</h2>
            <form className="login-form" onSubmit={onLogin}>
                <label htmlFor="username">Username:</label>
                <input id="username" name="username" type="text" />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" />
                <button type="submit">Sign In</button>
            </form>
            {message &&
                <p className="error-message">
                    {message}!
                </p>
            }
        </div>
    )
}

export default Login