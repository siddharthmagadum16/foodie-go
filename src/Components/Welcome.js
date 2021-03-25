import React from 'react';
import axios from 'axios';
// const atob = require('atob')
export class Welcome extends React.Component {
    constructor(props){
        super(props)
        this.state={
            image0:'image/png',
            image1:'',
            imgURL: '',
            image:''
        }
        let cnt=0
        let t0,t1
        this.getImage=()=>{
            console.log(cnt)
            cnt=cnt+1
            t0= performance.now()
            axios.get('http://localhost:3000/home/getimage/')
            .then(res=>{
                this.setState({image1: res})
            })
            .catch(err=> console.log(err))
            t1= performance.now()
            console.log("getimage frontend time: "+ t1-t0)
        }


        // this.handleImageUpload1=(event)=>{
        //     console.log("hello!")
        //     if (event.target.files && event.target.files[0]) {

        //         let img = event.target.files[0];
        //         console.log(img)
        //         let encodedImage= Buffer.from(img).toString('base64')
        //         console.log(encodedImage)
        //         this.setState({
        //           image: encodedImage
        //         },()=>{
        //             console.log(this.state.image)
        //         });
        //     }
        // }
        this.updateSelection=(e)=>{
            this.setState({image: e.target.files[0]});
        }
        
        this.uploadFile = ()=>{
            let t0,t1;
            t0= performance.now()
            let  fd= new FormData();
            fd.append('image',this.state.image,this.state.image.name)
            console.log(fd.data)
            console.log(this.state.image)
            axios.post('http://localhost:3000/home/sell/insert/food/image',fd)
            // .then(res=>console.log(res.data))
            .then(res=>(parseInt(res.data)===1)?console.log("success"):console.log(res))
            .catch(err=>console.log(err))
            t1= performance.now()
            console.log("uploading total time: "+ t1-t0)
        }

    }

    render() {


        return(
            <div>
                <h1>Welcome</h1>

                <img height='500' width='400' src={`data:image/*;base64,${this.state.image1.data}`} alt="imagealt" />

                <img src={this.state.imgurl} />
                <div>{this.state.image1.data}</div>
                <br/>
                <input type='button' onClick={()=>this.getImage()} name='clickme' value='test' />
                <br/>
                <br/>
                <input
                    type='file'
                    id='image'
                    name='image'
                    accept='image/*'
                    onChange={this.updateSelection}
                />

                <input type='button' onClick={this.uploadFile} value='upload now' />
            </div>
        )
    }
}

// module.exports= Welcome;
export default Welcome;
