import { useHistory } from "react-router";
const NewPost = ({ setUserAuthorised }) => {
    const API_URL = process.env.REACT_APP_API_URL;
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
            console.log(data)
            history.push("/posts");

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
        <div>
            <h1>New Post</h1>
            <form onSubmit={(e) => onNewPostSubmit(e)}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="author" placeholder="Author" />
                <input type="text" name="text" placeholder="Text" />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default NewPost