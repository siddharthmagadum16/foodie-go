import React from 'react';

const About=  ()=>{

    fetch('http://localhost:3000/about')
    .then(res=> res.json())
    .then(res=>console.log(res))
    // .then(res=>console.log(res.data))
    .catch(err=>console.log(`Error ${err}`))

    return (
        <h1>About</h1>
    )
}

export default About;
