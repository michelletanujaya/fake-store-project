import _ from 'lodash';

// combine reducers!!!!!

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
    const newState = {...state}

    switch (action.type) {
        case 'EDIT ACCOUNT':
            newState.account = action.payload;
            return newState;
        case 'STORE PRODUCTS':
            //get all available categories
            const products = action.payload;
            const categories = [];

            products.map(item => {
                const cat = item.category;
                if(!categories.includes(cat))
                    categories.push(cat);
            })

            newState.products = products;
            newState.productCategories = categories;
            return newState;
        case 'ADD TO CART':
            let cart = [...state.cart];
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
        default:
            return state
    }
  }