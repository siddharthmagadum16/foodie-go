import React, { Fragment } from "react";
import axios from "axios";
import './Sell.css'

// const initialState={
//   list: ['Loading ...'],
//   username: props.username,
//   foodname: '',
//   price: '',
//   place: '',
//   contactno: '',
//   image: null
// }
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

    // this.getFoodList=this.getFoodList.bind(this)
    this.deleteFood=(foodid,username)=>{
        let userurl;
        userurl = 'https://foodie-go-api-heroku.herokuapp.com/home/sell/delete/'.concat(username).concat('/').concat(foodid)
        // userurl = 'http://localhost:4000'+'/home/sell/delete/'.concat(username).concat('/').concat(foodid)
        axios.post(userurl)
        .then(res=>console.log('deletefood res:'+res))
        .then(()=>this.getFoodList())
        .catch(err=>console.log(`err in deleting foodstuff ${err}`))
    }

    this.makeList = (each) => {
      console.log("each "+ each)
      return (

        <li key={each.num} style={{ listStyleType: "none" }} className="foodcard">
          <ul style={{ listStyleType: "none"}}>
            <li key="1"><img height='200' width='200' src={`data:image/*;base64,${each[0][0].data}`} alt="imagealt" /></li>
            <li key="2">{each[3]} </li>
            <li key="3">{"₹ "+ each[4]} </li>
          </ul>
          <button onClick={()=>this.deleteFood(each[1],props.username)} >Remove</button>
        </li>
      );
    };

    console.log(`props ${props}`);
    this.getFoodList = () => {
        console.log('getfood list clg')

          let userurl = 'https://foodie-go-api-heroku.herokuapp.com/home/sell/'.concat(props.username)
          // let userurl = 'http://localhost:4000'+'/home/sell/'.concat(props.username)
        axios
        .post(userurl)
        .then((res) => {

          if(res.data.length===0){
          // console.log(`seller's list length is ${this.state.list.length}`)
                this.setState({list: "You aren't selling any foodies yet."})
          }else{
            var user_food_list= res.data.map(Object.values)
            user_food_list= user_food_list.map(this.makeList)
            user_food_list= <ul className="cardsgrid">{user_food_list}</ul>
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
        },()=>{
          console.log(this.state.image)
        });
      }
    }

    this.updateSelection=(e)=>{
      this.setState({image: e.target.files[0]});
    }

  //  INSERT ING food ________________________________________________________________1
    this.onSubmitFoodstuff=(event)=>{
        event.preventDefault();

        let t0,t1; // file upload part
        t0= performance.now()
        let  fd= new FormData();
        console.log("this.state.image" + this.state.image.name)
        fd.append('image',this.state.image)
        fd.append('foodname',this.state.foodname)
        fd.append('price',this.state.price)
        fd.append('place',this.state.place)
        fd.append('username',this.state.username)
        fd.append('contactno',this.state.contactno)

        t1= performance.now()
        console.log("uploading total time: "+ t1-t0)

        console.log(this.state.username)
        console.log(`fooddocument : ${this.state}`)
        // let url='http://localhost:4000/home/sell/insert/food'
        let url='https://foodie-go-api-heroku.herokuapp.com/home/sell/insert/food'

        axios({
          method: 'POST',
          url: url,
          data: fd,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res=>parseInt(res.data))
        .then(res=>{
            console.log(res)
            if(res===1){
                console.log("foodstuff successfully added")
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
        <h2>Your current food items in foodie-go are : </h2>

          <div>{this.state.list}</div>
          <div className='addfoodstuff'>
                <h1>Homecooks, do you want to sell food?</h1>

                <form  onSubmit={this.onSubmitFoodstuff} method='POST' encType="multipart/form-data" >
                    <label>Foodie-name         :</label>
                    <input required name='foodname' placeholder=''
                    value={foodname} onChange={this.changeHandler} type='text'/>

                    <br/>
                    <br/>
                    <label>Price       :</label>
                    <input required name='price' placeholder='' value={price}
                    onChange={this.changeHandler} type='text'/>

                    <br/>
                    <br/>

                    <label>Address      :</label>
                    <input required name='place' placeholder=''
                     value={place} onChange={this.changeHandler} type='text'/>

                    <br/>
                    <br/>
                    <label>Contact Number        :</label>
                    <input required name='contactno' placeholder=''
                      value={contactno} onChange={this.changeHandler} type='number' />
                    <br/>
                    <br/>
                      <label>upload foodie image        :</label>
                    <input required type='file' id='image' name='image'
                    accept='image/*' onChange={this.updateSelection}/>


                    {/* <div> {this.state.username} </div> */}
                  <br/>

                    <input name='button' type='submit' />
                    <br/>
                    <br/>

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