import React, { Fragment } from 'react';
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
                <div>
                    <ul className="navbar-nav">
                        <li >
                            <NavLink  exact to="/home/buy"><strong>Buy</strong> some foodies </NavLink>
                        </li>
                        <li className="">
                        <NavLink  exact to="home/sell"><strong>Sell</strong> some foodies </NavLink>
                        </li>
                    </ul>
                </div>

            </Fragment>
        )
    }
}


export default Home;