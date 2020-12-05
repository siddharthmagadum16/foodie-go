import React,{Fragment} from 'react';

const Register =  ({ChangeAuthState})=>{


    // function onSubmit(props){
    //     console.log(props)
    //     console.log(props.username)
    //     console.log(props.password)
    //     props.preventDefault();

    // }
    // render(){

    const onSubmitRegister=(event)=>{
        
        fetch('http://localhost:3000/register',{
          method: 'post',
          headers: { 'Content-Type' :'application/json'},
          body: JSON.stringify({
            username: event.username,
            password: event.password
          })
        })
        .then(response =>response.json())
        .then(res=>parseInt(res))
        .then(res=>{
            console.log(res)
            if(res===1){
                console.log("hurray")
            } else console.log(`unable to register`)
        })
        .catch(err=> console.log(`err in frontend register catch ${err}`))
        // .then(res=>console.log(`${res}`))

        event.preventDefault();

    }
    // render(){

        return (
            <Fragment>
            <h1>Register</h1>
            <form onSubmit={onSubmitRegister} method='POST'>
                <input name='username' ></input>
                <input name='password' ></input>
                <input name='button' type='submit'></input>
            </form>

            </Fragment>
        )
    // }
}

export default Register;