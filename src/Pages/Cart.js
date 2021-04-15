import React from 'react';
import { connect } from 'react-redux';
import CartPanel from "../components/CartPanel";

class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          cart: [],
          resetState:false
      };
    }

    resetState = () => {
        const {cart} = this.props;
        this.setState({cart});
    }

    componentDidMount(){
        this.resetState();
    }
    
    changeQuantity = (prod, item) => {
        const {dispatch} = this.props;
        
        dispatch({
            type: 'CHANGE QUANTITY',
            payload: {prod: prod.item, quantity: item.key}
        }, () => {
            this.resetState()
        });
    }

    render() {
        const {cart} = this.state;
        
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