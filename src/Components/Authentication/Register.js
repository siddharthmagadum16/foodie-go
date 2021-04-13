import React from 'react';
import axios from 'axios'
import './SignIn.css';
export class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username:'',
            password:'',
            code: '',
            send: 'Send verification code',
            codestatus: ''
        }

        this.onSubmitRegister=(event)=>{

            event.preventDefault();
            axios.post('https://foodie-go-api-heroku.herokuapp.com/auth/register',this.state)
            // axios.post('http://localhost:4000/auth/register',this.state)
            .then(res=>parseInt(res.data))
            .then(res=>{
                console.log(res)
                if(res===1){
                    console.log("registered")
                    console.log(props.changeAuth(this.state.username))

                    window.location.href="/home"
                }
                else if(res===2){
                    this.setState({codestatus:"The code entered in incorrect"})
                    console.log("The code entered in incorrect")
                    this.setState({send: "Re-send verification code"})
                }
                else console.log(`unable to register`)
            })
            .catch(err=>console.log(err))
        }

        this.changeHandler=(event)=>{
            this.setState({
            [event.target.name]: event.target.value
            })
        }

        this.sendVerificationCode=(event)=>{
            event.preventDefault();
            axios.post('https://foodie-go-api-heroku.herokuapp.com/auth/send-code',this.state)
            // axios.post('http://localhost:4000/auth/send-code',this.state)
            .then(res=>{
                if(parseInt(res.data)===1){
                    console.log(`code sent successfully`)
                }
                else if(parseInt(res.data)===2){
                    console.log(`user already registered`)
                    this.setState({codestatus:"You already have Foodie-go account"})
                }
                else if(parseInt(res.data)===3){
                    console.log(`invalid email`)
                    this.setState({codestatus:"Invalid e-mail"})
                }
                else console.log(`error sending code`)
            })
        }
    }

    render(){

        const { username, password}=this.state
        return (
            <div className="signin-body">
            <div className='signincard'>
            <h1>Register</h1>
            <br/>
            <form  onSubmit={this.onSubmitRegister} method='POST' >
                <label>Email </label>
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
                <label>Password       </label>
                <input
                    required
                    className='form-control'
                    name='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={this.changeHandler}
                    type='password'
                />
                <br/>
                <input name='button' className="btn btn-primary" type="button" value={this.state.send} onClick={this.sendVerificationCode}/>
                <br/>
                <br/>
                <div>{this.state.codestatus}</div>
                <br/>
                <input placeholder='enter verification code' required onChange={this.changeHandler} name='code' type='text' className='form-control' />
                <br/>

                <input name='button'  className="btn btn-dark" type="submit" value="Register"/>


            </form>
            </div>
            </div>
        )
    }
}

export default Register;

