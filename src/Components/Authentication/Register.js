import React from 'react';
import axios from 'axios'
import './SignIn.css';
export class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username:'',
            password:''
        }

        this.onSubmitRegister=(event)=>{

            event.preventDefault();
            // axios.post('https://foodie-go-api-heroku.herokuapp.com'+'auth/register',this.state)
            axios.post('http://localhost:4000'+'/auth/register',this.state)
            .then(res=>parseInt(res.data))
            .then(res=>{
                console.log(res)
                if(res===1){
                    console.log("registered")
                    console.log(props.changeAuth(this.state.username))
                    window.location.href="/verify-email"
                } else console.log(`unable to register`)
            })
            .catch(err=>console.log(err))
        }
        this.onSubmitR= (event)=>{
            event.preventDefault();
            console.log(props.changeAuth(this.state.username))
            window.location.href='/verify-email'
        }

        this.changeHandler=(event)=>{
            this.setState({
            [event.target.name]: event.target.value
            })
        }

        this.sendVerificationCode=(event)=>{
            axios.post('http://localhost:4000'+'/auth/send-code',this.state)
            // .then(res)
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
                <label>Email        :</label>
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
                <br/>
                <label>Password       :</label>
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
                <br/>
                <input name='button' class="btn btn-primary" type="button" value="send verification code" onClick={()=>this.sendVerificationCode}/>
                <input name='code' type='text' className='form-control' />
                <input name='button' class="btn btn-dark" type="submit" value="Submit"/>


            </form>
            </div>
            </div>
        )
    }
}

export default Register;

