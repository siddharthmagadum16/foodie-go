import React,{Fragment} from 'react';
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
            axios.post('https://foodie-go-api-heroku.herokuapp.com'+'/register',this.state)
            .then(res=>parseInt(res.data))
            .then(res=>{
                console.log(res)
                if(res===1){
                    console.log("registered")
                    console.log(props.changeAuth())
                    window.location.href="/home"
                } else console.log(`unable to register`)
            })
            .catch(err=>console.log(err))
        }

        this.changeHandler=(event)=>{
            this.setState({
            [event.target.name]: event.target.value
            },()=>console.log(`${this.state.username}${this.state.password}`))
        }
    }

    render(){
        const { username, password}=this.state
        return (
            <Fragment className="fragment">
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
                <input name='button' class="btn btn-dark" type="submit" value="Submit"/>


            </form>
            </div>
            </Fragment>
        )
    }
}

export default Register;

