const NewPost = () => {
    return (
        <div>
            <h1>New Post</h1>
            <form>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="author" placeholder="Author" />
                <input type="text" name="text" placeholder="Text" />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default NewPost