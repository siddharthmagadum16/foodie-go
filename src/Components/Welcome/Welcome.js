import React from 'react';
// import welcomeImage from './plated-tacos.jpg';
import welcomeImage from './main.jpg';
import eatingfood from './eating-food.png'
import cookingfood from './cooking-food.png'
import cookmobile from './cook-mobile.jpg'
import fooddeliver from './food-deliver.jpg'
import foodorder from './food-order.jpg'
import './Welcome.css';
import logo from './logo.png'
class Welcome extends React.Component {

    render() {


        return(
            <div className="welcome">
                <div className="first">
                    <img src={welcomeImage}  style={{'filter':'brightness(70%)'}} className=" welcomeImage img-fluid" alt="Responsive image"/>
                    <div className="slogan">Order or Sell food online</div>

                </div>
                <div className="second">


                     <div className="secsub">For the people who </div>
                    <div className="two-cards">

                        <div className="card">
                          <img src={eatingfood} className="card-img-top forimg" alt="..."/>
                          <div className="cardbody1">
                            <h5 className="cardtitle">like to have delightful<br/> food</h5>
                          </div>
                      </div>

                        <div className="card ">
                              <img src={cookingfood} className="card-img-top forimg" alt="..."/>
                              <div className="cardbody2">
                                <h5 className="cardtitle">like to cook and make a fortune</h5>
                              </div>
                        </div>
                    </div>
                </div>

                <div className='third'>
                  <div className="how-it-works">How it works</div>
                  <div className=" container ">
                    <div className="carousel slide" id='carouselSlider'>
                      <ol className="carousel-indicators">
                        <li className="active" data-target='#carouselSlider' data-slide-to='0'></li>
                        <li  data-target='#carouselSlider' data-slide-to='1'></li>
                        <li  data-target='#carouselSlider' data-slide-to='2'></li>
                      </ol>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img src={cookmobile} alt="img1" />
                          {/* <div>cook places his food online</div> */}
                          <div className="carousel-caption">cook places their food online</div>
                        </div>
                        <div className="carousel-item ">
                          <img src={foodorder} alt="img2" />
                          {/* <div>food lovers visit foodie-go</div> */}
                          <div className="carousel-caption">food lovers places their order</div>
                        </div>
                        <div className="carousel-item ">
                          <img src={fooddeliver} alt="img3" />
                          <div className="carousel-caption">food gets delivered</div>
                          {/* <div>food lovers orders the food online</div> */}
                        </div>
                      </div>
                      <a role='button' className='carousel-control-prev' href='#carouselSlider' data-slide='prev'>
                        <span className='carousel-control-prev-icon'></span>
                      </a>
                      <a role='button' className='carousel-control-next' href='#carouselSlider' data-slide='next'>
                        <span className='carousel-control-next-icon'></span>
                      </a>
                    </div>
                  </div>
                </div>
                <footer className='fourth'>
                  <div>
                    <img id='imgfooter'src={logo} alt='logo'/>
                  </div>
                  <div>
                    Foodie-go Contact & Support
                    <br/>
                    <br/>
                    <div>
                    <a href="mailto:foodie.go963@gmail.com">
                    <img id='imgsvgmail' src="https://i.imgur.com/JCO0rrM.png" alt="mailsvgicon"/>
                    </a>
                    </div>
                  </div>
                </footer>

            </div>
        )
    }
}

export default Welcome;
// module.exports ={ Card}
