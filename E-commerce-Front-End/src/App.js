import './App.scss';
import 'antd/dist/antd.css';
import { useState } from 'react';
import CategoriesList from './Components/Category/CategoriesList'
import ProductList from './Components/Porduct/ProductsList'
import { Input } from 'antd';
import { connect } from "react-redux";
import { Button } from 'antd';
import { setSearchKey  } from './Actions/param'
import { searchProduct } from "./Actions/product";

const App = (props) => {
  const {setSearchKey , searchProduct} = props
  const [searchKey, setSearchValue] = useState(null)

  const search = async () => {

    if(searchKey){
      await setSearchKey(searchKey)
      await searchProduct(searchKey)
    }

  }

  const handleChange = (event) =>{
    setSearchValue(event.target.value)
  }

  return (
    <div className="App">
      <header id="header">
        <div className="logo">Logo</div> 
          <Input onChange={handleChange} placeholder="Global search" style={{width : "30%" }} />
          <Button onClick={search} style={{marginLeft : 10}}>Search</Button>
      </header>
      <div className="Content">
        <div className="Categories">
          <CategoriesList/>
        </div>
        <div className="Products">
          <ProductList/>  
        </div>
      </div>
    </div>
  );
}

export default connect(null,{setSearchKey , searchProduct})(App) ;
