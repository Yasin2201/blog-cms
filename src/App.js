import Login from './components/Login'
import Posts from './components/Posts'
import EditPost from './components/EditPost'
import NewPost from './components/NewPost'

function App() {
  return (
    <div>
      Blog CMS
      <Login />
      <Posts />
      <EditPost />
      <NewPost />
    </div >
  );
}

export default App;
