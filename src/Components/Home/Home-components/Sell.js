import React, { Fragment } from "react";
import axios from "axios";
import './Sell.css'
import NoFoodiesvg from  './Empty-foodies.svg'

export class SellFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['Loading ...'],
      username: props.username,
      foodname: '',
      price: '',
      place: '',
      contactno: '',
      image: null
    }

    this.deleteFood=(foodid,username)=>{
        let userurl;
        userurl = 'https://foodie-go-api-heroku.herokuapp.com/home/sell/delete/'.concat(username).concat('/').concat(foodid)
        // userurl = 'http://localhost:4000/home/sell/delete/'.concat(username).concat('/').concat(foodid)
        axios.post(userurl)
        // .then(res=>console.log('deletefood res:'+res))
        .then(()=>this.getFoodList())
        .catch(err=>console.log(`err in deleting foodstuff ${err}`))
    }

    this.makeList = (each) => {
      return (

        <li key={each.num} style={{ listStyleType: "none" }} className="foodcard2">
          <div>
            <img className='imgsell' src={`data:image/*;base64,${each[0][0].data}`} alt="imagealt" />
          </div>
          <ul style={{ listStyleType: "none"}}>
            <li key="1">{each[3]} </li>
            <li key="2">{"₹ "+ each[4]} </li>
            <li key='3'><button onClick={()=>this.deleteFood(each[1],props.username)} type="button" class="btn btn-warning">Remove</button></li>
          </ul>
        </li>
      );
    };

    this.getFoodList = () => {

          let userurl = 'https://foodie-go-api-heroku.herokuapp.com/home/sell/'.concat(props.username)
          // let userurl = 'http://localhost:4000/home/sell/'.concat(props.username)
        axios
        .post(userurl)
        .then((res) => {

          if(res.data.length===0){
            let nofoodies= <div className='nofoodie'>
                      <img className='img'  src={NoFoodiesvg} alt="you aren't selling any foodies yet"/>
                      <div>You aren't selling any foodies yet</div>
                  </div>
                this.setState({list: "You aren't selling any foodies yet."})
                this.setState({list: nofoodies })
          }else{
            var user_food_list= res.data.map(Object.values)
            user_food_list= user_food_list.map(this.makeList)
            user_food_list= <ul className="cardsgrid2">{user_food_list}</ul>
            this.setState({list: user_food_list})

          }
        })
        .catch((err) =>
          console.log("Error while fetching your food online \n" + err)
        );
    }


    this.changeHandler=(event)=>{
      this.setState({
          [event.target.name]: event.target.value
        })
    }

    this.handleImageUpload=(event)=>{
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setState({
          image: URL.createObjectURL(img)
        });
      }
    }

    this.updateSelection=(e)=>{
      this.setState({image: e.target.files[0]});
    }

  //  INSERTING food ________________________________________________________________1
    this.onSubmitFoodstuff=(event)=>{
        event.preventDefault();

        let  fd= new FormData();
        fd.append('image',this.state.image)
        fd.append('foodname',this.state.foodname)
        fd.append('price',this.state.price)
        fd.append('place',this.state.place)
        fd.append('username',this.state.username)
        fd.append('contactno',this.state.contactno)


        let url='https://foodie-go-api-heroku.herokuapp.com/home/sell/insert/food'
        // let url='http://localhost:4000/home/sell/insert/food'

        axios({
          method: 'POST',
          url: url,
          data: fd,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res=>parseInt(res.data))
        .then(res=>{
            if(res===1){
                this.setState({
                  foodname: '',
                  price: '',
                  place: '',
                  contactno: '',
                  image: null
                })
                this.getFoodList()
                // props.setState({username:this .state.username})
            } else{
                console.log(`unable to add foodstuff`)
            }
        })
        .then(()=> this.getFoodList())
        .catch(err=>console.log(err))
    }

  }

  componentDidMount = () => {
    this.getFoodList();
  };

  render() {
    const { foodname,price,place,contactno}= this.state
    return (
      <Fragment>
        <div>
          <br/>
        <div id='info-list' >Your current food items on foodie-go are listed below </div>
        <hr/>
          <div id='state-list'>{this.state.list}</div>
          <br/>
          <div className='addfoodstuff'>
                <div>Enter the food details</div>
                <form className='pa4 black-80' onSubmit={this.onSubmitFoodstuff} method='POST' encType="multipart/form-data" >
                  <div className='sellformpart' >
                    <div className='measure'>
                      <label className='f6 b db mb2' >Foodie-name         </label>
                      <input required name='foodname' placeholder='' className='input-reset ba b--black-20 pa2 mb2 db w-100'
                      value={foodname} onChange={this.changeHandler} type='text' aria-describedby="name-desc" />
                    </div>
                    <div className='measure'>
                      <label className='f6 b db mb2' >Price       </label>
                      <input required name='price' placeholder='INR' value={price}
                      onChange={this.changeHandler} type='number'  className='input-reset ba b--black-20 pa2 mb2 db w-100' />
                    </div>

                    <div className='measure'>
                      <label className='f6 b db mb2'>Address      </label>
                      <input required name='place' placeholder=''  className='input-reset ba b--black-20 pa2 mb2 db w-100'
                      value={place} onChange={this.changeHandler} type='text'/>
                    </div>

                    <div className='measure'>
                      <label className='f6 b db mb2' >Contact Number        </label>
                      <input required name='contactno' placeholder=''   className='input-reset ba b--black-20 pa2 mb2 db w-100'
                      value={contactno} onChange={this.changeHandler} type='number' />
                    </div>

                    </div>

                    <div className='measure'>
                      <label className='f6 b db mb2' >Upload foodie image        </label>
                      <input required type='file' id='image' name='image'   className='input-reset ba b--black-20 pa2 mb2 db w-100'
                      accept='image/*' onChange={this.updateSelection}/>
                    </div>

                    <button type="submit" name='button'  class="btn btn-dark">Add Food</button>


                </form>
            </div>
        </div>
      </Fragment>
    );
  }
}

export default SellFood;

/*

*/