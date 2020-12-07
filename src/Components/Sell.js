import React, { Fragment } from 'react'
import axios from 'axios'
export class SellFood extends React.Component {

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
                        <ul style={{"listStyleType":"none"}}>
                            {/* <li key='1' >{each[0]}       </li> */}
                            <li key='2' >{each[2]}       </li>
                            <li key='3' >{each[3]}       </li>
                            <li key='4' >{each[4]}       </li>
                            <li key='5' >{each[5]}       </li>
                        </ul>
                </li>
            )
        }
        console.log(`props ${props}`)
        this.getFoodList=()=>{
            console.log(`props.username: ${props.username}`)
            let userurl=('http://localhost:3000/home/sell/').concat('sid') //+props.username
            console.log(`user url: ${userurl}`)
            axios.get(userurl,props.username)
            .then(res=>{
                console.log(res.data);
                console.log(Object.values(res.data));
                // console.log(class(r));

                console.log(typeof(res.data));
                this.setState({list: res.data.map((value)=>Object.values(value))})
                this.setState({list: this.state.list.map(this.makeList)})
                this.setState({list: <ul className='cardsgrid'>{this.state.list}</ul>})

            })
            .catch(err=>console.log("Error while fetching your food online \n"+err))
        }
    }

    componentDidMount=()=>{
        this.getFoodList()
    }

    render() {
        console.log("length of list of your food "+this.state.list)
        const len= this.state.list
        return (
            <Fragment>
                <div>
                <p>Your current foodstuffs in foodie-go are </p>
                <div>
                    { this.state.list }
                </div>
                </div>
            </Fragment>
        )
    }
}

export default SellFood
