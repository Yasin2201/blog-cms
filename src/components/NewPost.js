import { useState } from "react";
import { useHistory } from "react-router";

const NewPost = ({ setUserAuthorised }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [errors, setErrors] = useState()
    let history = useHistory();

    const onNewPostSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const userInput = {
            title: formData.get('title'),
            author: formData.get('author'),
            text: formData.get('text'),
        }

        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(userInput)
            })
            const data = await response.json()

            if (data.errors) {
                setErrors(data.errors)
            } else {
                history.push("/posts");
            }

            if (response.status === 401) {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('userAuth')
                setUserAuthorised(false)
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div id="post-container">
            <h1>New Post</h1>
            <form className="edit-post-form" onSubmit={(e) => onNewPostSubmit(e)}>
                <input type="text" name="author" placeholder="Author" />
                <input type="text" name="title" placeholder="Title" />
                <textarea type="text" name="text" placeholder="Text" />
                <button className="save-changes-btn" type="submit">Submit</button>
            </form>
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
        </div>
    )
}

export default NewPost