import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from '@fluentui/react/lib';

class CartPanel extends React.Component {
    render(){
        const {prod,onChangeQuantity} = this.props;
        const item = prod.item;

        //Assuming there's only 4 quantities available in the store per product
        let quantities = [
            { key: 1, text: '1' },
            { key: 2, text: '2' },
            { key: 3, text: '3' },
            { key: 4, text: '4' }
        ];

        //if the quantity is greater than 4 (default),
        //add another options for the dropdown so the
        //system will not crash
        if(prod.quantity > 4){
            let i = 5;
            while (i <= prod.quantity) {
                quantities = [...quantities, { key: i, text: i.toString() }];
                i++;
            }
        }

        return (
            <div className="cart-panel">
                <div className="cart-desc">
                    <div className="cart-image">
                        <img alt="image" src={item.image} />
                    </div>
                    <div className="cart-title">
                        <span>{item.title}</span>
                    </div>
                </div>
                <div className="cart-quantity">
                    <Dropdown
                        selectedKey={prod.quantity}
                        options={quantities}
                        onChange={(_, item)=> {onChangeQuantity(prod, item)}}
                    />
                </div>
            </div>  
        );
    }
    
}

export default connect()(CartPanel);