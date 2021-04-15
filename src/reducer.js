import _ from 'lodash';

const initialState = {
    account:{
        userId: 1,
        fullName: "Michelle Tan",
        email: "michelle.tanujaya18@gmail.com",
        username: "michelletan",
        password: "password",
        address: "Melbourne"
    },
    products:[],
    productCategories:[],
    cart:[]
}


export default function reducer(state = initialState, action) {
    const newState = {...state};
    let cart = [...state.cart];

    switch (action.type) {
        case 'EDIT ACCOUNT':
            newState.account = action.payload;
            return newState;
        case 'STORE PRODUCTS':
            newState.products = action.payload;
            return newState;
        case 'STORE CATEGORIES':
            newState.productCategories = action.payload;
            return newState;
        case 'ADD TO CART':
            let hasItem = false;
            
            cart.forEach(item => {
                if(_.isEqual(item.item, action.payload)){
                    hasItem = true;
                    item.quantity = item.quantity + 1;
                }
            })

            if(!hasItem){
                cart = [...cart, { item: action.payload, quantity:1 }];
            }

            newState.cart = cart;
            return newState;
        case 'CHANGE QUANTITY':
            cart.forEach(item => {
                if(_.isEqual(item.item, action.payload.prod)){
                    item.quantity = action.payload.quantity;
                }
            })
            
            newState.cart = cart;
            return newState;
        case 'REMOVE FROM CART':
            const newCart = cart.filter((item)=> {
                return !_.isEqual(item.item, action.payload.prod);
            })
            
            newState.cart = [...newCart];
            return newState;
        default:
            return state
    }
  }