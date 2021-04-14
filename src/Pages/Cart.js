import React from 'react';
import { connect } from 'react-redux';
import CartPanel from "../components/CartPanel";

class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    componentDidMount(){
    }

    render() {
        const {cart} = this.props;
        console.log(cart)
        return (
            <div className="common-page">
                {cart.length > 0 ?
                    <div className="cart-page">
                        {cart.map(prod=> {
                            return <CartPanel prod={prod}/>
                        })}
                    </div>
                :
                    <h2>Your shopping bag is empty</h2>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { cart: state.cart }
}

export default connect(mapStateToProps)(Cart);