import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import About from './Components/About';
import Register from './Components/Register';
import SignIn from './Components/SignIn';
// import SignOut from './Components/SignOut';
import NotFound from './Components/NotFound';
import BuyFood from './Components/Buy';
import SellFood from './Components/Sell';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      authorised: 0
    }
    this.changeAuth=this.changeAuth.bind(this)
  }


  changeAuth=()=>{
    this.setState({authorised: 1},()=> console.log(`state changed to : ${this.state.authorised}`)
    )
  }

  render(){
    // {/* <Route exact path='/signout' component={SignOut} /> */}
    console.log(this.state.authorised)
  	return(
      <div className='App'>
        <Router>
          <Navbar authorised={this.state.authorised} />
          {

            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/' component={ ()=> <SignIn changeAuth={this.changeAuth}/> }  />
              <Route exact path='/signin' component={ ()=> <SignIn changeAuth={this.changeAuth}/> }/>
              <Route exact path='/register' component={ ()=> <Register changeAuth={this.changeAuth}/> } />
              <Route exact path='/home/buy' component={BuyFood} />
              <Route exact path='/home/sell' component={SellFood} />
              <Route exact path='*' component={NotFound}/>
            </Switch>

          }
        </Router>
      </div>
    );
  }
}

// export changeAuth;
export default App;

    /*

    <div>

    <Router>
    <div className="App">
    <Navbar/>
    <Switch>
    <Home exact    Component={Home} />
    <About exact path='./Components/About'  Component={About}/>
    </Switch>
    </div>
    </Router>
            </div>

*/