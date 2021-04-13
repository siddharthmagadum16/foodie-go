import React, { Fragment } from "react";
import axios from "axios";
import "./Buy.css";

export class BuyFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['Loading ...'],
      food_object_list:'',
      countlist:[],
      totalprice: 0,
      email_list:[],
      clickme: 'clickme',
      food_order: '',
      address: '',
      contactno: '',
    };
    // this.getFoodList=this.getFoodList.bind(this)
    this.changeCount=(index,res,price)=>{

      if(this.state.countlist.length>index){
        let tmp=this.state.countlist
        if(tmp[index]===0 && res===-1) return;
        tmp[index]+=res;
        this.setState({totalprice: this.state.totalprice+price*res})
        this.setState({countlist:tmp},()=>{
          let user_food_list = this.state.food_object_list.map((value,index)=> this.makeList(value,index));
          user_food_list = <ul className="cardsgrid">{user_food_list}</ul>;
          this.setState({ list: user_food_list })
        })
      }
      console.log(this.state.countlist)
    }

    this.makeList = (each,index) => {
      each.push(0)
      return (
        <li key={each.num} style={{ listStyleType: "none" }} className="foodcard">
          <div>
            <img className='imgbuy' src={`data:image/*;base64,${each[0][0].data}`} alt="imagealt" />
          </div>
          <ul style={{ listStyleType: "none" }}>
            <li key="1">{each[3]} </li>
            <li key="2">{"₹ " + each[4]}</li>
            <li key='3'>
              <div className='countpart'>
                <button type='button' onClick={()=>{this.changeCount(index,-1,each[4])}} >-</button>
                <div> {this.state.countlist[index]}</div>
                <button type='button' onClick={()=>{this.changeCount(index,1,each[4])}} >+</button>
              </div>
            </li>
          </ul>
        </li>
      );
    };

    this.getFoodList = () => {

      axios
        .get("https://foodie-go-api-heroku.herokuapp.com/home/buy")
        // .get('http://localhost:4000/home/buy')
        .then((res) => {
          console.log(res.data);
          // console.log(Object.values(res.data));
          if (res.data.length === 0) {
            console.log("Woops! All the foodies are out of stock");
            this.setState({ list: "Woops! All the foodies are out of stock" });
          } else {
            console.log(res.data)

            let countlist= new Array(res.data.length).fill(0)
            this.setState({countlist:countlist})


            let user_food_list = res.data.map(Object.values)
            // console.log("user_food_list "+user_food_list)
            this.setState({food_object_list:user_food_list})

            user_food_list = user_food_list.map((value,index)=> this.makeList(value,index));
            user_food_list = <ul className="cardsgrid">{user_food_list}</ul>;
            this.setState({ list: user_food_list });
          }
        })
        .catch((err) => console.log("Error while fetching food list \n" + err));
    };

    this.getProducersList=()=>{
      let userObj= new Object();

      for(let index=0;index<this.state.countlist.length;index++){
        if(this.state.countlist[index]>0){
          let username=this.state.food_object_list[index][2];
          let foodname=this.state.food_object_list[index][3];
          let price =this.state.food_object_list[index][4];
          let address= this.state.food_object_list[index][5];
          let contactno= this.state.food_object_list[index][6];
          let quantity= this.state.countlist[index]
          console.log(username,foodname,price,quantity)
          if(userObj[username]){
            userObj[username].push([foodname,price,quantity])
          }else{
            userObj[username]=[];
            userObj[username].push([address,contactno])
            userObj[username].push([foodname,price,quantity])
          }
        }
      }
      return userObj;
    }

    this.sendFoodOrder=()=>{
      if(this.state.address && this.state.contactno);
      else {
        this.setState({food_order:"Please Enter the required details for delivery"})
        return  ;
      }
      let userObj= this.getProducersList();
      console.log(userObj)
      console.log(props)
      if(Object.keys(userObj).length){
        let orderdata=[userObj,props.username,this.state.totalprice,this.state.address,this.state.contactno]
        axios.post('https://foodie-go-api-heroku.herokuapp.com/home/buy/send-order',orderdata)
        // axios.post('http://localhost:4000/home/buy/send-order',orderdata)
        .then(res=>{
          console.log(res)
          if(parseInt(res.data)===1){
            this.setState({food_order:"Your order had been sent successfully\nCheck your email for order details"})
          }
          else{
            this.setState({food_order:"Unable to send order. Please retry"})
          }
        })
      }
      else{
        console.log(Object.keys(userObj).length)
        this.setState({food_order:"Select atleast one foodie with required quantity"})
      }
    }

    this.handleBuyChange=(e)=>{
      this.setState({[e.target.name]: e.target.value})
    }



  }//constructor}
  // user_food_list is same as list, user_object_list is object type of list before mapping into rendered form

  componentDidMount = () => {
    this.getFoodList()
  }

  render() {
    return (
      <Fragment>

        <div className="">{this.state.list}</div>

        <div id='buy-form' style={{'textAlign':'center'}} >
        <br/>
        <div className='f1 b'><strong>{`Total order price: ${this.state.totalprice}`}</strong></div>
        <div className='measure2' >
          <label className='f6 b db mb2'>Delivery Address</label>
          <input type='text'  name='address' onChange={this.handleBuyChange}
            className='input-reset ba b--black-20 pa2 mb2 db w-100' />
          </div>
          <div className='measure2'>
          <label className='f6 b db mb2'>Contact Number </label>
          <input type='number' name='contactno' onChange={this.handleBuyChange}
            className='input-reset ba b--black-20 pa2 mb2 db w-100' />
          </div>
          <br/>
          <div>{this.state.food_order}</div>
          {/* <div className='f6 b db mb2'>Please order some food</div> */}
          <br/>
          <input type='button' className='btn btn-dark' onClick={this.sendFoodOrder} value="Send Food Order"/>

        <br/>
        <br/>
        </div>

      </Fragment>
    );
  }
}

export default BuyFood;
