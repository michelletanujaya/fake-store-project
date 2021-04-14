import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import MissingPage from './MissingPage';
import ProductPanel from '../components/ProductPanel'

import { Checkbox, Dropdown, SearchBox } from '@fluentui/react/lib';

const sortByOptions = [
    { key: 'default', text: 'Default' },
    { key: 'lowToHigh', text: 'Low to High' },
    { key: 'highToLow', text: 'High to Low' },
  ];

class Products extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            selectedCategories:[],
            sortby:"default",
            searchby:"",
            searchText:""
      };
    }

    selectCategory = (e, checked) => {
        const {selectedCategories} = this.state;

        const label = e.target.ariaLabel;
        let newCategories = [...selectedCategories];

        if(checked){
            newCategories.push(label)
        }else{
            newCategories = newCategories.filter(cat => {
                return cat !== label;
            })
        }
        
        this.setState({
            selectedCategories: newCategories
        })
    }

    selectSortBy = (item) => {
        console.log(item.key)
        this.setState({
            sortby: item.key
        })
    }

    changeSearchText = (text) => {
        this.setState({searchText: text})
    }

    selectSearch = (text) => {
        this.setState({searchby: text.trim()})
    }

    render() {
        const {selectedCategories, sortby, searchby, searchText} = this.state;
        const {productCategories, products} = this.props;

        let filteredProducts = [...products];

        //sory by price
        switch(sortby){
            case "default":
                filteredProducts = products;
                break;
            case "lowToHigh":
                filteredProducts = filteredProducts.sort(function (a, b) {
                    return a.price - b.price;
                  });
                break;
            case "highToLow":
                filteredProducts = filteredProducts.sort(function (a, b) {
                    return b.price - a.price;
                  });
                break;
            default:
        }

        //filter by category
        if(selectedCategories.length > 0){
            filteredProducts = filteredProducts.filter(item => {
                return selectedCategories.includes(item.category);
            })
        }

        //filter by search bar
        if(searchby.length > 0){
            filteredProducts = filteredProducts.filter(item => {
                return item.title.toLowerCase().indexOf(searchby.toLowerCase()) > -1;
            })
        }
        

        console.log(filteredProducts)
        if(filteredProducts.length > 0){
            return (
                <div className="common-page">
                    <div className="product-page">
                        <div className="filter-section">
                            <div className="filter-box">
                                <SearchBox 
                                    placeholder="Search" 
                                    onChange={(_, newValue) => this.changeSearchText(newValue)} 
                                    onSearch={newValue => this.selectSearch(newValue)}
                                    value={searchText} 
                                />
                            </div>
                            <div className="filter-box">
                                <div className="filter-title">
                                    Category
                                </div>
                                <div className="filter-category">
                                    {productCategories.map(cat => {
                                        return <Checkbox 
                                                    label= {cat}
                                                    checked={selectedCategories.includes(cat)} 
                                                    onChange={(e, checked)=> {this.selectCategory(e, checked)}} 
                                                />
                                    })}
                                </div>
                            </div>
                            <div className="filter-box">
                                <div className="filter-title">
                                    Sort By
                                </div>
                                <div className="filter-sortby">
                                    <Dropdown
                                        selectedKey={sortby}
                                        options={sortByOptions}
                                        onChange={(_, item)=> {this.selectSortBy(item)}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="product-section">
                            {filteredProducts.map(item => {
                                return <ProductPanel item= {item}/>
                            })}
                        </div>
                    </div>
                </div>
            );
        }else{
            return(<MissingPage/>)
        }
    }
}

function mapStateToProps(state) {
    return { 
        products: state.products,
        productCategories: state.productCategories 
    }
}

export default connect(mapStateToProps)(Products);