import React, { Fragment } from 'react';
import axios from 'axios'
import './SignIn.css'


export class Signin extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            signin_status:''
        }

        this.onSubmitSignin=(event)=>{
            event.preventDefault();
            axios.post('https://foodie-go-api-heroku.herokuapp.com'+'/signin',this.state)
            .then(res=>parseInt(res.data))
            .then(res=>{
                // console.log(res)
                if(res===1){
                    // console.log("signed in")
                    // props.setState({username:this .state.username})
                    // console.log(props.changeAuth(this.state.username))
                    props.changeAuth(this.state.username);
                    window.location.href="/home"

                } else{
                    this.setState({signin_status:'Invalid email or password'})
                    console.log(`unable to signin`)
                }
            })
            .catch(err=>console.log(err))
        }

        this.changeHandler=(event)=>{
            this.setState({
            [event.target.name]: event.target.value
            })
            // ,()=>console.log(`${this.state.username}${this.state.password}`))
        }
    }
    render(){
        const { username, password}=this.state
        return (
            <Fragment className="fragment">
            <div className='signincard'>

                <h1>Sign In</h1>
                <br/>
                <form   onSubmit={this.onSubmitSignin} method='POST' >
                    <label>Email      :</label>
                    <br/>
                    <input
                        required
                        className='form-control'
                        name='username'
                        placeholder='Enter e-mail'
                        value={username}
                        onChange={this.changeHandler}
                        type='text'
                    />
                    <br/>
                    <label>Password        :</label>
                    <br/>
                    <input
                        required
                        className='form-control'
                        id="exampleInputPassword1"
                        name='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={this.changeHandler}
                        type='password'
                    />
                    <br/>

    <input name='button' class="btn btn-dark" type="submit" value="Submit"/>

                    <br/>
                    <br/>
                <h4>{this.state.signin_status}</h4>
                    <br/>
                    <br/>
                </form>
            </div>
            </Fragment>
        )
    }
}

export default Signin;
