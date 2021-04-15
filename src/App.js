import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {Products, Cart, Account} from "./pages";
import { initializeIcons } from '@fluentui/react/lib/Icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loadData: false,
        loadCategories: false
    };
  }

  componentDidMount(){         
    initializeIcons();
    fetch('https://fakestoreapi.com/products')
          .then(res=>res.json())
          .then(json=> {this.props.dispatch({ 
                        type: 'STORE PRODUCTS',
                        payload: json
                      })
                    this.setState({loadData: true})}
                )    

    fetch('https://fakestoreapi.com/products/categories')
          .then(res=>res.json())
          .then(json=>{this.props.dispatch({ 
                        type: 'STORE CATEGORIES',
                        payload: json
                      });
                      this.setState({loadCategories: true})}
                )
  }

  render() {
    const {loadData, loadCategories} = this.state;

    return (
      loadData && loadCategories &&
        <Router>
            <ul className="navigation">
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
        </Router>
    );
  }
}

export default connect()(App);
