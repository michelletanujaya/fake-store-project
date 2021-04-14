import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Account from "./Pages/Account";

function App() {
  return (
    <div className="navigation">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
          </Switch>

        </div>
      </Router>
    </div>
  );
}

export default App;
