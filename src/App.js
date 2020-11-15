import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import About from './Components/About';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';


class App extends React.Component{
  constructor(){  
    super();
    this.state={
      tmp: 1
    }
    this.ChangeState=()=>{
      this.setState({
        tmp: 2
      })

    }
  }
  render(){
  	return(
      <div className='App'>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Router>
        <p>{this.state.tmp}</p>
        <button onClick={this.ChangeState} >Change state</button>
      </div>
    );
  }
}

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