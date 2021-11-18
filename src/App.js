import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/register" component={Register} />
        <AuthRoute exact path="/login" component={Login} />
        <Route exact path="/posts/:postId" component={SinglePost} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
