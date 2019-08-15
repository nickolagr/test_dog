import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    products: [],
    product: {
      product_name: '',
      sku:'',
      id:''
    }
   
  }

  componentDidMount(){
    this.getProducts();
  

  }

  getProducts = _ => {
    fetch('http://localhost:4000/products')
    .then(response => response.json())
    .then(response => this.setState({products: response.data }))
   
    .catch(err => console.error(err))

  }

  addProduct = _ => {
    const {product} = this.state;
    fetch(`http://localhost:4000/products/add?product_name=${product.product_name}&sku=${product.sku}`)
   
    .then(this.getProducts)
    
    .catch(err => console.error(err))

  }

//custom code

deleteProduct = id => {
    // <-- declare id parameter
    const {product} = this.state;
   fetch(`http://localhost:4000/products/delete/` + id, 
      {method: 'delete'})
    .then(response => response.json())
    .then(this.getProducts)
    .catch(err => console.error(err))

  }

editProduct = id => {
    // <-- declare id parameter

    const {product} = this.state;
   fetch(`http://localhost:4000/products/update/` + id + `?product_name=${product.product_name}&sku=${product.sku}`, 
      {method: 'post'})
    .then(response => response.json())
    .then(this.getProducts)
    .catch(err => console.error(err))

  }
//end
  /*here need to handle changes with edit Product*/
  renderProduct = ({id, product_name, sku}) => 
  <div key={id}>{id}  {product_name} {sku} 
//edit button need fixes
//<button onClick={() => {this.editProduct(id)}}>editProduct</button>&nbsp;&nbsp;&nbsp; 
  
  <button onClick={() => {this.deleteProduct(id)}}>deleteProduct</button>

  </div>


render(){
    const { products, product } = this.state;
  return (
   <div className="App">
    {products.map(this.renderProduct)} 
      <div>
      <input
        value ={product.product_name} 
        onChange={e => this.setState({product: {... product, product_name: e.target.value }})}
      />
      <input 
        value ={product.sku}
        onChange={e => this.setState({product: {... product, sku: e.target.value }})}
      />
      <button onClick={this.addProduct}>addProduct</button>

      </div>
    </div>
 
  );
  }
}

export default App;
