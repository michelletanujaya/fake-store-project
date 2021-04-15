import React from 'react';
import { connect } from 'react-redux';
import CartPanel from "../components/CartPanel";

class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    
    changeQuantity = (prod, item) => {
        const {dispatch} = this.props;
        let type;
        const quantity = item.key;
        
        if(quantity > 0){
            type = 'CHANGE QUANTITY';
        }else{
            type = 'REMOVE FROM CART';
        }
        
        dispatch({
            type,
            payload: {prod: prod.item, quantity}
        });
    }

    render() {
        const {cart} = this.props;
        
        return (
            <div className="common-page">
                {cart.length > 0 ?
                    <div className="cart-page">
                        {cart.map(prod=> {
                            return <CartPanel 
                                    prod={prod}
                                    onChangeQuantity={(prod, item) => {this.changeQuantity(prod, item)}}/>
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