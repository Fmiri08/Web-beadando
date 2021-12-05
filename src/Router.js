import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Favourite from "./Favourite";
import Game from "./Game";
import Header from "./Header";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/favourite">
            <Favourite />
          </Route>
          <Route path="/id/:id">
            <Game />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
