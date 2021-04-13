import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navigation/Navbar'
import Home from './Components/Home/Home';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';
import NotFound from './Components/NotFound';
import BuyFood from './Components/Home/Home-components/Buy';
import SellFood from './Components/Home/Home-components/Sell';
import Welcome from './Components/Welcome/Welcome';
class App extends React.Component{
  constructor(){
    super();
    this.state={
      authorised: 0,
      username: '',
      verified: 0
    }
    this.changeAuth=this.changeAuth.bind(this)
  }

  getAuthstatus=()=>{
    return this.state.authorised
  }
  changeVerificationStatus=()=>{
    this.setState({verified: 1})
  }

  changeAuth=(username)=>{
    this.setState({
      authorised: (this.state.authorised===1)?0:1,
      username: username
    },()=> console.log(`state changed to : ${this.state.authorised} username: ${this.state.username} `)

    )
  }

  componentDidMount(){
    const Loggedin=window.localStorage.getItem("authorised");
    if(Loggedin!==undefined){
      this.setState({authorised:parseInt(Loggedin),username: window.localStorage.getItem("username")})
    }else{
      this.setState({authorised:0,username:""})
      window.localStorage.setItem("authorised","0");
    }
  }

  componentDidUpdate(){
    window.localStorage.setItem("authorised",this.state.authorised);
    window.localStorage.setItem("username",this.state.username);
  }

  render(){
    console.log(this.state.authorised)
  	return(
      <div className='App'>
        <Router>
        <div className='header'  >
            <Navbar authorised={this.state.authorised}/>
        </div>
        <div className='app-body'>

          {
            (this.state.authorised===1 )?(
              <Switch>
              <Route exact path='/' component={Welcome} />
                <Route exact path='/home' component={()=> <Home />} />
                <Route exact path='/home/buy' component={()=><BuyFood username={this.state.username} />} />
                <Route exact path='/home/sell' component={()=> <SellFood username={this.state.username} />} />
                <Route exact path='*' component={NotFound} />
            </Switch>
            ):(
              <Switch>
                <Route exact path='/signin' component={ ()=> <SignIn changeAuth={this.changeAuth}/> }/>
                <Route exact path='/register' component={ ()=> <Register changeVerificationStatus={this.changeVerificationStatus} changeAuth={this.changeAuth}/> } />
                <Route exact path='/' component={Welcome} />
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