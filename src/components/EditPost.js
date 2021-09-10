import Comments from './Comments';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/EditPost.css";

const EditPost = ({ setUserAuthorised }) => {
    const [post, setPost] = useState([]);
    const [errors, setErrors] = useState();
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
                setPost(data.found_post = { ...data.found_post, date: new Date(data.found_post.date).toLocaleString("en-US") })
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
            const data = await response.json()

            if (data.errors) {
                setErrors(data.errors)
            } else {
                setErrors([{ msg: data.message }])
            }

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
        <div id="post-container">
            <h1>Post</h1>
            <div className="edit-post-form" key={post._id}>
                <input type="text" name="author" placeholder="Authors Name" value={post.author} onChange={(e) => setPost({ ...post, author: e.target.value })} />
                <input type="text" name="title" placeholder="Title of Blog" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
                <textarea type="text" name="text" placeholder="Enter some interesting text here..." value={post.text} onChange={(e) => setPost({ ...post, text: e.target.value })} />
                <p>Posted: {post.date}</p>
                <button className="save-changes-btn" onClick={() => submitEdit()}>Save Changes</button>
            </div>
            {errors &&
                <div>
                    {
                        errors.map((error) => {
                            return (
                                <div key={errors.indexOf(error)} className="error-message">
                                    {error.msg}!
                                </div>
                            )
                        })
                    }
                </div>}
            <Comments id={id} setUserAuthorised={setUserAuthorised} />
        </div>
    )
}

export default EditPost