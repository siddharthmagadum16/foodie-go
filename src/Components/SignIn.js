import React, { Fragment } from 'react';
import axios from 'axios'


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
            axios.post('http://localhost:3000/signin',this.state)
            .then(res=>parseInt(res.data))
            .then(res=>{
                console.log(res)
                if(res===1){
                    console.log("signed in")
                    // props.setState({username:this .state.username})
                    console.log(props.changeAuth(this.state.username))

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
            },()=>console.log(`${this.state.username}${this.state.password}`))
        }

    }
    render(){
        const { username, password}=this.state
        return (
            <Fragment>
            <div className='signincard'>

                <h1>Sign In</h1>
                <form  onSubmit={this.onSubmitSignin} method='POST' >
                    <label>Email</label>
                    <input
                        name='username'
                        placeholder='Enter you Email'
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
                <h4>{this.state.signin_status}</h4>
                </form>
            </div>
            </Fragment>
        )
    }
}

export default Signin;

/*

 let authorised=0;
    fetch('http://http://localhost:3000/signin')
    .then(res=>res.json())
    .then(res=> authorised=res)
    .catch(err=>console.log(`Error occurred ${err}`))

    this.setState({ authorised:authorised})

*/