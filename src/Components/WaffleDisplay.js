import React, {Component} from 'react'
import axios from 'axios';
export default class WaffleDisplay extends Component{
    constructor(){
        super()
        this.state={
            edit:false,
            editName: ''
        }
    }
        handleChangeName=(inputValue)=>{
            this.setState(
                {editName: inputValue}
            )
        }

        handleUpdateWaffle=(id)=>{ //this will be invoked by the customize button
            let updatedWaffle = {
                name: this.state.editName
            }
            axios.put(`/api/waffles/${id}`, updatedWaffle)
            .then(res =>{
                this.props.updateWaffle(res.data)
                //there will be a toggle request here when it is complete
            })
        }
        handleDeleteWaffle=() => {
            axios.delete(`/api/waffles/${this.props.waffle.id}`)
            .then(res => {
                this.props.deleteWaffle(res.data)
            })
        }

    render(){
        console.log(this.props.waffle)
        let {name, syrup} = this.props.waffle
        return(
            <div>
                <header>Hello Waffle Header</header>
                <p>{`Waffle: ${name}`}</p> <p>{`${syrup} Syrup`}</p>
                <input placeholder="change the name" onChange={(event)=>this.handleChangeName(event.target.value)} value={this.state.editName}/>  {/*inside this input, I need to reference handleUpdate and have an applicable function above it  and for the input */}
                <button onClick={()=>this.handleUpdateWaffle(this.props.waffle.id)}>Customize</button>
                <button onClick={this.handleDeleteWaffle}>Bye Waffle-licia</button>
            </div>
        )
    }

}