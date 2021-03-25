import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navigation/Navbar'
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';
// import SignOut from './Components/SignOut';
import NotFound from './Components/NotFound';
import BuyFood from './Components/Home/Home-components/Buy';
import SellFood from './Components/Home/Home-components/Sell';
import Welcome from './Components/Welcome';
// let loggedin=0;
class App extends React.Component{
  constructor(){
    super();
    this.state={
      authorised: 0,
      username: ''
    }
    this.changeAuth=this.changeAuth.bind(this)
  }


  changeAuth=(username)=>{
    this.setState({
      authorised: (this.state.authorised===1)?0:1,
      username: username
      // username: username,
    },()=> console.log(`state changed to : ${this.state.authorised} username: ${this.state.username} `)

    )
  }

  componentDidMount(){
    const Loggedin=window.localStorage.getItem("authorised");
    if(Loggedin!==undefined){
      this.setState({authorised:parseInt(Loggedin)})
    }else{
      this.setState({authorised:0})
      window.localStorage.setItem("authorised","0");
    }
  }

  componentDidUpdate(){
    window.localStorage.setItem("authorised",this.state.authorised);
  }

  render(){
    console.log(this.state.authorised)
  	return(
      <div className='App'>
        <Router>
        <div className='header'  >
            <Navbar authorised={this.state.authorised}/>
        </div>
        <div className='body'>

          {
            (this.state.authorised===1)?(
              <Switch>
              <Route exact default path='/' component={ ()=> <SignIn changeAuth={this.changeAuth}/> }  />
              <Route exact path='/about' component={About} />
              <Route exact path='/signin' component={ ()=> <SignIn changeAuth={this.changeAuth}/> }/>
              <Route exact path='/register' component={ ()=> <Register changeAuth={this.changeAuth}/> } />
                <Route exact path='/home' component={()=> <Home />} />
                <Route exact path='/home/buy' component={()=><BuyFood  />} />
                <Route exact path='/home/sell' component={()=> <SellFood username={this.state.username} />} />
            </Switch>
            ):(
              <Switch>
                <Route exact path='/about' component={About} />
                <Route exact path='/signin' component={ ()=> <SignIn changeAuth={this.changeAuth}/> }/>
                <Route exact path='/register' component={ ()=> <Register changeAuth={this.changeAuth}/> } />
                <Route exact path='/getimage' component={Welcome} />
                <Route exact path='*' component={NotFound} />
              </Switch>
              )
          }
        </div>

        </Router>
      </div>
    );
  }
}

export default App;

    /*


*/