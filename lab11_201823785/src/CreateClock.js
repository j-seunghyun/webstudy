import React from 'react';
import {Component} from "react";

class CreateClock extends Component{
    constructor(props){
        super(props);

        this.state ={
            clockId: 0,
            clockName: "",
            clockHour: 0,
            clockMinute: 0,
            clockSecond: 0,
        }
    }


    render(){
        return(
            <div>
                <h1>시계 정보 입력 패널</h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>시계 이름</label>
                        <input type="text" value={this.state.clockName} onChange={this.onClockNameValueChange}/>
                    </div>
                    <div>
                        <label>시계 초기 시간</label>
                        <input type="number" max={24} min={0} value={this.state.clockHour} onChange={this.onClockTimeValueChange}/>
                    </div>
                    <div>
                        <label>시계 초기 분</label>
                        <input type="number" max={60} min={0} value={this.state.clockMinute} onChange={this.onClockMinuteValueChange}/>
                    </div>
                    <div>
                        <label>시계 초기 초</label>
                        <input type="number" max={60} min={0} value={this.state.clockSecond} onChange={this.onClockSecondValueChange}/>
                    </div>
                    <button type="submit">추가</button>
                </form>
            </div>
        );
    }
    onClockNameValueChange = (eventSource) =>{
        let newClockNameValue = eventSource.target.value;

        this.setState({
            clockName: newClockNameValue
        });
    }
    onClockTimeValueChange = (eventSource) =>{
        let newClockHourValue = eventSource.target.value;

        this.setState({
            clockHour: newClockHourValue
        });
    }
    onClockMinuteValueChange = (eventSource) =>{
        let newClockMinuteValue = eventSource.target.value;

        this.setState({
            clockMinute: newClockMinuteValue
        });
    }
    onClockSecondValueChange = (eventSource) =>{
        let newClockSecondValue = eventSource.target.value;

        this.setState({
            clockSecond: newClockSecondValue
        });
    }
    submitHandler = (eventSource) =>{
        eventSource.preventDefault();

        this.setState({
            clockId: this.props.count
        });

        let clockItem={
            id: this.props.count,
            name: this.state.clockName,
            hour: this.state.clockHour,
            minute: this.state.clockMinute,
            second: this.state.clockSecond
        };

        this.props.onSaveDate(clockItem);

        this.setState({
            clockId: 0,
            clockName: '',
            clockHour: 0,
            clockMinute: 0,
            clockSecond: 0,
        });
    }
}

export default CreateClock;