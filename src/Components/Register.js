import React,{Fragment} from 'react';
import axios from 'axios'

export class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username:'',
            password:''
        }

        this.onSubmitRegister=(event)=>{
            event.preventDefault();
            axios.post('http://localhost:3000/register',this.state)
            .then(res=>parseInt(res.data))
            .then(res=>{
                console.log(res)
                if(res===1){
                    console.log("registered")
                    console.log(props.changeAuth())

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
            <Fragment>
            <h1>Register</h1>
            <form  onSubmit={this.onSubmitRegister} method='POST' >
            {/* <div> */}
                <label>Email</label>
                <input
                    name='username'
                    value={username}
                    onChange={this.changeHandler}
                    type='text'
                    />
                <label>Password</label>
                <input
                    name='password'
                    value={password}
                    onChange={this.changeHandler}
                    type='password'
                />
                <input
                    name='button'
                    type='submit'
                />

            </form>
            </Fragment>
        )
    }
}

export default Register;

