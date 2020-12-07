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
      authorised: 0,
      username: '',
    }
    this.changeAuth=this.changeAuth.bind(this)
    console.log(`username in App.js ${this.state.username}`)
  }


  changeAuth=(username)=>{
    this.setState({
      authorised: (this.state.authorised===1)?0:1,
      username: username
      // username: username,
    },()=> console.log(`state changed to : ${this.state.authorised} username: ${this.state.username} `)

    )
  }

  render(){
    // {/* <Route exact path='/signout' component={SignOut} /> */}
    console.log(this.state.authorised)
  	return(
      <div className='App'>
        <Router>
          <Navbar authorised={this.state.authorised} changeAuth={this.changeAuth}/>
          {

            <Switch>
              <Route exact default path='/' component={ ()=> <SignIn changeAuth={this.changeAuth}/> }  />
              <Route exact path='/about' component={About} />
              <Route exact path='/signin' component={ ()=> <SignIn changeAuth={this.changeAuth}/> }/>
              <Route exact path='/register' component={ ()=> <Register changeAuth={this.changeAuth}/> } />
              <Route exact path='/home' component={()=> <Home />} />
              <Route exact path='/home/buy' component={()=><BuyFood  />} />
              <Route exact path='/home/sell' component={()=> <SellFood username={this.state.username} />} />
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