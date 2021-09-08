import Comments from './Comments'
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const EditPost = ({ setUserAuthorised }) => {
    const [post, setPost] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    const { id } = useParams();

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`${API_URL}/posts/${id}`, {
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
                setPost(data.found_post)
            } catch (err) {
                console.error(err)
            }
        }
        getPost()

    }, [API_URL, id, setUserAuthorised])

    const submitEdit = async () => {
        try {
            const response = await fetch(`${API_URL}/posts/${id}`, {
                method: "PUT",
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            }
            );
            if (response.status === 401) {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('userAuth')
                setUserAuthorised(false)
            }
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div>
            <h1>Post</h1>
            <div key={post._id}>
                <input type="text" name="author" value={post.author} onChange={(e) => setPost({ ...post, author: e.target.value })} />
                <input type="text" name="title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
                <input type="text" name="text" value={post.text} onChange={(e) => setPost({ ...post, text: e.target.value })} />
                <p>{post.date}</p>
                <button onClick={() => submitEdit()}>Save Changes</button>
            </div>
            <Comments id={id} setUserAuthorised={setUserAuthorised} />
        </div>
    )
}

export default EditPost