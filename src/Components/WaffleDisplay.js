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
        
        handleToggle=()=>{
            this.setState({
                edit: !this.state.edit
            })
        }
        handleChangeName=(inputValue)=>{
            this.setState({
                editName: inputValue
            })
        }

        handleUpdateWaffle=(id)=>{ //this will be invoked by the customize button !
            let updatedWaffle = {
                name: this.state.editName
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

        //still not working
        

    render(){
        console.log(this.props.waffle)
        let {name, syrup} = this.props.waffle
        return(
            <div> 
                {!this.state.edit
                ?
                (<div>
                <h3>{`Waffle: ${name}`}</h3> 
                <h4>{`${syrup} Syrup`}</h4>
                <button onClick={this.handleToggle}>Edit</button>
                <button onClick={()=>this.handleDeleteWaffle(this.props.waffle.id)}>Bye Waffle-licia</button>
                </div>
                )
                :
                (<div>    
                <input placeholder="Change Name Here" onChange={(event)=>this.handleChangeName(event.target.value)} value={this.state.editName}/>  {/*inside this input, I need to reference handleUpdate and have an applicable function above it  and for the input */}
                <button onClick={()=>this.handleUpdateWaffle(this.props.waffle.id)}>Customize</button>
                <button onClick={this.handleDeleteWaffle}>Bye Waffle-licia</button>
                </div>
                )
                }
                {/* dfdh */}
            </div>
        )
    }

}