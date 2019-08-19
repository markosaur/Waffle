import React, { Component } from 'react'
import axios from 'axios'
import WaffleDisplay from './WaffleDisplay'

export default class Waffle extends Component {
constructor(){
    super()
    this.state={
        waffleName: '',
        waffleSyrup: '',
        waffles: []
    }
}

componentDidMount = () =>{
    console.log('hit')
    axios.get('/api/waffles')
    .then(res => {
        this.setState({
            waffles: res.data
        })
    })
    .catch(error=>{
        console.log(error)
    })
}

handleName = (value)=>{
    this.setState({
        waffleName:value
    })
}

handleSyrup = (value)=>{
    this.setState({
        waffleSyrup: value
    })
}

handleAddWaffle = () =>{
    axios.post('/api/waffles', {name:this.state.waffleName, syrup:this.state.waffleSyrup})
    .then(res=> {
        this.setState({
            waffles: res.data
        })
    }) //we need to get the completed array back to the front end from the backend
    this.setState({waffleName: ''})
    this.setState({waffleSyrup: ''})
    
} 

updateWaffle = (stuff)=>{
    this.setState({
        waffles: stuff
    })
}

handleDeleteWaffle = (stuff)=>{
    this.setState({
        waffles: stuff
    })
}


render(){
    //this is where we will import update and delete, Waffle is the parent and it will need to display Waffle display 
    //we will create a mappedWaffles const right here that will map over the array and return
    
                //to make Get work and display we need to import display and have it rendered 
    const mappedWaffles = this.state.waffles.map((waffle, i)=>{ 
            return( <WaffleDisplay key = {i} waffle = {waffle} updateWaffle={this.updateWaffle} deleteWaffle={this.handleDeleteWaffle}/>)
    }) 
    console.log(this.state)
    return(
        //this className div is incharge of the updated divs
        <div className = "waffles-flex-div"> 
                {mappedWaffles}
            <div>
                <input placeholder='My name is what' onChange={(event)=>this.handleName(event.target.value)} value={this.state.waffleName}></input>
                <input placeholder='Dibetes Juice' onChange={(event)=>this.handleSyrup(event.target.value)} value={this.state.waffleSyrup}></input>
                <button onClick={this.handleAddWaffle}> Waffle My Heart</button> 
                {/* When user clicks button, I want to post the name and syrup to the backend */}
                
                {/*When user clicks button, name and syrup will be deleted  */}
            </div>

        </div>
    )
}

}
