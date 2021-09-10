import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "../styles/Posts.css"

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

                const formattedData = data.all_posts.map((post) => post = {
                    ...post,
                    date: new Date(post.date).toLocaleDateString("en-gb", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    }),
                    time: new Date(post.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                    })
                })
                setAllPosts(formattedData)
            } catch (err) {
                console.error(err)
            }
        }
        getAllPosts()
    }, [API_URL, setUserAuthorised])

    const deletePost = async (postid) => {
        try {
            await fetch(`${API_URL}/posts/${postid}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
            const newPosts = allPosts.filter(
                (post) => post._id !== postid
            );
            setAllPosts(newPosts);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div id="posts-container">
            {allPosts.map((post) => {
                return (
                    <div className="posts-div" key={post._id}>
                        <h1>{post.title}</h1>
                        <div>
                            <p>{post.date} @ {post.time}</p>
                            <p>Post By {post.author}</p>
                        </div>

                        <div className="post-actions">
                            <Link to={`/posts/${post._id}`}>
                                <button className="edit-btn">
                                    Edit
                                </button>
                            </Link>
                            <button className="delete-btn" onClick={() => deletePost(post._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts