import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Account from "./pages/Account";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        load: false
    };
  }

  componentDidMount(){         
    fetch('https://fakestoreapi.com/products')
          .then(res=>res.json())
          .then(json=> {this.props.dispatch({ 
                        type: 'STORE PRODUCTS',
                        payload: json
                      })
                    this.setState({load: true})}
                )       
  }

  render() {
    const {load} = this.state;
    
    return (
      load &&
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
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App);
