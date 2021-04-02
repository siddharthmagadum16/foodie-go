import React, { Fragment } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import './Buy.css'

export class BuyFood extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
        // this.getFoodList=this.getFoodList.bind(this)
        this.makeList = (each) => {
            console.log("each "+ each)
            return (
            <li key={each.num} style={{ listStyleType: "none" }} onClick={()=> this.BuyItem(each)} className="foodcard">
                <ul style={{ listStyleType: "none"}} >
                    <li key="1"><img height='200' width='200' src={`data:image/*;base64,${each[0][0].data}`} alt="imagealt" /></li>
                    <li key="2">{each[3]} </li>
                    <li key="3">{"₹ "+ each[4]}</li>
                    <li key="6">Contact details:</li>
                    <li key="4">{each[2]}</li>
                    <li key="5">{each[6]}</li>
                </ul>
            </li>
            );
        };

        this.getFoodList=()=>{
            axios.get('http://localhost:3000/home/buy')
            .then(res=>{
                console.log(res.data);
                console.log(Object.values(res.data));
                if(res.data.length===0){
                    console.log("Woops! All the foodies are out of stock");
                    this.setState({list: "Woops! All the foodies are out of stock"})
                }else{
                    var user_food_list= res.data.map(Object.values)
                    user_food_list= user_food_list.map(this.makeList)
                    user_food_list= <ul className="cardsgrid">{user_food_list}</ul>

                    this.setState({list: user_food_list})
                }
            })
            .catch(err=>console.log("Error while fetching food list \n"+err))
        }
    }

    componentDidMount=()=>{
        this.getFoodList()
    }

    render() {
        return (
            <Fragment>
                <div className=''>
                    {this.state.list}
                </div>
            </Fragment>
        )
    }
}

export default BuyFood;