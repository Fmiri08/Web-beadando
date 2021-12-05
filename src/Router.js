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
          {/*azért exact, mivel ha magában a path lenne, akkor mindegyik 
          út megfelelne ennek.*/}
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/favourite">
            <Favourite />
          </Route>
          <Route path="/id/:id">
            <Game />
          </Route>
          {/*Bármilyen nem létező út a home-ra vezet vissza */}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
