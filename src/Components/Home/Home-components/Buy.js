import React, { Fragment } from 'react'
import axios from 'axios'
import './Buy.css'

export class BuyFood extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
        // this.getFoodList=this.getFoodList.bind(this)
        this.makeList=(each)=>{
            return( <li key={each.num}
                        style={{"listStyleType":"none"}}
                        className='foodcard'
                    >
                        <ul
                        // onClick={()=>selectFood(each[0])}
                        style={{"listStyleType":"none"}}>
                            <li>{each[2]}       </li>
                            <li>{each[3]}       </li>
                            <li>{each[4]}       </li>
                            <li>{each[5]}       </li>
                        </ul>
                </li>
            )
        }

        this.getFoodList=()=>{
            axios.get('http://localhost:3000/home/buy')
            .then(res=>{
                console.log(res.data);
                console.log(Object.values(res.data));
                // console.log(class(r));

                console.log(typeof(res.data));
                this.setState({list: res.data.map((value)=>Object.values(value))})
                this.setState({list: this.state.list.map(this.makeList)})
                this.setState({list: <ul className='cardsgrid'
                >{this.state.list}</ul>})
            })
            .catch(err=>console.log("Error while fetching food list \n"+err))
        }

        // this.selectFood=(foodid)=>{
        // }
    }

    componentDidMount=()=>{
        this.getFoodList()
    }

    render() {


        return (
            <Fragment>
                <div classname='bgimg'>
                    {this.state.list}
                </div>
            </Fragment>
        )

    }
}

export default BuyFood
