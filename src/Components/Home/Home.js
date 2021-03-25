import React, { Fragment } from 'react';
import './home.css'
// import { Nav } from 'react-boot  strap';
import {NavLink} from "react-router-dom";
// import BuyFood from './Buy';
// import SellFood from './Sell';

class Home extends React.Component{
    // constructor(props){
    //     super(props);

    // }

    render(){

        return(
            <Fragment>
                    <div className='container'>
                        <p className='heading'>Buy and Sell</p>
                        <div className="grid ">
                            <div className='first'>
                            <NavLink  exact to="/home/buy"><strong>Buy some foodies</strong></NavLink>
                                <p>Where customers can buy foodies </p>
                            </div>
                            <div className='second'>
                            <NavLink  exact to="home/sell"><strong>Sell some foodies</strong></NavLink>
                                <p>Where homecooks can sell foodies</p>
                            </div>
                            <div className='third'>
                            {/* <NavLink  exact to="home/getimage"><strong>wanna see image?</strong></NavLink> */}
                            </div>
                        </div>
                    </div>
            </Fragment>
        )
    }
}


export default Home;