import { useEffect, useState } from "react";
import '../styles/Comments.css';

const Comments = ({ id, setUserAuthorised }) => {
    const [postComments, setPostComments] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
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
                const formattedData = data.posts_comments.map((comment) => comment = {
                    ...comment,
                    date: new Date(comment.date).toLocaleDateString("en-gb", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    }),
                    time: new Date(comment.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                    })
                })
                setPostComments(formattedData)
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
        postComments.length > 0 &&
        <div id="comments-container">
            <h1> Posts Comments</h1>
            <div id="all-comments-div">
                {postComments.map((comment) => {
                    return (
                        <div className="comment-div" key={comment._id}>
                            <div className="comment-text">
                                <h5>{comment.text}</h5>
                            </div>
                            <div>
                                <hr />
                                <p>{comment.date} @ {comment.time}</p>
                                <p>Comment By {comment.username}</p>
                                <button className="delete-btn" onClick={() => deleteComment(comment._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>

    )
}
export default Comments