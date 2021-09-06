const Login = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const onLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const userInput = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        const response = await fetch(`${API_URL}/sign-in`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
        })

        const data = await response.json()
        console.log(data)
        e.target.reset()
    }

    return (
        <div>
            Login Page
            <form onSubmit={onLogin}>
                <label htmlFor="username">Enter Username</label>
                <input id="username" name="username" type="text" />
                <label htmlFor="password">Enter Password</label>
                <input id="password" name="password" type="password" />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default Login