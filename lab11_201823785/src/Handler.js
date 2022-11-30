import React from 'react';
import {Component} from "react";

class Handler extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <button onClick={this.onButtonMinusHour}>-1 h</button>
                <button onClick={this.onButtonMinusMinute}>-10 m</button>
                <button onClick={this.onButtonMinusSecond}>-10 s</button>
                <button onClick={this.onButtonPlusSecond}>+10 s</button>
                <button onClick={this.onButtonPlusMinute}>+10 m</button>
                <button onClick={this.onButtonPlusHour}>+1 h</button>
            </div>
        )
    }

    onButtonMinusHour = () => {
        this.props.clocklists.map(clocks=>{
            if(clocks.hour-1 > 0){
                clocks.hour = clocks.hour -1;
                this.props.onChangeDate(this.props.clocklists);
            }
        });
        console.log(this.props.clocklists);
    }
    onButtonMinusMinute = () =>{
        this.props.clocklists.map(clocks=>{
            if(clocks.minute-10 > 0){
                clocks.minute = clocks.minute-10;
                this.props.onChangeDate(this.props.clocklists);
            }
        });
    }
    onButtonMinusSecond = () => {
        this.props.clocklists.map(clocks=>{
            if(clocks.second-10 > 0){
                clocks.second = clocks.second-10;
                this.props.onChangeDate(this.props.clocklists);
            }
        });
    }
    onButtonPlusSecond = () => {
        this.props.clocklists.map(clocks=>{
            if(clocks.second+10 < 60){
                clocks.second = clocks.second+10;
                this.props.onChangeDate(this.props.clocklists);
            }
            else{
                clocks.second = clocks.second+10-60;
                clocks.minute = clocks.minute+1;
                this.props.onChangeDate(this.props.clocklists);
            }
        });
    }
    onButtonPlusMinute = () =>{
        this.props.clocklists.map(clocks=>{
            if(clocks.minute+10 < 60){
                clocks.minute = clocks.minute+10;
                this.props.onChangeDate(this.props.clocklists);
            }
            else{
                clocks.minute = clocks.minute+10-60;
                clocks.hour = clocks.hour+1;
                this.props.onChangeDate(this.props.clocklists);
            }
        });
    }
    onButtonPlusHour = () => {
        this.props.clocklists.map(clocks=>{
            if(clocks.hour+1 < 12){
                clocks.hour = clocks.hour+1;
                this.props.onChangeDate(this.props.clocklists);
            }
        });
    }
}

export default Handler;