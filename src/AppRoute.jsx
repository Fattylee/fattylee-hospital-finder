import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";

class Auth {
  constructor() {
    this.authenticated = false;
  }
  login() {
    this.authenticated = true;
  }
  logout() {
    this.authenticated = false;
  }
  get isAuthenticated() {
    return this.authenticated;
  }
}
const auth = new Auth();

let randValue = Math.ceil(Math.random() * 100);
const posts = [
  {
    id: 1,
    name: "Abu adaan",
  },
  {
    id: 2,
    name: "Ummu abdillah",
  },
  {
    id: 3,
    name: "Abdullah ibn AbdulFattah",
  },
];

const Logout = (props) => (
  <button
    onClick={() => {
      auth.logout();
      props.history.push("/");
    }}
  >
    logout
  </button>
);

const About = (props) => {
  console.log(props);
  return (
    <div>
      <h2>About page</h2>
    </div>
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export const AppRoute = ({ children }) => (
  <Router>
    <aside
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/posts">Posts</Link>
      <Link to={`/posts/${randValue}`}>post</Link>
    </aside>
    <Switch>
      <Route
        exact
        path="/"
        component={(props) => (
          <div>
            <h1>Home page</h1>
            <p>
              {!auth.isAuthenticated ? (
                <button
                  onClick={() => {
                    auth.login();
                    props.history.push("/posts");
                  }}
                >
                  login
                </button>
              ) : (
                <Logout {...props} />
              )}
            </p>
          </div>
        )}
      />

      <Route
        path="/(abouts?|us)"
        component={(props) => {
          if (props.history.location.pathname === "/about") {
            // props.history.push("posts");
            // return <Redirect to="post"  />;
          }
          return <About {...props} />;
        }}
      />

      <ProtectedRoute
        exact
        path="/posts"
        component={(props) => (
          <h3>
            Post: all posts
            <Logout {...props} />
            <br />
            {JSON.stringify(posts)}
          </h3>
        )}
      />

      <ProtectedRoute
        exact
        path="/posts/:id"
        component={({
          match: {
            params: { id },
          },
          ...rest
        }) => {
          const post = posts.find((post) => post.id === +id);
          const name = post ? post.name : "No name";

          return (
            <h1>
              Post: single post: {name}
              <Logout {...rest} match={{ params: { id } }} />
            </h1>
          );
        }}
      />

      <Route path="*" render={() => <h2>Not found</h2>} />
    </Switch>{" "}
    {children}
  </Router>
);
