import React, { Fragment } from 'react';
import {NavLink} from "react-router-dom";
import './home.css';
import buyfood from './buy-food.jpg'
import sellfood from './sell-food.jpg'
// import ''

class Home extends React.Component{


    render(){

        return(
            <Fragment>
                <div className="home">

                    <div></div>
                    <NavLink  exact to="/home/buy">
                        <div className='home-buy'>
                            <div>
                                <strong className='buysell' >Buy some foodies</strong>
                                <div className='sub-buysell'>Where customers can buy food items </div>
                            </div>
                            <img id='buy-img'src={buyfood} alt='buy-food'/>
                            <div></div>
                        </div>
                    </NavLink>


                    <NavLink  exact to="home/sell">
                        <div className='home-sell'>
                            <div></div>
                            <img id='sell-img' src={sellfood} alt='buy-food'/>
                            <div>
                                <strong className='buysell'>Sell some foodies</strong>
                                <div className='sub-buysell'>Where homecooks can sell food items</div>
                            </div>
                        </div>
                    </NavLink>

                    </div>
            </Fragment>
        )
    }
}


export default Home;