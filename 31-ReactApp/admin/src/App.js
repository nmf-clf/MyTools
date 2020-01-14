import React,{ Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.less';
//引入组件
import Home from 'pages/home';
import User from 'pages/user';
import Category from 'pages/category';
import Product from 'pages/product';
import Order from 'pages/order';
import Permission from 'pages/permission';
import Components from 'pages/components';
import Tools from 'pages/tools';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  componentDidMount(){
    console.log("App::",this.props.location)
  }
  render(){
    return (
      //Router里面只能有一个子元素 
      <Router 
        forceRefresh={false}
      >
				<div className="App">
					<Switch>
						<Route exact path="/" component={ Home } />	
            <Route path="/user" component={ User } />		
            <Route path="/category" component={ Category } />
            <Route path="/product" component={ Product } />		
            <Route path="/Order" component={ Order } />
            <Route path="/permission" component={ Permission } />
            <Route path="/components" component={ Components } />
            <Route path="/tools" component={ Tools } />
					</Switch>	
				</div>		
			</Router>
    );
  }
}

export default App;
