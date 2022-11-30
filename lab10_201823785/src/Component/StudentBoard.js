import Student from "./Student";
import React from "react";

function StudentBoard(){
    let index = 0;
    return(
        <div>
            <div className = "studentBoard">
                <div className = "studentIndex">
                    <h1>{index+1}.</h1>
                </div>
                <Student studentId = {index++} />
            </div>
            <div className = "studentBoard">
                <div className = "studentIndex">
                    <h1>{index+1}.</h1>
                </div>
                <Student studentId = {index++} />
            </div>
            <div className = "studentBoard">
                <div className = "studentIndex">
                    <h1>{index+1}.</h1>
                </div>
                <Student studentId = {index++} />
            </div>
        </div>
    );
}


export default StudentBoard;