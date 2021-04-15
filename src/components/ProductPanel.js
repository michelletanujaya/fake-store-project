import React from 'react';
import { connect } from 'react-redux';
import { PrimaryButton } from '@fluentui/react/lib/Button';

class ProductPanel extends React.Component {
    addToCart = (item) => {
        const {dispatch} = this.props;

        dispatch({
            type: 'ADD TO CART',
            payload: item
        });
    }

    render(){
        const {item} = this.props;

        return (
            <div className="product-panel">
                <div className="product-image">
                    <img alt="product-img" src={item.image} />
                </div>
                <div className="product-desc">
                    <div className="product-title">
                        <span>{item.title}</span>
                    </div>
                    <div className="product-description">
                        <p>{item.description}</p>
                    </div>
                    <div className="product-footer">
                        <div className="product-price">
                            <span>$ {item.price}</span>
                        </div>
                        <div className="addtocart-button">
                            <PrimaryButton onClick={() => this.addToCart(item)} text="Add To Cart" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default connect()(ProductPanel);