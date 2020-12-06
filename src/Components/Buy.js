import React, { Fragment } from 'react'
import axios from 'axios'
export class BuyFood extends React.Component {


    render() {
        let data='none'
        axios.get('http://localhost:3000/home/buy')
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            data=res
        })
        .catch(err=>console.log(err))

        return (
            <Fragment>
                {data}
            </Fragment>
        )

    }
}

export default BuyFood
