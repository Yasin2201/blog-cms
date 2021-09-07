import Login from './components/Login'
import Posts from './components/Posts'
import EditPost from './components/EditPost'
import NewPost from './components/NewPost'
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import { useEffect, useState } from 'react'

const App = () => {
  const [userAuthorised, setUserAuthorised] = useState(false)

  useEffect(() => {
    const userAuth = sessionStorage.getItem('userAuth')
    if (userAuth) {
      setUserAuthorised(true)

    } else {
      setUserAuthorised(false)
    }
  }, [])

  return (
    <BrowserRouter>
      <h1>
        Blog CMS
      </h1>
      {!userAuthorised &&
        <Switch>
          <Route exact path='/login'>
            <Login setUserAuthorised={setUserAuthorised} />
          </Route>
        </Switch>
      }

      {userAuthorised &&
        <Switch>
          <Route exact path='/login'>
            <Redirect to="/posts" />
          </Route>

          <Route exact path='/posts'>
            <Posts setUserAuthorised={setUserAuthorised} />
          </Route>

          <Route exact path='/posts/:id'>
            <EditPost setUserAuthorised={setUserAuthorised} />
          </Route>

          <Route exact path='/new-post'>
            <NewPost />
          </Route>
        </Switch>
      }

    </BrowserRouter>
  );
}

export default App;
