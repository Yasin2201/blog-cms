import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Posts = ({ setUserAuthorised }) => {
    const [allPosts, setAllPosts] = useState([])
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const response = await fetch(`${API_URL}/posts`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                })
                if (response.status === 401) {
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('userAuth')
                    setUserAuthorised(false)
                }
                const data = await response.json()
                setAllPosts(data.all_posts)
            } catch (err) {
                console.error(err)
            }
        }
        getAllPosts()
    }, [API_URL, setUserAuthorised])

    return (
        <div>
            {allPosts.map((post) => {
                return (
                    <div key={post._id}>
                        <p>{post.author}</p>
                        <p>{post.title}</p>
                        <p>{post.text}</p>
                        <p>{post.date}</p>
                        <Link to={`/posts/${post._id}`}>
                            <button>
                                Edit Post
                            </button>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts