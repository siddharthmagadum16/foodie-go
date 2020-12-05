import React, { Fragment } from 'react';

const Signin =  ()=>{

    fetch('http://localhost:3000/signin')
    .then(res=> res.json())
    .then(res=>console.log(res))
    // .then(res=>console.log(res.data))
    .catch(err=>console.log(`Error ${err}`))

    function onSubmitSignin(props){
        console.log(props)
        // console.log(props.username)
        // console.log(props.password)
        props.preventDefault();

    }



    return (
        <Fragment>
            <form onSubmit={onSubmitSignin}>

                <input name='username' ></input>
                <input name='password' ></input>
                <input name='button' type='submit'></input>

            </form>
            <h1>Sign In</h1>

        </Fragment>
    )
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