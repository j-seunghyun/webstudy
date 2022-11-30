import React from 'react';
import {Component} from "react";
import CreateClock from "./CreateClock";
import PrintClock from "./PrintClock";
import Handler from "./Handler";

class Clock extends Component{
    constructor(props){
        super(props);

        this.state ={
            clockCount : 0,
            clockList: []
        };
    }

    render(){
        return (
            <div>
                <CreateClock count={this.state.clockCount} onSaveDate={this.onRegister}/>
                <h1>시계 조작 패널</h1>
                <Handler clocklists={this.state.clockList} onChangeDate={this.onChangeRequire}/>
                <h1>시계 패널</h1>
                <PrintClock clocklists={this.state.clockList}/>
            </div>
        );
    }

    onRegister = (clockItem) =>{
        this.setState((oldState)=> {
            return {
                clockList: [...oldState.clockList,clockItem],
                clockCount: oldState.clockCount + 1
            }
        });
    }
    onChangeRequire = (changedClockLists) =>{
        this.setState(()=>{
            return{
                clockList: changedClockLists
            }
        });
    }
}

export default Clock;