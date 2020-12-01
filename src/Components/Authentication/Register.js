import React from 'react';

const Register =  ()=>{

    fetch('http://localhost:3000/register')
    .then(res=> res.json())
    .then(res=>console.log(res))
    // .then(res=>console.log(res.data))
    .catch(err=>console.log(`Error ${err}`))


    return (
        <h1>Register</h1>
    )
}

export default Register;