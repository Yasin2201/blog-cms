import { useState, useEffect } from "react";
import { useParams } from "react-router";

const EditPost = ({ setUserAuthorised }) => {
    const [post, setPost] = useState([]);
    const [postComments, setPostComments] = useState([]);
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

        const getComments = async () => {
            try {
                const response = await fetch(`${API_URL}/posts/${id}/comments`, {
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
                setPostComments(data.posts_comments)
            } catch (err) {
                console.error(err)
            }
        }
        getComments()

    }, [API_URL, id, setUserAuthorised])

    const deleteComment = async (commentid) => {
        try {
            await fetch(`${API_URL}/posts/${id}/comments/${commentid}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
            const newComments = postComments.filter(
                (comment) => comment._id !== commentid
            );
            setPostComments(newComments);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <div key={post._id}>
                <p>{post.author}</p>
                <p>{post.title}</p>
                <p>{post.text}</p>
                <p>{post.date}</p>
            </div>
            {postComments.map((comment) => {
                return (
                    <div key={comment._id}>
                        <p>{comment.username}</p>
                        <p>{comment.text}</p>
                        <p>{comment.date}</p>
                        <button onClick={() => deleteComment(comment._id)}>
                            Delete
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default EditPost