import React, { Fragment } from 'react'
import './About.css'
export class About extends React.Component {
    render() {
        return (
           <Fragment>
                <div className='bgimg' >


                    <div className="bgtext">
                        <p className='aboutus'>About Us</p>
                        <p className='para'>Our website is designed for home cooks and food lovers.
                            This website allows you to sell and buy food. A seller can put up his/her food product at their own price on the “sell” page.
                            Once the description is put up, it appears on the “buy” page for people to view and contact the seller.
                            For both these processes, a user is expected to sign in with a valid e-mail address and password.
                        </p>
                    </div>


                </div>
           </Fragment>
        )
    }
}

export default About

