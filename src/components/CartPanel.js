import React from 'react';
import { connect } from 'react-redux';

class CartPanel extends React.Component {
    render(){
        const {prod} = this.props;
        const item = prod.item;

        return (
            <div className="cart-panel">
                <div className="cart-image">
                    <img alt="image" src={item.image} width="150" height="70" />
                </div>
                <div className="cart-title">
                    <span>{item.title}</span>
                </div>
                <div className="cart-quantity">
                    <span>{prod.quantity}</span>
                </div>
            </div>
        );
    }
    
}

export default connect()(CartPanel);