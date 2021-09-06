const Login = () => {

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