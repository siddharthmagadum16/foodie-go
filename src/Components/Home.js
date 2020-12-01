import React from 'react';

const Home =  ()=>{

    // componentDidMount(){

        fetch('http://localhost:3000/')
        .then(res=> res.json())
        .then(res=>console.log(res))
        // .then(res=>console.log(res.data))
        .catch(err=>console.log(`Error ${err}`))
    // }

    return (
        <h1>Home</h1>
    )
}

export default Home;