import React, {Component} from 'react'
import axios from 'axios';
import './Waffle.css';

export default class WaffleDisplay extends Component{
    constructor(){
        super()
        this.state={
            edit:false,
            editSyrup: ''
        }
    }
        
        handleToggle=()=>{
            this.setState({
                edit: !this.state.edit
            })
        }
        handleChangeSyrup=(inputValue)=>{
            this.setState({
                editSyrup: inputValue
            })
        }

        handleUpdateWaffle=(id)=>{ //this will be invoked by the customize button !
            let updatedWaffle = {
                name: this.state.editSyrup
            }
            axios.put(`/api/waffles/${id}`, updatedWaffle)
            .then(res =>{
                this.props.updateWaffle(res.data)
                this.handleToggle()
                //there will be a toggle request here when it is complete
            })
        }
        handleDeleteWaffle=() => {
            axios.delete(`/api/waffles/${this.props.waffle.id}`)
            .then(res => {
                this.props.deleteWaffle(res.data)
                if(this.state.edit){
                    this.handleToggle()
                }
            })
        }

        //now it works
        

    render(){
        console.log(this.props.waffle)
        let {name, syrup} = this.props.waffle
        return(
            <div> 
                {!this.state.edit
                ?
                // this div will need to be a box
                (<div className="waffleBox"> 
                <h4>{`${name} Waffle`}</h4> 
                <h4>{`${syrup} Syrup`}</h4>
                <button className= "edit-btn" onClick={this.handleToggle}>Edit</button>
                <button className= "delete-btn" onClick={()=>this.handleDeleteWaffle(this.props.waffle.id)}>Bye Waffle-licia</button>
                </div>
                )
                :
                //this div will need to have same class name as the above div for the box
                (<div className="waffleBox">    
                <input placeholder="Change Syrup Here" onChange={(event)=>this.handleChangeSyrup(event.target.value)} value={this.state.editSyrup}/>  {/*inside this input, I need to reference handleUpdate and have an applicable function above it  and for the input */}
                <button onClick={()=>this.handleUpdateWaffle(this.props.waffle.id)}>Upgrade</button>
                <button onClick={this.handleDeleteWaffle}>Bye Waffle-licia</button>
                </div>
                )
                }
            </div>
        )
    }

}