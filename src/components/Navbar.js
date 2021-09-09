import { Link } from "react-router-dom"
import '../styles/Navbar.css'

const Navbar = ({ userAuthorised, setUserAuthorised }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const onSignOut = async (e) => {
        e.preventDefault()

        try {
            await fetch(`${API_URL}/sign-out`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userAuth')
            setUserAuthorised(false)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <nav>
            <h1>Blog CMS</h1>

            {userAuthorised &&
                <div className="nav-actions">
                    <Link to={`/posts`}>
                        Posts
                    </Link>
                    <Link to={`/new-post`}>
                        New Post
                    </Link>
                    <button onClick={onSignOut}>
                        Sign Out
                    </button>
                </div>}
        </nav>
    )
}

export default Navbar