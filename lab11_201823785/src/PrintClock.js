import React from 'react';
import {Component} from "react";


class PrintClock extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        const clockLists = this.props.clocklists.map(clocks=>
            <div key = {clocks.id}>
                <h1>{clocks.name}</h1>
                <div>
                    <div>24h</div>
                    <h2>{clocks.hour}:{clocks.minute}:{clocks.second}</h2>
                    <div>
                        <button>수정</button>
                        <button>24시간제로 전환</button>
                        <button>삭제</button>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                {clockLists}
            </div>
        );
    }
}

export default PrintClock;