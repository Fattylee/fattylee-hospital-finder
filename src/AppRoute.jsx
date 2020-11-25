import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

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
        component={() => (
          <div>
            <h1>Home page</h1>
            <p>nothing happen</p>
          </div>
        )}
      />

      <Route
        path="/(abouts?|us)"
        component={() => (
          <div>
            <h2>About page</h2>
          </div>
        )}
      />

      <Route
        exact
        path="/posts"
        render={() => (
          <h3>
            Post: all posts
            <br />
            {JSON.stringify(posts)}
          </h3>
        )}
      />

      <Route
        exact
        path="/posts/:id"
        render={({
          match: {
            params: { id },
          },
        }) => {
          const post = posts.find((post) => post.id === +id);
          const name = post ? post.name : "No name";

          return <h1>Post: single post: {name}</h1>;
        }}
      />

      <Route path="*" render={() => <h2>Not found</h2>} />
    </Switch>{" "}
    {children}
  </Router>
);
