import { Link } from "react-router-dom"


const Navbar = ({ userAuthorised }) => {

    return (
        <nav>
            <h1>Blog CMS</h1>

            {userAuthorised &&
                <div>
                    <Link to={`/posts`}>
                        Posts
                    </Link>
                    <Link to={`/new-post`}>
                        New Post
                    </Link>
                    <Link to={`/login`}>
                        <button>
                            Sign Out
                        </button>
                    </Link>
                </div>}
        </nav>
    )
}

export default Navbar