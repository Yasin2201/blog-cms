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



    return (
        <div>
            <div key={post._id}>
                <p>{post.author}</p>
                <p>{post.title}</p>
                <p>{post.text}</p>
                <p>{post.date}</p>
            </div>
        </div>
    )
}

export default EditPost