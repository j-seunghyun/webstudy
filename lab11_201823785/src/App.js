import React from 'react'
import {Component} from "react";
import Clock from "./Clock";

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>다중 시계 조작기</h1>
                <Clock/>
            </div>
        );
    }
}

export default App;
