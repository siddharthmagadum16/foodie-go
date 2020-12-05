import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import About from './Components/About';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';
import NotFound from './Components/NotFound';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      authorised: 0
    }
    this.ChangeAuthState=()=>{
      this.setState({authorised: 1},()=> console.log(`state changed to : ${this.state.authorised}`)
      )
    }
  }

  render(){
    console.log(this.state.authorised)
  	return(
      <div className='App'>
        <Router>
          <Navbar authorised={this.state.authorised}/>
          {

            // (this.state.authorised)?(

              <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/register' component={Register} ChangeAuthState={this.ChangeAuthState}/>
              <Route exact path='*' component={NotFound}/>
            </Switch>
            // ):(

            // <Switch>
            //   <Route exact path='/' component={Home} />
            //   <Route exact path='/signin' component={SignIn} />
            //   <Route exact path='/register' component={Register} />
            //   <Route exact path='*' component={NotFound} />
            // </Switch>
            // )
          }
        </Router>
        {/* <p>tmp : {this.state.tmp}</p> */}
        {/* <button onClick={this.ChangeState} >Change state</button> */}
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