import React, { Fragment } from "react";
import axios from "axios";
import "./Buy.css";

export class BuyFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['Loading ...'],
      food_object_list:'',
      initialFetch: 0,
    };
    // this.getFoodList=this.getFoodList.bind(this)
    this.makeList = (each,index) => {
      // console.log("each " + each,index);
      console.log("each length " + each.length+" "+typeof(each) );
      each.push(0)
      return (
        <li
          key={each.num}
          style={{ listStyleType: "none" }}
          className="foodcard"
        >
          <ul style={{ listStyleType: "none" }}>
            <li key="1">
              <img
                height="200"
                width="200"
                src={`data:image/*;base64,${each[0][0].data}`}
                alt="imagealt"
              />
            </li>
            <li key="2">{each[3]} </li>
            <li key="3">{"₹ " + each[4]}</li>
            <li key='4'>
              <div className='countpart'>
                <div>-</div>
                <div> {each[8]}</div>
                <div >+</div>
              </div>
            </li>
          </ul>
        </li>
      );
    };

    this.getFoodList = () => {
      axios
        // .get("https://foodie-go-api-heroku.herokuapp.com" + "/home/buy")
        .get('http://localhost:4000' + "/home/buy")
        .then((res) => {
          console.log(res.data);
          console.log(Object.values(res.data));
          if (res.data.length === 0) {
            console.log("Woops! All the foodies are out of stock");
            this.setState({ list: "Woops! All the foodies are out of stock" });
          } else {
            // let foodData=res.data;
            res.data.forEach(element => {
              element.count=7;
            });
            console.log(`foodData ${res.data}`)
            window.localStorage.setItem('food_object_list',JSON.stringify(res.data))
            // console.log(`data object:\n ${res.data}`)
            // console.log("user_food_list "+user_food_list)
            // this.setState({user_food_list:user_food_list})
            let user_food_list = res.data.map(Object.values);
            user_food_list = user_food_list.map((value,index)=> this.makeList(value,index));
            user_food_list = <ul className="cardsgrid">{user_food_list}</ul>;

            this.setState({ list: user_food_list });
          }
        })
        .catch((err) => console.log("Error while fetching food list \n" + err));
    };
  }

  componentDidMount = () => {
    console.log('hello')
    localStorage.removeItem('food_object_list')
    let loadedFoodList=window.localStorage.getItem('food_object_list')
    if(loadedFoodList==undefined || loadedFoodList==null){
      this.getFoodList();
    }else{
      loadedFoodList=JSON.parse(loadedFoodList)
      console.log(`list is already stored:\n ${loadedFoodList}`)
      let user_food_list = loadedFoodList.map(Object.values);
      user_food_list = user_food_list.map((value,index)=> this.makeList(value,index));
      user_food_list = <ul className="cardsgrid">{user_food_list}</ul>;
      console.log(loadedFoodList)
      this.setState({list:user_food_list})
    }
    // this.getFoodList()
  };

  render() {
    return (
      <Fragment>
        <div className="">{this.state.list}</div>
        <div className="" style={{'backgroundColor':'pink'}}>{this.state.user_food_list}</div>
        <input type='button' value="Send Food Order Email " />
      </Fragment>
    );
  }
}

export default BuyFood;
