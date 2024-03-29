import React from 'react';
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
            axios.post('https://foodie-go-api-heroku.herokuapp.com'+'/auth/signin',this.state)
            // axios.post('http://localhost:4000/auth/signin',this.state)
            .then(res=>parseInt(res.data))
            .then(res=>{
                if(res===1){
                    window.location.href="/home"
                    props.changeAuth(this.state.username);
                    return 1
                } else{
                    this.setState({signin_status:'Invalid email or password'})
                    console.log(`unable to signin`)
                    return 0
                }
            })
            .catch(err=>console.log(err))
        }

        this.changeHandler=(event)=>{
            this.setState({
            [event.target.name]: event.target.value
            })
        }
    }
    render(){
        const { username, password}=this.state

        // if(props)
        return (
            <div className="signin-body">
            <div className='signincard'>

                <h1>Sign In</h1>
                <br/>
                <form   onSubmit={this.onSubmitSignin} method='POST' >
                    <label>Email      </label>
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
                    <label>Password      </label>
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

                    <input name='button' className="btn btn-dark" type="submit" value="Submit"/>

                    <br/>
                    <br/>
                    <h4>{this.state.signin_status}</h4>
                    <br/>
                    <div className='testing'>
                        Note: use username: test@email.com password: 1234 for testing (you won't receive any food order emails)
                    </div>
                </form>
            </div>
                <a style={{"position":"fixed","bottom":"20px","right":"10px",'font-size':'12px','color':'pink'}} href="https://www.freepik.com/vectors/background">bg source</a>
            </div>
        )
    }
}

export default Signin;
