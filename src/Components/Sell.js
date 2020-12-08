import React, { Fragment } from "react";
import axios from "axios";
export class SellFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list: [],
            username: props.username,
            name: '',
            price: '',
            place: '',
            contactno: ''

    };
    // this.getFoodList=this.getFoodList.bind(this)
    this.deleteFood=(foodid,username)=>{
        let userurl = 'http://localhost:3000/home/sell/delete/'.concat(username).concat('/').concat(foodid)
        axios.post(userurl)
        .then(res=>console.log(res))
        .then(()=>this.getFoodList())
        .catch(err=>console.log(`err in deleting foodstuff ${err}`))
    }

    this.makeList = (each) => {
      return (

        <li
          key={each.num}
          style={{ listStyleType: "none" }}
          className="foodcard"
        >
          <ul style={{ listStyleType: "none"}}>
            <li key="2">{each[2]} </li>
            <li key="3">{each[3]} </li>
            <li key="4">{each[4]} </li>
            <li key="5">{each[5]} </li>
          </ul>
          <button onClick={()=>this.deleteFood(each[0],props.username)} >Remove</button>
        </li>
      );
    };

    console.log(`props ${props}`);
    this.getFoodList = () => {
        console.log('getfood list clg')
        let userurl = 'http://localhost:3000/home/sell/'.concat(props.username)
        console.log("USER url "+userurl)
        axios
        .post(userurl)
        .then((res) => {
          console.log(res.data);
          console.log(Object.values(res.data));

          console.log(typeof res.data);
          this.setState({
            list: res.data.map((value) => Object.values(value))
          });
          console.log(`seller's list length is ${this.state.list.length}`)
          if(this.state.list.length===0){
                this.setState({list: "You aren't selling any foodies yet."})
          }else{

            this.setState({ list: this.state.list.map(this.makeList) })
            this.setState({
                list: <ul className="cardsgrid">{this.state.list}</ul>
            });
          }
        })
        .catch((err) =>
          console.log("Error while fetching your food online \n" + err)
        );
    }


    this.changeHandler=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
            // fooddocument.username : event.target.value
            // list: this.state.list,
            // fooddocument.username: event.target.username.value
        })
    }

    this.onSubmitFoodstuff=(event)=>{
        event.preventDefault();
        console.log(`fooddocument : ${this.state}`)
        axios.post('http://localhost:3000/home/sell/insert/food',this.state)
        .then(res=>parseInt(res.data))
        .then(res=>{
            console.log(res)
            if(res===1){
                console.log("foodstuff successfully added")
                this.getFoodList()
                // props.setState({username:this .state.username})
            } else{
                console.log(`unable to add foodstuff`)
            }
        })
        .catch(err=>console.log(err))
    }


  }

  componentDidMount = () => {
    this.getFoodList();
  };

  render() {
    const { name,price,place,contactno}= this.state
    return (
      <Fragment>
        <div>
          <p>Your current foodstuffs in foodie-go are </p>
          <div>{this.state.list}</div>
          <div className='addfoodstuff'>
                <h1>Want to sell food ?</h1>
                <form  onSubmit={this.onSubmitFoodstuff} method='POST' enctype="multipart/form-data" >
                    <label>Food name</label>
                    <input
                        name='name'
                        placeholder='e.g. Veg fried rice'
                        value={name}
                        onChange={this.changeHandler}
                        type='text'
                    />
                    <label>Price</label>
                    <input
                        name='price'
                        value={price}
                        onChange={this.changeHandler}
                        type='text'
                        />
                    <label>Place</label>
                    <input
                        name='place'
                        value={place}
                        onChange={this.changeHandler}
                        type='text'
                    />
                    <label>Contact Number</label>
                    <input
                        name='contactno'
                        value={contactno}
                        onChange={this.changeHandler}
                        type='text'
                    />
                    {/* <label>Upload Food Image</label> */}
                    {/* <input
                        name='image'
                        onChange={this.changeHandler}
                        type='file'
                        name='ipfile'
                    /> */}
                    <input
                        name='button'
                        type='submit'
                    />

                </form>
            </div>

        </div>
      </Fragment>
    );
  }
}

export default SellFood;

/*
name: '',
            price: '',
            rating: '',
            place: '',
            contactno: ''
*/