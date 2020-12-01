import React, { Fragment } from 'react';

const Signin =  ()=>{

    fetch('http://localhost:3000/signin')
    .then(res=> res.json())
    .then(res=>console.log(res))
    // .then(res=>console.log(res.data))
    .catch(err=>console.log(`Error ${err}`))

    return (
        <Fragment>
            <input name='username' ></input>
            <input name='button' type='submit'></input>

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