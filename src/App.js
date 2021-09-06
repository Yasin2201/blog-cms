import Login from './components/Login'
import Posts from './components/Posts'
import EditPost from './components/EditPost'
import NewPost from './components/NewPost'
import { BrowserRouter, Route, Switch } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <h1>
        Blog CMS
      </h1>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>

        <Route exact path='/posts'>
          <Posts />
        </Route>

        <Route exact path='/edit-post'>
          <EditPost />
        </Route>

        <Route exact path='/new-post'>
          <NewPost />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
