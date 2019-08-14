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
/*  deleteProduct = _ => {
    const {product} = this.state;
    fetch(`http://localhost:4000/products}`)
   
    .then(this.getProducts)
    
    .catch(err => console.error(err))

  }*/
deleteProduct = _ => {
    // <-- declare id parameter
    const {product} = this.state;
    fetch(`http://localhost:4000/products/delete/${product.id}`)
   
    .then(console.log(product.id))
    .catch(err => console.error(err))

  }

//end

  renderProduct = ({id, product_name, sku}) => 
  <div key={id}>{id}  {product_name} {sku} 

  <button onClick={this.deleteProduct}>deleteProduct</button>

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
